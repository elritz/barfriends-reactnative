import LogoTransparent from '@assets/images/company/LogoTransparent'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import DevelopmentScreen from '@navigation/screens/hometabs/development/DevelopmentScreen'
import ThemeViewer from '@navigation/screens/hometabs/development/themeviewer/ThemeViewer'
import { createStackNavigator } from '@react-navigation/stack'
import { DevelopmentStackParamList, PersonalCredentialStackParamList } from '@types'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { Box } from 'native-base'
import { VStack } from 'native-base'
import { StyleSheet, Platform } from 'react-native'

const ScreenStack = createStackNavigator<DevelopmentStackParamList>()

function DevelopmentStack() {
	const colorScheme = useThemeColorScheme()
	return (
		<ScreenStack.Navigator
			screenOptions={{
				headerShown: false,
				headerTransparent: true,
				gestureResponseDistance: 240,
				gestureDirection: 'horizontal',
			}}
		>
			<ScreenStack.Screen
				options={{
					headerShown: true,
					header: () => {
						return (
							<VStack height={90} justifyContent={'flex-end'} alignItems={'center'} pb={2}>
								{Platform.OS === 'ios' ? (
									<BlurView style={StyleSheet.absoluteFill} tint={colorScheme} intensity={80} />
								) : (
									<Box style={[StyleSheet.absoluteFill]} />
								)}
								<LogoTransparent height={30} width={192} />
							</VStack>
						)
					},
				}}
				name='DevelopmentOptionsScreen'
				component={DevelopmentScreen}
			/>
			<ScreenStack.Screen
				options={{
					headerShown: true,
					headerTitle: () => <LogoTransparent height={30} width={192} />,
					headerLeft: () => <ChevronBackArrow />,
				}}
				name='ThemeViewer'
				component={ThemeViewer}
			/>
		</ScreenStack.Navigator>
	)
}

export default DevelopmentStack
