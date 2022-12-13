import { useReactiveVar } from '@apollo/client'
import CompanyCoasterLogoDynamic from '@assets/images/company/CompanyCoasterLogoDynamic'
import TabBarIcon, { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { useGetADeviceManagerQuery } from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import * as Haptics from 'expo-haptics'
import { Box, Image, Pressable } from 'native-base'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components/native'

const HEIGHT = 25

const ProfileTab = (props: TabProps) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const { data, loading, error } = useGetADeviceManagerQuery({
		skip: !rAuthorizationVar,
		fetchPolicy: 'network-only',
	})

	const onLongPressProfileIcon = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)

		navigation.navigate('ModalNavigator', {
			screen: 'DeviceManagerModal',
		})
	}

	if (loading || !rAuthorizationVar) {
		return (
			<Pressable
				delayLongPress={200}
				style={{ zIndex: 100 }}
				onPress={() =>
					navigation.navigate('HomeTabNavigator', {
						screen: 'ProfileStack',
						params: {
							screen: 'UserProfileScreen',
						},
					})
				}
				onLongPress={() => !loading && onLongPressProfileIcon()}
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
						onPress={() =>
							navigation.navigate('HomeTabNavigator', {
								screen: 'ProfileStack',
								params: {
									screen: 'UserProfileScreen',
								},
							})
						}
						onLongPress={() => !loading && onLongPressProfileIcon()}
					>
						<>
							{rAuthorizationVar?.DeviceProfile?.Profile?.photos ? (
								<Image
									source={{ uri: rAuthorizationVar.DeviceProfile.Profile.photos?.url }}
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
			<Box position={'absolute'} bottom={-3} bg={'red.500'} h={1} w={1} borderRadius={'full'} />
		</>
	)
}

export default ProfileTab
