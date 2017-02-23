import { modelProxy, ModelProxy } from 'modelproxy';

import { RpcHessian } from './hessian';
import { IDubboHost, IDubboInfo, IApplication } from './zk';

class RpcFactory extends modelProxy.BaseFactory<any> {
    constructor() {
        super();
    }

    async execute(method: string, host: IDubboHost, dubboInfo: IDubboInfo, appInfo: IApplication, args: Array<any>) {
        let instance = this.use("hessian");

        return await instance.execute(method, args, host, dubboInfo, appInfo);
    }
}

export const rpcFactory = new RpcFactory();

rpcFactory.add("hessian", new RpcHessian());