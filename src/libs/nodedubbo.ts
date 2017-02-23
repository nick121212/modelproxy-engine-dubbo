import { modelProxy, ModelProxy } from 'modelproxy';
import * as zookeeper from 'node-zookeeper-client';
import * as _ from 'lodash';

import { rpcFactory } from './rpc';
import { ZookeeperClient, IDubboHost, IApplication, IZookeeperClientOption, IDubboInfo } from './zk';

export class NodeDubbo extends modelProxy.BaseFactory<IApplication> {
    client: ZookeeperClient;
    hosts: Array<IDubboHost>;

    constructor(zookeeperClient: zookeeper.Client) {
        super();
        this.client = new ZookeeperClient(zookeeperClient);
    }

    /**
     * 初始化host和method
     * @param appInfo {IApplication}  服务信息
     * return {Promise<void>}
     */
    async init(dubboInfo: IDubboInfo, appInfo: IApplication): Promise<void> {
        await this.client.connect();
        this.hosts = await this.client.findHosts(dubboInfo.rootPath, appInfo, dubboInfo);

        // 遍历方法，添加在当前实例中
        let host = _.first(this.hosts);
        if (host) {
            _.each(host.methods.split(","), (m) => {
                this.add(m, appInfo, true);
                _.extend(this, {
                    [m]: this.execute.bind(this, m, dubboInfo, appInfo)
                });
            });
        }
    }

    /**
     * 执行方法
     */
    async execute(method: string, dubboInfo: IDubboInfo, appInfo: IApplication, args: any) {
        return await rpcFactory.execute(method, this.hosts[0], dubboInfo, appInfo, args);
    }
}