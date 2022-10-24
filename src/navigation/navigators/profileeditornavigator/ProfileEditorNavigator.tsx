import LogoTransparent from '@assets/images/company/LogoTransparent'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import RNEHeading500 from '@components/atoms/typography/RNETypography/heading/RNEHeading500'
import BirthdayScreen from '@navigation/screens/editors/birthdayscreen/BirthdayScreen'
import CurrentPlacceScreen from '@navigation/screens/editors/currentplacescreen/CurrentPlacceScreen'
import DescriptionScreen from '@navigation/screens/editors/descriptionscreen/DescriptionScreen'
import EditableOptionsScreen from '@navigation/screens/editors/editableoptionsscreen/EditableOptionsScreen'
import EmojimoodScreen from '@navigation/screens/editors/emojimoodscreen/EmojimoodScreen'
import GenderScreen from '@navigation/screens/editors/genderscreen/GenderScreen'
import HomeTownScreen from '@navigation/screens/editors/hometownscreen/HomeTownScreen'
import InterestScreen from '@navigation/screens/editors/interestscreen/InterestScreen'
import LookingForScreen from '@navigation/screens/editors/lookingforscreen/LookingForScreen'
import NamesScreen from '@navigation/screens/editors/namesscreen/NamesScreen'
import SexualPreferenceScreen from '@navigation/screens/editors/sexualpreferencescreen/SexualPreferenceScreen'
import StatusScreen from '@navigation/screens/editors/statusscreen/StatusScreen'
import UsernameScreen from '@navigation/screens/editors/usernamescreen/UsernameScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProfileEditorNavigatorParamList } from '@types'
import { View } from 'react-native'

const ScreenStack = createNativeStackNavigator<ProfileEditorNavigatorParamList>()

const ScreenHeader = ({ title }: { title: string }) => (
	<View style={{ flexDirection: 'row', alignItems: 'center' }}>
		<ChevronBackArrow />
		<RNEHeading500 style={{ textTransform: 'uppercase' }}>{title}</RNEHeading500>
	</View>
)

function ProfileProfileEditorNavigator() {
	return (
		<ScreenStack.Navigator
			screenOptions={{
				headerTitle: () => <LogoTransparent height={30} width={192} />,
				headerLeft: () => <ChevronBackArrow />,
			}}
		>
			<ScreenStack.Screen name='EditableOptionsScreen' component={EditableOptionsScreen} />

			<ScreenStack.Screen
				name='NamesScreen'
				component={NamesScreen}
				options={{
					// headerShown: false,
					headerTitle: '',
					headerLeft: () => <ScreenHeader title='Name' />,
				}}
			/>
			<ScreenStack.Screen
				name='UsernameScreen'
				component={UsernameScreen}
				options={{
					headerTitle: '',
					headerLeft: () => <ScreenHeader title='Username' />,
				}}
			/>
			<ScreenStack.Screen
				name='EmojimoodScreen'
				component={EmojimoodScreen}
				options={{
					headerTitle: '',
					headerLeft: () => <ScreenHeader title='Emojimood' />,
				}}
			/>
			<ScreenStack.Screen
				name='BirthdayScreen'
				component={BirthdayScreen}
				options={{
					headerTitle: '',
					headerLeft: () => <ScreenHeader title='Birthday' />,
				}}
			/>
			<ScreenStack.Screen
				name='DescriptionScreen'
				component={DescriptionScreen}
				options={{
					headerTitle: '',
					headerLeft: () => <ScreenHeader title='About' />,
				}}
			/>
			<ScreenStack.Screen
				name='InterestScreen'
				component={InterestScreen}
				options={{
					headerTitle: '',
					headerLeft: () => <ScreenHeader title='Interests' />,
				}}
			/>
			<ScreenStack.Screen
				name='GenderScreen'
				component={GenderScreen}
				options={{
					headerTitle: '',
					headerLeft: () => <ScreenHeader title='Gender' />,
				}}
			/>
			<ScreenStack.Screen
				name='SexualPreferenceScreen'
				component={SexualPreferenceScreen}
				options={{
					headerTitle: '',
					headerLeft: () => <ScreenHeader title='Sexual Preference' />,
				}}
			/>
			<ScreenStack.Screen
				name='StatusScreen'
				component={StatusScreen}
				options={{
					headerTitle: '',
					headerLeft: () => <ScreenHeader title='Status' />,
				}}
			/>
			<ScreenStack.Screen
				name='HometownScreen'
				component={HomeTownScreen}
				options={{
					headerTitle: '',
					headerLeft: () => <ScreenHeader title='Hometown' />,
				}}
			/>

			<ScreenStack.Screen
				name='LookingForScreen'
				component={LookingForScreen}
				options={{
					headerTitle: '',
					headerLeft: () => <ScreenHeader title='Looking For' />,
				}}
			/>
			<ScreenStack.Screen
				name='CurentPlaceScreen'
				component={CurrentPlacceScreen}
				options={{
					headerTitle: '',
					headerLeft: () => <ScreenHeader title='Current Place' />,
				}}
			/>
		</ScreenStack.Navigator>
	)
}

export default ProfileProfileEditorNavigator
