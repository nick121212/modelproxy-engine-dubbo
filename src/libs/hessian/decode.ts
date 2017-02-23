import { DecoderV2 } from "hessian.js";

const Response = {
    OK: 20,
    CLIENT_TIMEOUT: 30,
    SERVER_TIMEOUT: 31,
    BAD_REQUEST: 40,
    BAD_RESPONSE: 50,
    SERVICE_NOT_FOUND: 60,
    SERVICE_ERROR: 70,
    SERVER_ERROR: 80,
    CLIENT_ERROR: 90
};
const RESPONSE_WITH_EXCEPTION = 0;
const RESPONSE_VALUE = 1;
const RESPONSE_NULL_VALUE = 2;

export class HessianDecode {
    async decode(heap) {
        let flag, result, rtn;

        if (heap[3] !== Response.OK) {
            throw new Error(decodeURIComponent(heap.slice(18, heap.length - 1).toString()));
        }
        result = new DecoderV2(heap.slice(16, heap.length));


        flag = result.readInt();

        switch (flag) {
            case RESPONSE_NULL_VALUE:
                // cb(null, null);
                break;
            case RESPONSE_VALUE:
                // cb(null, result.read());
                rtn = result.read();
                break;
            case RESPONSE_WITH_EXCEPTION:
                let excep = result.read();

                if (!(excep instanceof Error) && (excep = new Error(excep))) {
                    throw excep;
                }
                break;
            default:
                throw new Error(`Unknown result flag, expect '0' '1' '2', get ${flag}`);
        }

        return rtn;
    }
}