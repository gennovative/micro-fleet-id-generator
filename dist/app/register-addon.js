"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@micro-fleet/common");
const IdProviderAddOn_1 = require("./IdProviderAddOn");
const Types_1 = require("./Types");
function registerIdAddOn() {
    const depCon = common_1.serviceContext.dependencyContainer;
    if (!depCon.isBound(Types_1.Types.ID_PROVIDER)) {
        depCon.bind(Types_1.Types.ID_PROVIDER, IdProviderAddOn_1.IdProviderAddOn).asSingleton();
    }
    const dbAdt = depCon.resolve(Types_1.Types.ID_PROVIDER);
    return dbAdt;
}
exports.registerIdAddOn = registerIdAddOn;
//# sourceMappingURL=register-addon.js.map