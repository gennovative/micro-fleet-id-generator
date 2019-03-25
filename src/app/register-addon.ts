import { IDependencyContainer, serviceContext } from '@micro-fleet/common'

import { IdProviderAddOn } from './IdProviderAddOn'
import { Types } from './Types'


export function registerIdAddOn(): IdProviderAddOn {
    const depCon: IDependencyContainer = serviceContext.dependencyContainer
    if (!depCon.isBound(Types.ID_PROVIDER)) {
        depCon.bind<IdProviderAddOn>(Types.ID_PROVIDER, IdProviderAddOn).asSingleton()
    }
    const dbAdt = depCon.resolve<IdProviderAddOn>(Types.ID_PROVIDER)
    return dbAdt
}
