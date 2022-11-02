import { useReactiveVar } from '@apollo/client'
import DevelopmentTab from '@components/molecules/tabbaricons/hometabicons/developmenttab'
import MessageTab from '@components/molecules/tabbaricons/hometabicons/messagestab'
import ProfileTab from '@components/molecules/tabbaricons/hometabicons/profiletab'
import SearchTab from '@components/molecules/tabbaricons/hometabicons/searchtab'
import TonightTab from '@components/molecules/tabbaricons/hometabicons/tonighttab'
import VenueFeedTab from '@components/molecules/tabbaricons/hometabicons/venuefeedtab'
import { ENVIRONMENT } from '@env'
import DevelopmentScreen from '@navigation/screens/hometabs/development/DevelopmentScreen'
import DevelopmentStack from '@navigation/stacks/development/DevelopmentStack'
import ExploreStack from '@navigation/stacks/home/explorestack/ExploreStack'
import MessagesStack from '@navigation/stacks/home/messagestack/MessagesStack'
import ProfileStack from '@navigation/stacks/home/profilestack/ProfileStack'
import VenueFeedStack from '@navigation/stacks/home/venuefeedstack/VenueFeedStack'
import TonightStack from '@navigation/stacks/tonightstack/TonightStack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ThemeReactiveVar } from '@reactive'
import { HomeTabNavigatorParamList } from '@types'
import { BlurView } from 'expo-blur'
import { useContext } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { ThemeContext } from 'styled-components/native'

const ScreenStack = createBottomTabNavigator<HomeTabNavigatorParamList>()
interface IColor {
	color: string
}

function HomeTabNavigator() {
	const themeContext = useContext(ThemeContext)
	const theme = useReactiveVar(ThemeReactiveVar)

	return (
		<ScreenStack.Navigator
			// initialRouteName='MessagesStack'
			initialRouteName='VenueFeedStack'
			screenOptions={{
				tabBarBackground: () => (
					<>
						{Platform.OS === 'ios' ? (
							<BlurView style={StyleSheet.absoluteFill} tint={theme} intensity={100} />
						) : (
							<View
								style={[
									StyleSheet.absoluteFill,
									{ backgroundColor: themeContext.palette.primary.background.default },
								]}
							/>
						)}
					</>
				),
				tabBarStyle: {
					position: 'absolute',
					height: 90,
					paddingVertical: 15,
					shadowOpacity: 0,
					shadowRadius: 4.84,
					shadowOffset: {
						width: 0,
						height: 0,
					},
					borderTopLeftRadius: 21,
					borderTopRightRadius: 21,
					elevation: 3,
				},
				tabBarShowLabel: false,
			}}
		>
			<ScreenStack.Screen
				name='VenueFeedStack'
				component={VenueFeedStack}
				options={{
					title: '',
					headerShown: false,
					tabBarLabel: 'outaboot',
					tabBarShowLabel: false,
					tabBarIcon: ({ color }: IColor) => <VenueFeedTab color={color} />,
					tabBarBadge: 11,
				}}
			/>
			<ScreenStack.Screen
				name='ExploreStack'
				component={ExploreStack}
				options={{
					title: '',
					headerTransparent: true,
					headerShown: false,
					tabBarLabel: 'search',
					tabBarShowLabel: false,
					tabBarIcon: ({ color }: IColor) => <SearchTab color={color} />,
					tabBarBadge: 11,
				}}
			/>
			<ScreenStack.Screen
				name='TonightStack'
				component={TonightStack}
				options={{
					headerShown: false,
					tabBarLabel: 'tonight',
					tabBarIcon: ({ color }: IColor) => <TonightTab color={color} />,
				}}
			/>
			<ScreenStack.Screen
				name='MessagesStack'
				component={MessagesStack}
				options={{
					headerShown: false,
					tabBarLabel: 'messages',
					tabBarIcon: ({ color }: IColor) => <MessageTab color={color} />,
					tabBarBadge: 13,
				}}
			/>
			<ScreenStack.Screen
				name='ProfileStack'
				component={ProfileStack}
				options={{
					headerShown: false,
					tabBarIcon: ({ color }: IColor) => <ProfileTab color={color} />,
					tabBarLabel: 'profile',
					tabBarBadge: 12,
				}}
			/>
			{ENVIRONMENT === 'development' && (
				<ScreenStack.Screen
					name='DevelopmentStack'
					component={DevelopmentStack}
					options={{
						headerShown: false,
						tabBarIcon: ({ color }: IColor) => <DevelopmentTab color={color} />,
						tabBarLabel: 'development',
					}}
				/>
			)}
		</ScreenStack.Navigator>
	)
}

export default HomeTabNavigator
