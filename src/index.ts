import { modelProxy, ModelProxy } from 'modelproxy';
import * as _ from 'lodash';

import { NodeDubboFactory } from './libs';
import { IInterfaceModelDubbo } from './models';
import * as jsonPoiner from 'json-pointer';

let nodeDubboFactory = new NodeDubboFactory({
    dubbo: {
        version: "2.8.5",
        rootPath: "dubbo",
        registerStr: "dubboadmin.uat1.rs.com:2181"
    },
    options: {
        sessionTimeout: 6000,
        spinDelay: 3000,
        retries: 5
    }
});

export class DubboEngine extends modelProxy.BaseEngine {
    /**
     * 构造
     * @param mockEngine   {ModelProxy.IEngine}  用于获取mock数据的engine
     */
    constructor() {
        super();
    }

    /**
     * 验证数据准确性
     * @param instance   {IInterfaceModelDubbo}  接口实例
     * @param options    {ModelProxy.IExecute}         执行的参数
     * @return           {boolean}
     */
    validate(instance: IInterfaceModelDubbo, options: ModelProxy.IExecute): boolean {
        super.validate(instance, options);

        return true;
    }

    private dataAdapter(instance: IInterfaceModelDubbo, executeInfo: ModelProxy.IExecute): { $class: string, $: any } {
        const dataObj = {
            "$class": instance.config.dataAdapter.class,
            "$": {}
        };

        _.forEach(instance.config.dataAdapter.data, (val, key) => {
            if (jsonPoiner.has(executeInfo.data, `/${key}`)) {
                jsonPoiner.set(dataObj, val, jsonPoiner.get(executeInfo.data, `/${key}`));
            }
        });

        return dataObj;
    }

    /**
     * 验证数据准确性
     * @param instance   {IInterfaceModelDubbo}  接口实例
     * @param options    {ModelProxy.IExecute}         执行的参数
     * @return           {Promise<any>}
     */
    async proxy(instance: IInterfaceModelDubbo, options: ModelProxy.IProxyCtx): Promise<any> {
        let interfaceModel = _.extend({}, instance, options.instance || {});

        await nodeDubboFactory.addService(interfaceModel.config.application);

        return await nodeDubboFactory.execute(`/${interfaceModel.config.application.dInterface.alias}/${interfaceModel.config.method}`, this.dataAdapter(interfaceModel, options.executeInfo));
    }
}

// const customerObj = {
//     $class: 'com.chinaredstar.fc.api.param.broker.OrderParam',
//     $: {
//         roomId: 100116,
//         contactPhone: 18559311819,
//         userPhone: 18559311819,
//         bookingNumber: 1234567,
//         status: 0,
//         memo: "",
//         contactor: "nick",
//         userName: "nick",
//         consultantOpenId: "05d93845-3156-4dd2-9c46-d958a3d23542",
//         userOpenId: "7144b4f5-348f-437f-8315-ccda28f077c3"
//     }
// };

// nodeDubboFactory.addService({
//     name: "modelproxy-dubbo-test",
//     dInterface: {
//         alias: "IBookingOrderService:1.0.2",
//         name: 'com.chinaredstar.fc.api.service.broker.IBookingOrderService',
//         version: '1.0.2'
//     }
// }).then((result) => {
//     nodeDubboFactory.execute("/IBookingOrderService:1.0.2/insertBookingOrder", customerObj).then((res) => {
//         console.log("a", res);
//     }).catch(console.error);
// });