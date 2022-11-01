import LogoTransparent from '@assets/images/company/LogoTransparent'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import DevelopmentScreen from '@navigation/screens/hometabs/development/DevelopmentScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { DevelopmentStackParamList, PersonalCredentialStackParamList } from '@types'

const ScreenStack = createStackNavigator<DevelopmentStackParamList>()

function DevelopmentStack() {
	return (
		<ScreenStack.Navigator
			screenOptions={{
				headerTitle: () => <LogoTransparent height={30} width={192} />,
			}}
		>
			<ScreenStack.Screen name='DevelopmentOptionsScreen' component={DevelopmentScreen} />
			<ScreenStack.Screen name='ChangeThemeScreen' component={DevelopmentScreen} />
		</ScreenStack.Navigator>
	)
}

export default DevelopmentStack
