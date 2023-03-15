import { useReactiveVar } from '@apollo/client'
import DevelopmentTab from '@components/molecules/tabbaricons/hometabicons/developmenttab'
import MessageTab from '@components/molecules/tabbaricons/hometabicons/messagestab'
import ProfileTab from '@components/molecules/tabbaricons/hometabicons/profiletab'
import SearchTab from '@components/molecules/tabbaricons/hometabicons/searchtab'
import TonightTab from '@components/molecules/tabbaricons/hometabicons/tonighttab'
import VenueFeedTab from '@components/molecules/tabbaricons/hometabicons/venuefeedtab'
import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
} from '@constants/ReactNavigationConstants'
import { IColor } from '@ctypes/app'
import { ENVIRONMENT } from '@env'
import { AuthorizationReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { Tabs } from 'expo-router'
import { Box, Text } from 'native-base'
import { useContext } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeContext } from 'styled-components/native'

export default () => {
	const colorScheme = useThemeColorScheme()
	const insets = useSafeAreaInsets()
	const themeContext = useContext(ThemeContext)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	return (
		<Tabs
			screenOptions={{
				tabBarBackground: () => (
					<>
						{/* {Platform.OS === 'ios' ? (
							<BlurView style={[StyleSheet.absoluteFill]} tint={colorScheme} intensity={100}></BlurView>
						) : ( */}
						<View
							style={[
								StyleSheet.absoluteFill,
								{ backgroundColor: themeContext.palette.primary.background.default },
							]}
						/>
						{/* )} */}
					</>
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
					paddingVertical: 10,
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
					headerShown: false,
					tabBarLabel: 'outaboot',
					tabBarShowLabel: false,
					tabBarIcon: ({ color }: IColor) => <VenueFeedTab color={color} />,
				}}
			/>
			<Tabs.Screen
				name='searchstack'
				options={{
					headerShown: false,
					tabBarLabel: 'search',
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
