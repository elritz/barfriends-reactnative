import { useReactiveVar } from '@apollo/client'
import CompanyCoasterLogoDynamic from '@assets/images/company/CompanyCoasterLogoDynamic'
import TabBarIcon, { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { useGetNotificationsLazyQuery } from '@graphql/generated'
import { StackActions, TabActions, useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import * as Haptics from 'expo-haptics'
import { Box, Image, Pressable } from 'native-base'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'styled-components/native'

const HEIGHT = 25

const ProfileTab = (props: TabProps) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [numNotification, setNumNotifications] = useState(0)

	const [getNotificationQuery, { data: GNData, loading: GNLoading, error }] =
		useGetNotificationsLazyQuery({
			fetchPolicy: 'network-only',
			onCompleted: data => {
				if (data.getNotifications?.friendRequestNotifications?.length) {
					const filterSentNotifications = data.getNotifications?.friendRequestNotifications.filter(
						item => {
							if (item?.receiverProfileId === rAuthorizationVar?.DeviceProfile?.Profile?.id) {
								return item
							}
						},
					)
					setNumNotifications(numNotification + filterSentNotifications.length)
				}
			},
		})

	useEffect(() => {
		getNotificationQuery()
	}, [])

	const onLongPressProfileIcon = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)

		navigation.navigate('ModalNavigator', {
			screen: 'DeviceManagerModal',
		})
	}

	if (!rAuthorizationVar || rAuthorizationVar.DeviceProfile?.Profile.ProfileType === 'GUEST') {
		return (
			<Pressable
				delayLongPress={200}
				style={{ zIndex: 100, marginTop: -5 }}
				onPress={() => {
					StackActions.pop(0)
					navigation.dispatch(
						TabActions.jumpTo('ProfileStack'),
						// StackActions.replace('HomeTabNavigator', {
						// 	screen: 'ProfileStack',
						// 	params: {
						// 		screen: 'UserProfileScreen',
						// 	},
						// }),
					)
				}}
				onLongPress={() => onLongPressProfileIcon()}
			>
				<CompanyCoasterLogoDynamic
					width={HEIGHT}
					height={HEIGHT}
					iconColor={
						themeContext.theme === 'light'
							? themeContext.palette.primary.background.light
							: themeContext.palette.primary.background.dark
					}
					backgroundColor={props.color}
				/>
			</Pressable>
		)
	}

	return (
		<>
			<TabBarIcon
				color={props.color}
				icon={
					<Pressable
						delayLongPress={200}
						style={{ zIndex: 100 }}
						onPress={() => {
							navigation.dispatch(
								TabActions.jumpTo('ProfileStack'),
								// StackActions.replace('HomeTabNavigator', {
								// 	screen: 'ProfileStack',
								// 	params: {
								// 		screen: 'UserProfileScreen',
								// 	},
								// }),
							)
						}}
						onLongPress={() => onLongPressProfileIcon()}
					>
						<>
							{rAuthorizationVar?.DeviceProfile?.Profile?.photos ? (
								<Image
									source={{ uri: rAuthorizationVar.DeviceProfile.Profile.photos[0].url }}
									style={{
										width: HEIGHT,
										height: HEIGHT,
										borderRadius: 4,
										borderColor: props.color,
										borderWidth: 1.5,
									}}
									alt={'Profile Photo'}
								/>
							) : (
								<CompanyCoasterLogoDynamic
									width={HEIGHT}
									height={HEIGHT}
									iconColor={
										themeContext.theme === 'light'
											? themeContext.palette.primary.background.light
											: themeContext.palette.primary.background.dark
									}
									backgroundColor={props.color}
								/>
							)}
						</>
					</Pressable>
				}
			/>
			{
				<Box
					// position={'absolute'}
					// bottom={3}
					bg={numNotification > 0 ? 'red.500' : 'transparent'}
					h={'4.25px'}
					w={'4.25px'}
					borderRadius={'full'}
				/>
			}
		</>
	)
}

export default ProfileTab
