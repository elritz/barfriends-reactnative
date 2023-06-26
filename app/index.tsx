// authorization
import { useReactiveVar } from '@apollo/client'
import { AUTHORIZATION } from '@constants/StorageConstants'
import { AuthorizationDecoded } from '@ctypes/app'
import {
	useRefreshDeviceManagerMutation,
	useCreateGuestProfileMutation,
	AuthorizationDeviceManager,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { secureStorageItemDelete, secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import { Redirect, SplashScreen, useRouter } from 'expo-router'
import React, { useEffect } from 'react'

export default () => {


	return <Redirect href={'(app)/hometab'} />
}
