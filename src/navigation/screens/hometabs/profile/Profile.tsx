import { useReactiveVar } from '@apollo/client'
import PreferenceNotificationPermission from '@components/molecules/preferences/preferencenotificationpermission/PreferenceNotificationPermission'
import { ProfileType, useGetNotificationsLazyQuery } from '@graphql/generated'
import PersonalScreen from '@navigation/screens/hometabs/profile/PersonalProfile/PersonalProfile'
import VenueScreen from '@navigation/screens/hometabs/profile/VenueProfile/VenueProfile'
import { AuthorizationReactiveVar } from '@reactive'
import { uniqueId } from 'lodash'
import { AnimatePresence } from 'moti'
import { ScrollView } from 'native-base'
import { useCallback, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'

const Profile = () => {
	const [refreshing, setRefreshing] = useState(false)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		getNotificationQuery()
	}, [])

	const [getNotificationQuery, { data: GNData, loading: GNLoading, error }] =
		useGetNotificationsLazyQuery({
			fetchPolicy: 'network-only',
			onCompleted: data => {
				setRefreshing(false)
			},
		})

	useEffect(() => {
		getNotificationQuery()
	}, [])

	if (GNLoading) return null

	const renderProfile = (param: ProfileType) => {
		switch (param) {
			case ProfileType.Guest:
				return
			case ProfileType.Personal:
				return <PersonalScreen notifications={GNData} />
			case ProfileType.Venue:
				return <VenueScreen />
			default:
				return null
		}
	}
	console.log(JSON.stringify(rAuthorizationVar?.DeviceProfile?.Profile.ProfileType, null, 4))
	return (
		<ScrollView
			contentInset={{ top: 0, left: 0, bottom: 150, right: 0 }}
			showsVerticalScrollIndicator={false}
			scrollEventThrottle={16}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
		>
			<AnimatePresence key={uniqueId()}>
				<PreferenceNotificationPermission />
			</AnimatePresence>
			{renderProfile(rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType as ProfileType)}
		</ScrollView>
	)
}

export default Profile
