import { makeVar } from '@apollo/client'
import * as Application from 'expo-application'
import { NotificationPermissionsStatus } from 'expo-notifications'

export interface ApplicationInterface {
	androidId?: typeof Application.androidId
	applicationId?: typeof Application.applicationId
	applicationName?: typeof Application.applicationName
	nativeApplicationVersion?: typeof Application.nativeApplicationVersion
	nativeBuildVersion?: typeof Application.nativeApplicationVersion
}
export const applicationInitialState: ApplicationInterface = {
	androidId: null,
	applicationName: '',
	applicationId: '',
	nativeApplicationVersion: '',
	nativeBuildVersion: '',
}

export const ApplicationPermissionReactiveVar = makeVar<ApplicationInterface | null>(
	applicationInitialState,
)
