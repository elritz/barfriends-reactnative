import LogoTransparent from '@assets/images/company/LogoTransparent'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
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
import { Box, Heading, useColorMode, useTheme } from 'native-base'
import { View } from 'react-native'

const ScreenStack = createNativeStackNavigator<ProfileEditorNavigatorParamList>()

function ProfileProfileEditorNavigator() {
	const theme = useTheme()
	const colorScheme = useColorMode()

	return (
		<ScreenStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor:
						colorScheme.colorMode === 'light' ? theme.colors.light[50] : theme.colors.dark[50],
				},
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

export default ProfileProfileEditorNavigator
