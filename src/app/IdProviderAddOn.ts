import { injectable, /* lazyInject, IConfigurationProvider,
    Types as ConT, constants,*/ } from '@micro-fleet/common'

import { IdGenerator } from './IdGenerator'

// const { SvcSettingKeys: SvcS, ModuleNames: M, ActionNames: A } = constants

// type IDirectRpcCaller = import('@micro-fleet/service-communication').IDirectRpcCaller
// type IRpcResponse = import('@micro-fleet/service-communication').IRpcResponse

export interface IIdProvider {
    /**
     * Generates a chronologically sequential native bigint with Snowflake algorithm.
     */
    nextBigInt(): bigint

    /**
     * Generates a random string of length from 7 to 14 url-friendly characters.
     */
    nextShortId(): string

    /**
     * Generates a v4 universally unique identifier.
     */
    nextUuidv4(): string
}

@injectable()
export class IdProviderAddOn implements IIdProvider, IServiceAddOn {

    public readonly name: string = 'IdProviderAddOn'

    // private static CACHE_SIZE = 10

    // private _addresses: string[]

    // TODO: Will implement remote ID generation later
    private _idGen: IdGenerator

    // @lazyInject(ConT.CONFIG_PROVIDER)
    // private _configProvider: IConfigurationProvider

    // @lazyInject(ComT.DIRECT_RPC_CALLER)
    // @lazyInject('service-communication.IDirectRpcCaller')
    // private _rpcCaller: IDirectRpcCaller

    constructor(
    ) {
        this._idGen = new IdGenerator()
    }

    /**
     * @see IServiceAddOn.init
     */
    public init(): Promise<void> {
        return Promise.resolve()
    }

    /**
     * @see IServiceAddOn.deadLetter
     */
    public deadLetter(): Promise<void> {
        return Promise.resolve()
    }

    /**
     * @see IServiceAddOn.dispose
     */
    public dispose(): Promise<void> {
        return Promise.resolve()
        // if (!this._rpcCaller) {
        //     return Promise.resolve()
        // }
        // return this._rpcCaller.dispose()
    }

    // public async fetch(): Promise<void> {
    //     this._rpcCaller.name = this._configProvider.get(SvcS.SERVICE_SLUG).value as string
    //     this._addresses = this._configProvider.get(SvcS.ID_SERVICE_ADDRESSES).value as string[]

    //     // tslint:disable-next-line:prefer-const
    //     for (let addr of this._addresses) {
    //         if (await this.attempFetch(addr)) {
    //             return
    //         }
    //     }
    // }

    /**
     * @see IIdProvider.nextBigInt
     */
    public nextBigInt(): bigint {
        return this._idGen.nextBigInt()
    }


    /**
     * @see IIdProvider.nextShortId
     */
    public nextShortId(): string {
        return this._idGen.nextShortId()
    }

    /**
     * @see IIdProvider.nextUuidv4
     */
    public nextUuidv4(): string {
        return this._idGen.nextUuidv4()
    }


    // private async attempFetch(address: string): Promise<boolean> {
    //     this._rpcCaller.baseAddress = address
    //     return this._rpcCaller.call(M.ID_GEN, A.NEXT_BIG_INT, {
    //             service: this._rpcCaller.name,
    //             count: IdProviderAddOn.CACHE_SIZE,
    //         })
    //         .then((res: IRpcResponse) => {
    //             // resolve(<any>res.data)
    //             return true
    //         })
    // }
}
