import LogoTransparent from '@assets/images/company/LogoTransparent'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import BirthdayScreen from '@navigation/screens/settings/profileeditor/birthdayscreen/BirthdayScreen'
import CurrentPlacceScreen from '@navigation/screens/settings/profileeditor/currentplacescreen/CurrentPlacceScreen'
import DescriptionScreen from '@navigation/screens/settings/profileeditor/descriptionscreen/DescriptionScreen'
import EditableOptionsScreen from '@navigation/screens/settings/profileeditor/editableoptionsscreen/EditableOptionsScreen'
import EmojimoodScreen from '@navigation/screens/settings/profileeditor/emojimoodscreen/EmojimoodScreen'
import GenderScreen from '@navigation/screens/settings/profileeditor/genderscreen/GenderScreen'
import HomeTownScreen from '@navigation/screens/settings/profileeditor/hometownscreen/HomeTownScreen'
import InterestScreen from '@navigation/screens/settings/profileeditor/interestscreen/InterestScreen'
import LookingForScreen from '@navigation/screens/settings/profileeditor/lookingforscreen/LookingForScreen'
import NamesScreen from '@navigation/screens/settings/profileeditor/namesscreen/NamesScreen'
import SexualPreferenceScreen from '@navigation/screens/settings/profileeditor/sexualpreferencescreen/SexualPreferenceScreen'
import StatusScreen from '@navigation/screens/settings/profileeditor/statusscreen/StatusScreen'
import UsernameScreen from '@navigation/screens/settings/profileeditor/usernamescreen/UsernameScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProfileEditorStackParamList } from '@types'
import { useColorMode, useTheme } from 'native-base'

const ScreenStack = createNativeStackNavigator<ProfileEditorStackParamList>()

function ProfileEditorStack() {
	const theme = useTheme()
	const colorScheme = useColorMode()

	return (
		<ScreenStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor:
						colorScheme.colorMode === 'light' ? theme.colors.light[50] : theme.colors.dark[50],
				},
				headerShown: false,
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
					headerTitle: 'Name',
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
			<ScreenStack.Screen
				name='UsernameScreen'
				component={UsernameScreen}
				options={{
					headerTitle: 'Username',
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
			<ScreenStack.Screen
				name='EmojimoodScreen'
				component={EmojimoodScreen}
				options={{
					headerTitle: 'Emojimood',
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
			<ScreenStack.Screen
				name='BirthdayScreen'
				component={BirthdayScreen}
				options={{
					headerTitle: 'Birthday',
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
			<ScreenStack.Screen
				name='DescriptionScreen'
				component={DescriptionScreen}
				options={{
					headerTitle: 'About',
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
			<ScreenStack.Screen
				name='InterestScreen'
				component={InterestScreen}
				options={{
					headerTitle: 'Interests',
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
			<ScreenStack.Screen
				name='GenderScreen'
				component={GenderScreen}
				options={{
					headerTitle: 'Gender',
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
			<ScreenStack.Screen
				name='SexualPreferenceScreen'
				component={SexualPreferenceScreen}
				options={{
					headerTitle: 'Sexual Preference',
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
			<ScreenStack.Screen
				name='StatusScreen'
				component={StatusScreen}
				options={{
					headerTitle: 'Relationship',
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
			<ScreenStack.Screen
				name='HometownScreen'
				component={HomeTownScreen}
				options={{
					headerTitle: 'Hometown',
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>

			<ScreenStack.Screen
				name='LookingForScreen'
				component={LookingForScreen}
				options={{
					headerTitle: 'Look for',
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
			<ScreenStack.Screen
				name='CurentPlaceScreen'
				component={CurrentPlacceScreen}
				options={{
					headerTitle: 'Current place',
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
		</ScreenStack.Navigator>
	)
}

export default ProfileEditorStack
