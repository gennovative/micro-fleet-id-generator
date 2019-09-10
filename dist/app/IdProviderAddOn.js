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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@micro-fleet/common");
const IdGenerator_1 = require("./IdGenerator");
const { IdGenerator: C, } = common_1.constants;
let IdProviderAddOn = class IdProviderAddOn {
    // @lazyInject(ComT.DIRECT_RPC_CALLER)
    // @lazyInject('service-communication.IDirectRpcCaller')
    // private _rpcCaller: IDirectRpcCaller
    constructor(_config) {
        this._config = _config;
        this.name = 'IdProviderAddOn';
    }
    /**
     * @see IServiceAddOn.init
     */
    init() {
        const opts = {};
        const getCfg = this._config.get.bind(this._config);
        getCfg(C.ID_DATACENTER, common_1.SettingItemDataType.Number).map(val => opts.datacenter = val);
        getCfg(C.ID_WORKER, common_1.SettingItemDataType.Number).map(val => opts.worker = val);
        getCfg(C.ID_EPOCH, common_1.SettingItemDataType.Number).map(val => opts.epoch = val);
        this._idGen = new IdGenerator_1.IdGenerator(opts);
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
    __param(0, common_1.decorators.inject(common_1.Types.CONFIG_PROVIDER)),
    __metadata("design:paramtypes", [Object])
], IdProviderAddOn);
exports.IdProviderAddOn = IdProviderAddOn;
//# sourceMappingURL=IdProviderAddOn.js.map