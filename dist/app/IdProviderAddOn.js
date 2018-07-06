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
var IdProviderAddOn_1;
"use strict";
const common_1 = require("@micro-fleet/common");
const service_communication_1 = require("@micro-fleet/service-communication");
const IdGenerator_1 = require("./IdGenerator");
const { SvcSettingKeys: SvcS, ModuleNames: M, ActionNames: A } = common_1.constants;
let IdProviderAddOn = IdProviderAddOn_1 = class IdProviderAddOn {
    constructor(_configProvider, _rpcCaller) {
        this._configProvider = _configProvider;
        this._rpcCaller = _rpcCaller;
        this.name = 'IdProviderAddOn';
        common_1.Guard.assertArgDefined('_configProvider', _configProvider);
        common_1.Guard.assertArgDefined('_rpcCaller', _rpcCaller);
        this._idGen = new IdGenerator_1.IdGenerator();
    }
    /**
     * @see IServiceAddOn.init
     */
    init() {
        this._rpcCaller.name = this._configProvider.get(SvcS.SERVICE_SLUG).value;
        this._addresses = this._configProvider.get(SvcS.ID_SERVICE_ADDRESSES).value;
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
        return this._rpcCaller.dispose();
    }
    async fetch() {
        for (let addr of this._addresses) {
            if (await this.attempFetch(addr)) {
                return;
            }
        }
    }
    nextBigInt() {
        return this._idGen.nextBigInt().toString();
    }
    nextShortId() {
        return this._idGen.nextShortId();
    }
    nextUuidv4() {
        return this._idGen.nextUuidv4();
    }
    async attempFetch(address) {
        this._rpcCaller.baseAddress = address;
        return this._rpcCaller.call(M.ID_GEN, A.NEXT_BIG_INT, {
            service: this._rpcCaller.name,
            count: IdProviderAddOn_1.CACHE_SIZE
        })
            .then((res) => {
            // resolve(<any>res.data);
            return true;
        });
    }
};
IdProviderAddOn.CACHE_SIZE = 10;
IdProviderAddOn = IdProviderAddOn_1 = __decorate([
    common_1.injectable(),
    __param(0, common_1.inject(common_1.Types.CONFIG_PROVIDER)),
    __param(1, common_1.inject(service_communication_1.Types.DIRECT_RPC_CALLER)),
    __metadata("design:paramtypes", [Object, Object])
], IdProviderAddOn);
exports.IdProviderAddOn = IdProviderAddOn;
//# sourceMappingURL=IdProviderAddOn.js.map