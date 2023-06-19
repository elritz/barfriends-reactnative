import { useReactiveVar } from '@apollo/client'
import CompanyCoasterLogoDynamic from '@assets/images/company/CompanyCoasterLogoDynamic'
import TabBarIcon, { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { useGetNotificationsLazyQuery } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import * as Haptics from 'expo-haptics'
import { useRouter } from 'expo-router'
import { Box, Image, Pressable, useTheme } from 'native-base'
import { useEffect, useState } from 'react'

const HEIGHT = 25

const ProfileTab = (props: TabProps) => {
	const theme = useTheme()
	const colorScheme = useThemeColorScheme()
	// const navigation = useNavigation()
	const router = useRouter()
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
					iconColor={colorScheme === 'light' ? theme.colors.light[100] : theme.colors.dark[100]}
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
									alt={'Profile Photo'}
								/>
							) : (
								<CompanyCoasterLogoDynamic
									width={HEIGHT}
									height={HEIGHT}
									iconColor={colorScheme === 'light' ? theme.colors.light[100] : theme.colors.dark[100]}
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
