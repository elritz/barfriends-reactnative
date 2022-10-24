import TermsServicePrivacyTabStack from './TermsServicePrivacyTabStack'
import LogoTransparent from '@assets/images/company/LogoTransparent'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SettingsNavigatorParamList } from '@types'

const ScreenStack = createNativeStackNavigator<SettingsNavigatorParamList>()

function SettingsNavigator() {
	return (
		<ScreenStack.Navigator>
			<ScreenStack.Screen
				name='TermsServicePrivacyTabStack'
				component={TermsServicePrivacyTabStack}
				options={{
					headerTitle: () => <LogoTransparent height={30} width={192} />,
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
		</ScreenStack.Navigator>
	)
}

export default SettingsNavigator
