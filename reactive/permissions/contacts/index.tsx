import { makeVar } from '@apollo/client';
import { PermissionResponse } from 'expo-contacts';
import { PermissionStatus } from 'expo-permissions';


export const permissionContactsInitialState: PermissionResponse = {
	canAskAgain: false,
	expires: 'never',
	granted: false,
	status: PermissionStatus.UNDETERMINED,
}

export const PermissionContactsReactiveVar = makeVar<PermissionResponse | null>(
	permissionContactsInitialState,
)