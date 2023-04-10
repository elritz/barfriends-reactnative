import { useReactiveVar } from '@apollo/client'
import VenueFeedSearchInput from '@components/molecules/search/venuefeed/VenueFeedSearchInput'
import DevelopmentTab from '@components/molecules/tabbaricons/hometabicons/developmenttab'
import MessageTab from '@components/molecules/tabbaricons/hometabicons/messagestab'
import ProfileTab from '@components/molecules/tabbaricons/hometabicons/profiletab'
import SearchTab from '@components/molecules/tabbaricons/hometabicons/searchtab'
import TonightTab from '@components/molecules/tabbaricons/hometabicons/tonighttab'
import VenueFeedTab from '@components/molecules/tabbaricons/hometabicons/venuefeedtab'
import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
	SEARCH_BAR_HEIGHT,
} from '@constants/ReactNavigationConstants'
import { IColor } from '@ctypes/app'
import { ENVIRONMENT } from '@env'
import { AuthorizationReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Tabs } from 'expo-router'
import { Box, Text, VStack } from 'native-base'
import { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeContext } from 'styled-components/native'

export default () => {
	const insets = useSafeAreaInsets()

	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const HEADER_HEIGHT = SEARCH_BAR_HEIGHT + 15
	const h = insets.top + HEADER_HEIGHT

	return (
		<Tabs
			screenOptions={{
				tabBarBackground: () => (
					<Box
						style={[
							StyleSheet.absoluteFill,
							// { backgroundColor: themeContext.palette.primary.background.default },
						]}
						_light={{ bg: 'light.50' }}
						_dark={{ bg: 'dark.50' }}
					/>
				),
				// tabBarActiveTintColor: themeContext.palette.primary.color.accent,
				// tabBarInactiveTintColor: themeContext.palette.primary.color.light,
				tabBarStyle: {
					height:
						insets.bottom !== 0
							? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
							: HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
					position: 'absolute',
					alignItems: 'center',
					elevation: 0, // for Android
					borderTopWidth: 0,
				},
				tabBarShowLabel: false,
			}}
			initialRouteName='venuefeedstack'
		>
			<Tabs.Screen
				name='venuefeedstack'
				options={{
					header: () => {
						return (
							<VStack
								_light={{ bg: 'light.50' }}
								_dark={{ bg: 'dark.50' }}
								justifyContent={'flex-end'}
								h={h}
								pb={2}
							>
								<VenueFeedSearchInput />
							</VStack>
						)
					},
					tabBarLabel: 'outaboot',
					tabBarShowLabel: false,
					tabBarIcon: ({ color }: IColor) => <VenueFeedTab color={color} />,
				}}
			/>
			<Tabs.Screen
				name='explorestack'
				options={{
					headerShown: false,
					tabBarLabel: 'explore',
					tabBarShowLabel: false,
					tabBarIcon: ({ color }: IColor) => <SearchTab color={color} />,
				}}
			/>
			<Tabs.Screen
				name={'tonight'}
				options={{
					href:
						rAuthorizationVar?.DeviceProfile?.Profile.ProfileType === 'PERSONAL'
							? '(app)/hometab/tonight'
							: null,
					headerShown: false,
					tabBarLabel: 'tonight',
					tabBarIcon: ({ color }: IColor) => <TonightTab color={color} />,
				}}
			/>
			<Tabs.Screen
				name='messagestack'
				options={{
					headerShown: false,
					tabBarLabel: 'messages',
					tabBarShowLabel: false,
					tabBarIcon: ({ color }: IColor) => <MessageTab color={color} />,
				}}
			/>
			<Tabs.Screen
				name='profilestack'
				options={{
					headerShown: false,
					tabBarLabel: 'profile',
					tabBarShowLabel: false,
					tabBarIcon: ({ color }: IColor) => <ProfileTab color={color} />,
				}}
			/>
			{ENVIRONMENT === 'development' && (
				<Tabs.Screen
					name='developmentstack'
					options={{
						headerShown: false,
						tabBarLabel: 'development',
						tabBarShowLabel: false,
						tabBarIcon: ({ color }: IColor) => <DevelopmentTab color={color} />,
					}}
				/>
			)}
		</Tabs>
	)
}
