import { useReactiveVar } from '@apollo/client'
import { Box, VStack } from '@components/core'
import SearchInput from '@components/molecules/search/searchinput/SearchInput'
import DevelopmentTab from '@components/molecules/tabbaricons/hometabicons/developmenttab'
import MessageTab from '@components/molecules/tabbaricons/hometabicons/messagestab'
import ProfileTab from '@components/molecules/tabbaricons/hometabicons/profiletab'
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
import { Tabs, useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const insets = useSafeAreaInsets()
	const HEADER_HEIGHT = SEARCH_BAR_HEIGHT + 15
	const h = insets.top + HEADER_HEIGHT
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
				header: () => {
					return (
						<VStack
							justifyContent={'flex-end'}
							sx={{
								pt: insets.top,
								h,
								_light: { bg: '$light100' },
								_dark: { bg: '$dark50' },
							}}
							pb={'$2'}
						>
							<SearchInput />
						</VStack>
					)
				},
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
