import * as FlakeId from 'flake-idgen'
import * as shortid from 'shortid'
import uuidv4 = require('uuid/v4')


export type BigIdOptions = {

    /**
     * Datacenter identifier. It can have values from 0 to 31 (5 bits).
     */
    datacenter?: number,

    /**
     * Worker identifier. It can have values from 0 to 31 (5 bits).
     */
    worker?: number,

    /**
     * Generator identifier. It can have values from 0 to 1023 (10 bits).
     * It can be provided instead of `datacenter` and `worker` identifiers.
     */
    id?: number,

    /**
     * Number used to reduce value of a generated timestamp.
     * Note that this number should not exceed number of milliseconds elapsed
     * since 1 January 1970 00:00:00 UTC (value of `Date.now()`).
     * It can be used to generate smaller ids.
     */
    epoch?: number,
}

export type Int64 = {
    toNumber(): number,
    toJSON(): number,
    toString(radix?: number): string,
    toBuffer(raw?: boolean): Buffer,
}

/**
 * Provides methods to generate bigint ID
 */
export class IdGenerator {

    private _generator: FlakeId

    constructor(options?: BigIdOptions) {
        this._generator = new FlakeId(options)
        if (options && options.worker) {
            shortid.worker(options.worker)
        }
    }

    /**
     * Generates a new big int ID.
     */
    public nextBigInt(): bigint {
        return bufferToBigInt(this._generator.next())
    }

    /**
     * Generates a 7-character UID.
     */
    public nextShortId(): string {
        return shortid.generate()
    }

    /**
     * Generates a version-4 UUID.
     */
    public nextUuidv4(): string {
        return uuidv4()
    }

    // public wrapBigInt(value: string): Int64
    // public wrapBigInt(buf: Buffer): Int64
    // public wrapBigInt(value?: number): Int64

    /**
     * Parses input value into bigint type.
     * @param value The value to be wrapped. If not given, the behavior is same with `next()`.
     */
    public wrapBigInt(value?: string | number | Buffer): bigint {
        if (value == null) {
            return this.nextBigInt()
        }
        switch (typeof value) {
            case 'bigint':
                return value
            case 'string':
            case 'number':
                return BigInt(value)
            default:
                if (value instanceof Buffer) {
                    return bufferToBigInt(value)
                }
                return BigInt(value)
        }
    }
}

/**
 * Converts a buffer to bigint
 */
function bufferToBigInt(buffer: Buffer): bigint {
    // Eg: Buffer <5A, 6D, 1C, 38, 2C, 00, 00, 00>
    // value = (0x5A << 7) + (0x6D << 6) ....
    const BITS_PER_BYTE = 8n
    const result = [...buffer].reduce((prev, cur, idx, arr) => {
        const reversedIdx = BigInt(arr.length - 1 - idx)
        return prev + (BigInt(cur) << (reversedIdx * BITS_PER_BYTE))
    }, 0n)

    return result
}
