"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FlakeId = require("flake-idgen");
const shortid = require("shortid");
const uuidv4 = require("uuid/v4");
/**
 * Provides methods to generate bigint ID
 */
class IdGenerator {
    constructor(options) {
        this._generator = new FlakeId(options);
        if (options && options.worker) {
            shortid.worker(options.worker);
        }
    }
    /**
     * Generates a new big int ID.
     */
    nextBigInt() {
        return bufferToBigInt(this._generator.next());
    }
    /**
     * Generates a 7-character UID.
     */
    nextShortId() {
        return shortid.generate();
    }
    /**
     * Generates a version-4 UUID.
     */
    nextUuidv4() {
        return uuidv4();
    }
    // public wrapBigInt(value: string): Int64
    // public wrapBigInt(buf: Buffer): Int64
    // public wrapBigInt(value?: number): Int64
    /**
     * Parses input value into bigint type.
     * @param value The value to be wrapped. If not given, the behavior is same with `next()`.
     */
    wrapBigInt(value) {
        if (value == null) {
            return this.nextBigInt();
        }
        switch (typeof value) {
            case 'bigint':
                return value;
            case 'string':
            case 'number':
                return BigInt(value);
            default:
                if (value instanceof Buffer) {
                    return bufferToBigInt(value);
                }
                return BigInt(value);
        }
    }
}
exports.IdGenerator = IdGenerator;
/**
 * Converts a buffer to bigint
 */
function bufferToBigInt(buffer) {
    // Eg: Buffer <5A, 6D, 1C, 38, 2C, 00, 00, 00>
    // value = (0x5A << 7) + (0x6D << 6) ....
    const BITS_PER_BYTE = BigInt(8);
    const result = [...buffer].reduce((prev, cur, idx, arr) => {
        const reversedIdx = BigInt(arr.length - 1 - idx);
        return prev + (BigInt(cur) << (reversedIdx * BITS_PER_BYTE));
    }, BigInt(0));
    return result;
}
//# sourceMappingURL=IdGenerator.js.map