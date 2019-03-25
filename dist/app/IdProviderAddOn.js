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
var IdProviderAddOn_1;
"use strict";
const common_1 = require("@micro-fleet/common");
const IdGenerator_1 = require("./IdGenerator");
const { SvcSettingKeys: SvcS, ModuleNames: M, ActionNames: A } = common_1.constants;
let IdProviderAddOn = IdProviderAddOn_1 = class IdProviderAddOn {
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
        if (!this._rpcCaller) {
            return Promise.resolve();
        }
        return this._rpcCaller.dispose();
    }
    async fetch() {
        this._rpcCaller.name = this._configProvider.get(SvcS.SERVICE_SLUG).value;
        this._addresses = this._configProvider.get(SvcS.ID_SERVICE_ADDRESSES).value;
        // tslint:disable-next-line:prefer-const
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
            count: IdProviderAddOn_1.CACHE_SIZE,
        })
            .then((res) => {
            // resolve(<any>res.data)
            return true;
        });
    }
};
IdProviderAddOn.CACHE_SIZE = 10;
__decorate([
    common_1.lazyInject(common_1.Types.CONFIG_PROVIDER),
    __metadata("design:type", Object)
], IdProviderAddOn.prototype, "_configProvider", void 0);
__decorate([
    common_1.lazyInject('service-communication.IDirectRpcCaller'),
    __metadata("design:type", Object)
], IdProviderAddOn.prototype, "_rpcCaller", void 0);
IdProviderAddOn = IdProviderAddOn_1 = __decorate([
    common_1.injectable(),
    __metadata("design:paramtypes", [])
], IdProviderAddOn);
exports.IdProviderAddOn = IdProviderAddOn;
//# sourceMappingURL=IdProviderAddOn.js.map