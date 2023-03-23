import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
} from '@constants/ReactNavigationConstants'
import { IColor } from '@ctypes/app'
import { MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { Icon, useTheme, useColorMode } from 'native-base'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function _layout() {
	const insets = useSafeAreaInsets()
	const theme = useTheme()
	const colorScheme = useColorMode()

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				headerStyle: {},

				tabBarStyle: {
					backgroundColor:
						colorScheme.colorMode === 'light' ? theme.colors.light[50] : theme.colors.dark[50],
					height:
						insets.bottom !== 0
							? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
							: HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
					position: 'absolute',
					alignItems: 'center',
					paddingVertical: 10,
					borderTopWidth: 0,
				},
			}}
		>
			<Tabs.Screen
				name={'privacy'}
				options={{
					tabBarIcon: ({ color }: IColor) => (
						<Icon color={color} name={'privacy-tip'} as={MaterialIcons} size={'lg'} />
					),
					tabBarLabelStyle: {
						fontSize: 13,
						fontWeight: '600',
					},
				}}
			/>
			<Tabs.Screen
				name={'services'}
				options={{
					tabBarIcon: ({ color }: IColor) => (
						<Icon color={color} name={'room-service'} as={MaterialIcons} size={'lg'} />
					),
					tabBarLabelStyle: {
						fontSize: 13,
						fontWeight: '600',
					},
				}}
			/>
		</Tabs>
	)
}
