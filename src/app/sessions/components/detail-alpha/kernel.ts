import { KernelService } from '@core/kernel-knowledge.service'
import memoize from 'lodash/fp/memoize'

import { map } from 'rxjs/operators'
import {
  DecoratorConfig,
  DecoratorFactory,
  ResolvableFunction,
  BiTypedMethodDecorator1
} from 'lodash-decorators/factory'
import { MemoizeApplicator } from 'lodash-decorators/applicators'
import { MemoizeConfig } from 'lodash-decorators/shared'

export const Memoize = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(memoize, new MemoizeApplicator(), {
    getter: true,
    optionalParams: true
  })
) as BiTypedMethodDecorator1<ResolvableFunction | MemoizeConfig<any, any>>
export { Memoize as memoize }
export default Memoize

export interface AlphaTemplate {
  id: string
  name: string
  area: string
  states?: any[]
}

export interface StateTemplate {
  id: string
  name: string
  previousId: string
}

export interface CheckpointTemplate {
  id: string
  name: string
  description: string
  isVisibleInCard: string
}
