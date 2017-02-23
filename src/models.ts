import { ModelProxy } from 'modelproxy';
import { IApplication } from './libs/zk';

export interface IInterfaceModelDubbo extends ModelProxy.IInterfaceModel {
    config: {
        method: string;
        dataAdapter: {
            class: string;
            data: {
                [key: string]: string
            }
        };
        application: IApplication;
    };
}