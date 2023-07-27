import { Box } from '@components/core'
import DevelopmentTab from '@components/molecules/tabbaricons/hometabicons/developmenttab'
import MessageTab from '@components/molecules/tabbaricons/hometabicons/messagestab'
import ProfileTab from '@components/molecules/tabbaricons/hometabicons/profiletab'
import TonightTab from '@components/molecules/tabbaricons/hometabicons/tonighttab'
import VenueFeedTab from '@components/molecules/tabbaricons/hometabicons/venuefeedtab'
import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
} from '@constants/ReactNavigationConstants'
import { IColor } from '@ctypes/app'
import { ENVIRONMENT } from '@env'
import { Tabs } from 'expo-router'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const insets = useSafeAreaInsets()
	return (
		<Tabs
			initialRouteName='venuefeed'
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
				headerShown: false,
				tabBarShowLabel: false,
			}}
		>
			<Tabs.Screen
				name='venuefeed'
				options={{
					// headerShown: false,
					tabBarLabel: 'outaboot',
					tabBarShowLabel: false,
					tabBarIcon: ({ color }: IColor) => <VenueFeedTab color={color} />,
				}}
			/>
			<Tabs.Screen
				name={'tonight'}
				options={{
					href: '(app)/hometab/tonight',
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
