import * as net from 'net';

import { IDubboHost, IDubboInfo, IApplication, IZookeeperClientOption } from '../zk';
import { HessianEncode } from './encode';
import { HessianDecode } from './decode';

export class RpcHessian {
    constructor() {

    }
    execute(method: string, args: any, host: IDubboHost, dubboInfo: IDubboInfo, appInfo: IApplication): Promise<any> {
        let encode = new HessianEncode(dubboInfo, appInfo);

        return new Promise((resolve, reject) => {
            const client = new net.Socket();
            const chunks = [];
            let heap, bl = 16;

            client.connect(~~host.port || 80, host.host, () => {
                client.write(encode.encode(method, args));
            });
            client.on('error', (err) => {
                reject(err);
            });
            client.on('data', (chunk) => {
                if (!chunks.length) {
                    var arr = Array.prototype.slice.call(chunk.slice(0, 16));
                    var i = 0;
                    while (i < 3) {
                        bl += arr.pop() * Math.pow(256, i++);
                    }
                }
                chunks.push(chunk);
                heap = Buffer.concat(chunks);
                (heap.length >= bl) && client.destroy();
            });

            client.on('close', (err) => {
                if (err) {
                    return reject(err);
                }

                let decode = new HessianDecode();

                decode.decode(heap).then(resolve).catch(reject);
            });
        });
    }
}