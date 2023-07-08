import { useReactiveVar } from '@apollo/client'
import { Box } from '@components/core'
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
import { Tabs } from 'expo-router'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const insets = useSafeAreaInsets()
	const HEADER_HEIGHT = SEARCH_BAR_HEIGHT
	const h = insets.top + HEADER_HEIGHT

	return (
		<Tabs
			screenOptions={{
				tabBarBackground: () => <Box style={[StyleSheet.absoluteFill]} />,
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
					headerShown: false,
					tabBarLabel: 'outaboot',
					tabBarShowLabel: false,
					tabBarIcon: ({ color }: IColor) => <VenueFeedTab color={color} />,
				}}
			/>
			<Tabs.Screen
				name='explorestack'
				options={{
					headerShown: false,
					href: null,
					tabBarLabel: 'explore',
					tabBarShowLabel: false,
					tabBarIcon: ({ color }: IColor) => <SearchTab color={color} />,
				}}
			/>
			<Tabs.Screen
				name={'tonight'}
				options={{
					href:
						rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === 'PERSONAL'
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
						// href: null,
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
