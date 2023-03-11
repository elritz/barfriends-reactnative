import { useReactiveVar } from '@apollo/client'
import CardPleaseSignup from '@components/molecules/asks/signuplogin/SignupLogin'
import PreferenceNotificationPermission from '@components/molecules/preferences/preferencenotificationpermission/PreferenceNotificationPermission'
import { ProfileType, useGetNotificationsLazyQuery } from '@graphql/generated'
import PersonalScreen from '@navigation/screens/hometabs/profile/PersonalProfile/PersonalProfile'
import VenueScreen from '@navigation/screens/hometabs/profile/VenueProfile/VenueProfile'
import { AuthorizationReactiveVar } from '@reactive'
import { uniqueId } from 'lodash'
import { AnimatePresence } from 'moti'
import { Box, Divider, ScrollView, View } from 'native-base'
import { useCallback, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'

const Profile = () => {
	const [refreshing, setRefreshing] = useState(false)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const [getNotificationQuery, { data: GNData, loading: GNLoading, error }] =
		useGetNotificationsLazyQuery({
			fetchPolicy: 'network-only',
			onCompleted: data => {
				if (data.getNotifications) {
					setRefreshing(false)
				}
			},
		})

	useEffect(() => {
		getNotificationQuery()
	}, [])

	const onRefresh = useCallback(() => {
		setRefreshing(true)
	}, [])

	if (GNLoading) return null

	const renderProfile = (param: ProfileType) => {
		switch (param) {
			case ProfileType.Guest:
				return (
					<Box my={10} mx={3} flex={1}>
						<View>
							<CardPleaseSignup signupTextId={4} />
							<Divider style={{ marginVertical: 20 }} />
						</View>
					</Box>
				)
			case ProfileType.Personal:
				return <PersonalScreen notifications={GNData} />
			case ProfileType.Venue:
				return <VenueScreen />
			default:
				return null
		}
	}

	return (
		<ScrollView
			contentInset={{ top: 0, left: 0, bottom: 150, right: 0 }}
			showsVerticalScrollIndicator={false}
			scrollEventThrottle={16}
			refreshControl={<RefreshControl refreshing={GNLoading} onRefresh={onRefresh} />}
		>
			<AnimatePresence key={uniqueId()}>
				<PreferenceNotificationPermission />
			</AnimatePresence>
			{renderProfile(rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType as ProfileType)}
		</ScrollView>
	)
}

export default Profile
