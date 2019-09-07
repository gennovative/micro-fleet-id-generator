"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@micro-fleet/common");
const IdGenerator_1 = require("./IdGenerator");
let IdProviderAddOn = class IdProviderAddOn {
    // @lazyInject(ConT.CONFIG_PROVIDER)
    // private _configProvider: IConfigurationProvider
    // @lazyInject(ComT.DIRECT_RPC_CALLER)
    // @lazyInject('service-communication.IDirectRpcCaller')
    // private _rpcCaller: IDirectRpcCaller
    constructor() {
        this.name = 'IdProviderAddOn';
        this._idGen = new IdGenerator_1.IdGenerator();
    }
    /**
     * @see IServiceAddOn.init
     */
    init() {
        return Promise.resolve();
    }
    /**
     * @see IServiceAddOn.deadLetter
     */
    deadLetter() {
        return Promise.resolve();
    }
    /**
     * @see IServiceAddOn.dispose
     */
    dispose() {
        return Promise.resolve();
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
    nextBigInt() {
        return this._idGen.nextBigInt();
    }
    /**
     * @see IIdProvider.nextShortId
     */
    nextShortId() {
        return this._idGen.nextShortId();
    }
    /**
     * @see IIdProvider.nextUuidv4
     */
    nextUuidv4() {
        return this._idGen.nextUuidv4();
    }
};
IdProviderAddOn = __decorate([
    common_1.decorators.injectable(),
    __metadata("design:paramtypes", [])
], IdProviderAddOn);
exports.IdProviderAddOn = IdProviderAddOn;
//# sourceMappingURL=IdProviderAddOn.js.map