import { useReactiveVar } from '@apollo/client'
import CompanyCoasterLogoDynamic from '@assets/images/company/CompanyCoasterLogoDynamic'
import TabBarIcon, { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { Box, Pressable } from '@components/core'
import { useGetNotificationsLazyQuery } from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import * as Haptics from 'expo-haptics'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Image } from 'react-native'

const HEIGHT = 25

const ProfileTab = (props: TabProps) => {
	const router = useRouter()
	const rTheme = useReactiveVar(ThemeReactiveVar)
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
		router.push({
			pathname: '(app)/modal/DeviceManager',
		})
	}

	if (!rAuthorizationVar || rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === 'GUEST') {
		return (
			<Pressable
				delayLongPress={200}
				style={{ zIndex: 100, marginTop: -5 }}
				onPress={() => {
					router.push({
						pathname: '(app)/hometab/profilestack',
					})
				}}
				onLongPress={() => onLongPressProfileIcon()}
			>
				<CompanyCoasterLogoDynamic
					width={HEIGHT}
					height={HEIGHT}
					iconColor={
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light100
							: rTheme.theme?.gluestack.tokens.colors.dark100
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
							router.push('hometab/profilestack')
						}}
						onLongPress={() => onLongPressProfileIcon()}
					>
						<>
							{rAuthorizationVar?.DeviceProfile?.Profile?.photos?.length ? (
								<Image
									source={{ uri: rAuthorizationVar.DeviceProfile.Profile.photos[0].url }}
									style={{
										width: HEIGHT,
										height: HEIGHT,
										borderRadius: 4,
										borderColor: props.color,
										borderWidth: 1.5,
									}}
								/>
							) : (
								<CompanyCoasterLogoDynamic
									width={HEIGHT}
									height={HEIGHT}
									iconColor={
										rTheme.colorScheme === 'light'
											? rTheme.theme?.gluestack.tokens.colors.light100
											: rTheme.theme?.gluestack.tokens.colors.dark100
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
					bg={numNotification > 0 ? '$red500' : 'transparent'}
					sx={{
						h: 4.25,
						w: 4.25,
					}}
					rounded={'$full'}
				/>
			}
		</>
	)
}

export default ProfileTab
