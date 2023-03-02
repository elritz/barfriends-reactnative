import { makeVar } from '@apollo/client'
import { ClientDeviceManager, DeviceManager } from '@graphql/generated'

export const AuthorizationReactiveVar = makeVar<ClientDeviceManager | null>(null)
