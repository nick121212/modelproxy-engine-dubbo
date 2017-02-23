import { modelProxy, ModelProxy } from 'modelproxy';
import * as zookeeper from 'node-zookeeper-client';
import * as jsonPointer from 'json-pointer';

import { NodeDubbo } from './nodedubbo';
import { IDubboInfo, IDubboHost, IZookeeperClientOption, IApplication } from './zk';

export class NodeDubboFactory extends modelProxy.BaseFactory<NodeDubbo> {
    private client: zookeeper.Client;

    constructor(private options: IZookeeperClientOption) {
        super();
        this.init();
    }

    init() {
        this.client = zookeeper.createClient(this.options.dubbo.registerStr, this.options.options);
        this.client.on('state', (state) => {
            if (state === zookeeper.State.SYNC_CONNECTED) {
                console.log('zookeeper成功连接!');
            }
            if (state === zookeeper.State.DISCONNECTED) {
                this.client.connect();
            }
        });
        this.client.connect();
    }

    async addService(app: IApplication) {
        let client = new NodeDubbo(this.client);

        await client.init(this.options.dubbo, app);

        if (app.dInterface.alias) {
            this.add(`${app.dInterface.alias}`, client, true);
        } else {
            this.add(`${app.dInterface.name}:${app.dInterface.version}`, client, true);
        }

        return client;
    }

    async execute(method: string, ...args) {
        if (jsonPointer.has(this, "/instances" + method)) {
            return await jsonPointer.get(this, "/instances" + method)(args);
        }

        return new Error(`没有找到方法[${method}]`);
    }
}