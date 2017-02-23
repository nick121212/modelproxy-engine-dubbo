import * as zookeeper from 'node-zookeeper-client';
import * as _ from 'lodash';
import * as uri from 'urijs';
import * as url from 'url';
import * as qs from 'qs';
import * as ip from "ip";

export interface IDubboHost {
    // uri?: any;
    application?: string;
    category?: string;
    generic: boolean;
    dubbo: string;
    interface: string;
    revision: string;
    version: string;
    side: string;
    owner?: string;
    methods: string;
    weight: number;
    timestamp: number;
    port: string;
    host: string;
}

export interface IApplication {
    name: string;
    version?: string;
    dInterface: { name: string, version?: string, group?: string, timeout?: number, alias: string };
}
export interface IDubboInfo {
    registerStr: string;
    version: string;
    rootPath: string;
}

export interface IZookeeperClientOption {
    options: zookeeper.Option,
    dubbo: IDubboInfo;
}

export class ZookeeperClient {
    public state: zookeeper.State;

    constructor(private client: zookeeper.Client) {
        this.client.on('state', (state) => {
            this.state = state;
        });
    }

    /**
     * 链接zookeeper方法
     * @return {Promise<any>}
     */
    connect(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.state === zookeeper.State.SYNC_CONNECTED) {
                return resolve();
            }

            this.client.once('connected', () => {
                resolve();
            });
        });
    }

    /**
     * 获取路径下的子路径
     * @param path  {String}              路径
     * @param watch {(event:Event)=>void} 监听方法
     * @return      Promise<string[]>
     */
    getChildren(path: string, watch?): Promise<string[]> {
        return new Promise((resolve, reject) => {
            let args = [path, watch, (error: Error, children: string[], stats: zookeeper.Stat) => {
                if (error) {
                    return reject(error);
                }
                resolve(children || []);
            }];

            if (!watch) {
                args.splice(1, 1);
            }

            this.client.getChildren.apply(this.client, args);
        });
    }

    async handleHostResult(children: string[], appVer: string) {
        let hosts: IDubboHost[] = [];

        _.each(children, (child: string) => {
            let host = uri(decodeURIComponent(child));
            let query: IDubboHost = qs.parse(host.query());

            if (query.version === appVer) {
                hosts.push({
                    // uri: host,
                    host: host.hostname(),
                    port: host.port(),
                    methods: query.methods,
                    weight: query.weight || 0,
                    application: query.application,
                    category: 'consumers',
                    generic: query.generic.toString() !== 'false',
                    dubbo: query.dubbo || '2.8.5',
                    interface: query.interface,
                    revision: query.revision,
                    version: query.version,
                    side: query.side || 'consumer',
                    timestamp: (new Date()).getTime()
                });
            }
        });

        return hosts;
    }

    exists(path: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.client.exists(path, (err: Error, stat: zookeeper.Stat) => {
                if (err) {
                    return reject(err);
                }
                resolve(!!stat);
            });
        });
    }

    registerHost(rootPath: string, app: IApplication, dubboInfo): Promise<string> {
        let host = uri({
            protocol: "consumer",
            hostname: ip.address(),
            port: "",
            path: app.dInterface.name,
            query: uri.buildQuery({
                application: app.name,
                category: 'consumers',
                check: 'false',
                dubbo: dubboInfo.version,
                interface: app.dInterface.name,
                revision: app.dInterface.version,
                version: app.dInterface.version,
                side: 'consumer',
                timestamp: (new Date()).getTime()
            })
        });
        return new Promise(async (resolve, reject) => {
            let path = `/${rootPath}/${app.dInterface.name}/consumers/${encodeURIComponent(host.href())}`;
            let exist = await this.exists(path);

            if (exist) {
                return resolve();
            }
            this.client.create(
                path,
                zookeeper.CreateMode.EPHEMERAL,
                (err: Error, path: string) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(path);
                }
            );
        });
    }

    async findHosts(rootPath: string = 'dubbo', app: IApplication, dubboInfo: IDubboInfo): Promise<any> {
        await this.connect();

        if (this.state === zookeeper.State.SYNC_CONNECTED) {
            let children = await this.getChildren(`/${rootPath}/${app.dInterface.name}/providers`);
            await this.registerHost(rootPath, app, dubboInfo);

            return await this.handleHostResult(children, app.dInterface.version);
        } else {
            throw new Error('zookeeper未连接。');
        }
    }
}