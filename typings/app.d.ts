/// <reference path="./global.d.ts" />
declare module '@micro-fleet/id-generator/dist/app/IdGenerator' {
    /// <reference types="node" />
    export type BigIdOptions = {
        /**
         * Datacenter identifier. It can have values from 0 to 31 (5 bits).
         */
        datacenter?: number;
        /**
         * Worker identifier. It can have values from 0 to 31 (5 bits).
         */
        worker?: number;
        /**
         * Generator identifier. It can have values from 0 to 1023 (10 bits).
         * It can be provided instead of `datacenter` and `worker` identifiers.
         */
        id?: number;
        /**
         * Number used to reduce value of a generated timestamp.
         * Note that this number should not exceed number of milliseconds elapsed
         * since 1 January 1970 00:00:00 UTC (value of `Date.now()`).
         * It can be used to generate smaller ids.
         */
        epoch?: number;
    };
    export type Int64 = {
        toNumber(): number;
        toJSON(): number;
        toString(radix?: number): string;
        toBuffer(raw?: boolean): Buffer;
    };
    /**
     * Provides methods to generate bigint ID
     */
    export class IdGenerator {
                constructor(options?: BigIdOptions);
        /**
         * Generates a new big int ID.
         */
        nextBigInt(): bigint;
        /**
         * Generates a 7-character UID.
         */
        nextShortId(): string;
        /**
         * Generates a version-4 UUID.
         */
        nextUuidv4(): string;
        /**
         * Parses input value into bigint type.
         * @param value The value to be wrapped. If not given, the behavior is same with `next()`.
         */
        wrapBigInt(value?: string | number | Buffer): bigint;
    }

}
declare module '@micro-fleet/id-generator/dist/app/IdProviderAddOn' {
    import { IServiceAddOn, IConfigurationProvider } from '@micro-fleet/common';
    export interface IIdProvider {
        /**
         * Generates a chronologically sequential native bigint with Snowflake algorithm.
         */
        nextBigInt(): bigint;
        /**
         * Generates a random string of length from 7 to 14 url-friendly characters.
         */
        nextShortId(): string;
        /**
         * Generates a v4 universally unique identifier.
         */
        nextUuidv4(): string;
    }
    export class IdProviderAddOn implements IIdProvider, IServiceAddOn {
                readonly name: string;
                constructor(_config: IConfigurationProvider);
        /**
         * @see IServiceAddOn.init
         */
        init(): Promise<void>;
        /**
         * @see IServiceAddOn.deadLetter
         */
        deadLetter(): Promise<void>;
        /**
         * @see IServiceAddOn.dispose
         */
        dispose(): Promise<void>;
        /**
         * @see IIdProvider.nextBigInt
         */
        nextBigInt(): bigint;
        /**
         * @see IIdProvider.nextShortId
         */
        nextShortId(): string;
        /**
         * @see IIdProvider.nextUuidv4
         */
        nextUuidv4(): string;
    }

}
declare module '@micro-fleet/id-generator/dist/app/Types' {
    export class Types {
        static readonly ID_PROVIDER = "id-generator.IdProvider";
    }

}
declare module '@micro-fleet/id-generator/dist/app/constants' {
    export enum IdSettingKeys {
        /**
         * Array of addresses to fetch IDs.
         * Data type: string[]
         */
        ID_SERVICE_ADDRESSES = "id_service_addresses"
    }

}
declare module '@micro-fleet/id-generator/dist/app/register-addon' {
    import { IdProviderAddOn } from '@micro-fleet/id-generator/dist/app/IdProviderAddOn';
    export function registerIdAddOn(): IdProviderAddOn;

}
declare module '@micro-fleet/id-generator' {
    export * from '@micro-fleet/id-generator/dist/app/constants';
    export * from '@micro-fleet/id-generator/dist/app/IdGenerator';
    export * from '@micro-fleet/id-generator/dist/app/IdProviderAddOn';
    export * from '@micro-fleet/id-generator/dist/app/register-addon';
    export * from '@micro-fleet/id-generator/dist/app/Types';

}
