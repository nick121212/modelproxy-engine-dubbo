import { EncoderV2 } from "hessian.js";

import { IDubboInfo, IApplication } from '../zk';

const DEFAULT_LEN = 8388608; 

export class HessianEncode {
    constructor(private dubboInfo: IDubboInfo, private appInfo: IApplication) {

    }

    encode(method: string, args: any): Buffer {
        const body = this._body(method, args);
        const head = this._head(body.length);

        return Buffer.concat([head, body]);
    }

    private _head(len: number) {
        const head = [0xda, 0xbb, 0xc2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let i = 15;

        if (len > DEFAULT_LEN) {
            throw new Error(`Data length too large: ${len}, max payload: ${DEFAULT_LEN}`);
        }
        while (len >= 256) {
            head.splice(i--, 1, len % 256);
            len >>= 8;
        }
        head.splice(i, 1, len);

        return new Buffer(head);
    }

    private _body(method: string, args: any) {
        const body = new EncoderV2();

        body.write(this.dubboInfo.version || '2.8.5');
        body.write(this.appInfo.dInterface.name);
        body.write(this.appInfo.dInterface.version);
        body.write(method);

        if (args && args.length) {
            body.write(args.length);
            for (var i = 0, len = args.length; i < len; ++i) {
                body.write(args[i]);
            }
        } else {
            body.write(0);
        }
        body.write(this._attachments());

        return body.byteBuffer._bytes.slice(0, body.byteBuffer._offset);
    }

    private _attachments() {
        let implicitArgs: any = {
            interface: this.appInfo.dInterface.name,
            path: this.appInfo.dInterface.name,
            timeout: this.appInfo.dInterface.timeout||6000
        }
        if (this.appInfo.dInterface.version) {
            implicitArgs.version = this.appInfo.dInterface.version;
        }
        if (this.appInfo.dInterface.group) {
            implicitArgs.group = this.appInfo.dInterface.group;
        }

        return {
            $class: 'java.util.HashMap',
            $: implicitArgs
        }
    }
}