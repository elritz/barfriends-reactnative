import { useReactiveVar } from '@apollo/client'
import { AUTHORIZATION } from '@constants/StorageConstants'
import {
	useRefreshDeviceManagerMutation,
	AuthorizationDeviceManager,
	useCreateGuestProfileMutation,
} from '@graphql/generated'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { AuthorizationReactiveVar } from '@reactive'
import { secureStorageItemDelete } from '@util/hooks/local/useSecureStorage'
import { useRouter, useSegments } from 'expo-router'
import React, { useEffect } from 'react'

function useProtectedRoute() {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rootSegment = useSegments()[0]
	const router = useRouter()

	React.useEffect(() => {
		if (!rAuthorizationVar === undefined) {
			return
		}

		if (rAuthorizationVar && rootSegment !== '(app)/hometab') {
			router.replace('/')
		}
	}, [rAuthorizationVar, rootSegment])
}

export function AuthProvider(props) {


	useProtectedRoute()

	return <>{props.children}</>
}
