import { useReactiveVar } from '@apollo/client'
import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
} from '@constants/ReactNavigationConstants'
import { IColor } from '@ctypes/app'
import { MaterialIcons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Tabs } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function _layout() {
	const insets = useSafeAreaInsets()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const colorScheme = useThemeColorScheme()

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				headerStyle: {},

				tabBarStyle: {
					backgroundColor:
						colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light50
							: rTheme.theme?.gluestack.tokens.colors.dark50,
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
						<MaterialIcons size={30} name='privacy-tip' color={color} />
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
						<MaterialIcons size={30} name='room-service' color={color} />
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
