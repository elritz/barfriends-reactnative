import { makeVar } from '@apollo/client'
import { DeviceManager, Profile } from '@graphql/generated'

export const MeReactiveVar = makeVar<Profile | null | undefined>(null)
export const AuthorizationReactiveVar = makeVar<DeviceManager | null>(null)
