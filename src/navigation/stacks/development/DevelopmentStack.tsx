import { useReactiveVar } from '@apollo/client'
import LogoTransparent from '@assets/images/company/LogoTransparent'
import DevelopmentScreen from '@navigation/screens/hometabs/development/DevelopmentScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { ThemeReactiveVar } from '@reactive'
import { DevelopmentStackParamList, PersonalCredentialStackParamList } from '@types'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { Box } from 'native-base'
import { VStack } from 'native-base'
import { useContext } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { ThemeContext } from 'styled-components/native'

const ScreenStack = createStackNavigator<DevelopmentStackParamList>()

function DevelopmentStack() {
	const colorScheme = useThemeColorScheme()
	return (
		<ScreenStack.Navigator
			screenOptions={{
				headerShown: true,
				headerTransparent: true,
				gestureResponseDistance: 240,
				gestureDirection: 'horizontal',
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
		>
			<ScreenStack.Screen name='DevelopmentOptionsScreen' component={DevelopmentScreen} />
			<ScreenStack.Screen name='ChangeThemeScreen' component={DevelopmentScreen} />
		</ScreenStack.Navigator>
	)
}

export default DevelopmentStack
