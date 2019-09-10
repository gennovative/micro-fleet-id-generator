import * as chai from 'chai'
import * as spies from 'chai-spies'

import { IConfigurationProvider, SettingItemDataType, constants, Maybe } from '@micro-fleet/common'
// import { IDirectRpcCaller, IRpcResponse } from '@micro-fleet/service-communication'

import { IdProviderAddOn, IdSettingKeys as IDS } from '../app'

chai.use(spies)

const { Service: S } = constants
const expect = chai.expect,
    SVC_SLUG = 'test-svc',
    ID_SVC_ADDR = ['192.168.1.1', '192.168.1.2']

class MockConfigAddOn implements IConfigurationProvider {

    public readonly name: string = 'MockConfigAddOnks'

    public configFilePath: string

    public readonly enableRemote: boolean = true

    public get(key: string, type?: SettingItemDataType): Maybe<number | boolean | string | any[]> {
        switch (key) {
            case S.SERVICE_SLUG: return Maybe.Just(SVC_SLUG)
            case IDS.ID_SERVICE_ADDRESSES: return Maybe.Just(ID_SVC_ADDR)
            default: return Maybe.Nothing()
        }
    }

    public deadLetter(): Promise<void> {
        return Promise.resolve()
    }

    public fetch(): Promise<boolean> {
        return Promise.resolve(true)
    }

    public init(): Promise<void> {
        return Promise.resolve()
    }

    public dispose(): Promise<void> {
        return Promise.resolve()
    }

    public onUpdate(listener: (delta: string[]) => void) {
        // Empty
    }
}

// class MockDirectRpcCaller implements IDirectRpcCaller {
//     public baseAddress: string
//     public name: string
//     public timeout: number

//     public init(params?: any): any {
//         // Empty
//     }

//     public dispose(): Promise<void> {
//         return Promise.resolve()
//     }

//     public onError(handler: (err: any) => void): void {
//         // Empty
//     }

//     public call(moduleName: string, action: string, params?: any): Promise<IRpcResponse> {
//         return Promise.resolve(null)
//     }

// }

let idProd: IdProviderAddOn

describe('IdProvider', () => {

    beforeEach(() => {
        idProd = new IdProviderAddOn(new MockConfigAddOn())
        // idProd['_rpcCaller'] = new MockDirectRpcCaller()
        return idProd.init()
    })

    afterEach(() => {
        return idProd.dispose()
    })

    describe('init', () => {
        /*
        it('should init RPC caller', async () => {
            // Arrange
            const idProd = new IdProviderAddOn()
            idProd['_configProvider'] = new MockConfigAddOn()
            idProd['_rpcCaller'] = new MockDirectRpcCaller()

            // Act
            await idProd.init()

            // Assert
            expect(idProd['_rpcCaller'].name).to.equal(SVC_SLUG)
            expect(idProd['_addresses']).to.equal(ID_SVC_ADDR)
        })
        //*/
    }) // describe 'init'

    // describe('dispose', () => {
    //     it('should release all resources', async () => {
    //         // Arrange
    //         const disposeSpy = chai.spy.on(idProd['_rpcCaller'], 'dispose')

    //         // Act
    //         await idProd.dispose()

    //         // Assert

    //         expect(disposeSpy).to.be.called
    //     })
    // }) // describe 'dispose'

    describe('nextBigInt', () => {
        it('should return a bigint', () => {
            // Act
            const id = idProd.nextBigInt()

            // Assert
            console.log(id)
            expect(typeof id).equal('bigint')
        })
    }) // describe 'nextBigInt'

    describe('nextShortId', () => {
        it('should return a short ID string', () => {
            // Act
            const id = idProd.nextShortId()

            // Assert
            console.log(id)
            expect(id).to.be.string
            expect(id).not.to.be.empty
        })
    }) // describe 'nextShortId'

    describe('nextUuidv4', () => {
        it('should return a version-4 UUID string', () => {
            // Act
            const id = idProd.nextUuidv4()

            // Assert
            console.log(id)
            expect(id).to.be.string
            expect(id).not.to.be.empty
        })
    }) // describe 'nextUuidv4'
})
