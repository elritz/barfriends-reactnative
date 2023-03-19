import PermissionDetailItem from '../PermissionDetailItem'
import { useReactiveVar } from '@apollo/client'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { PermissionCameraReactiveVar } from '@reactive'
import IllustrationDynamicMedia from 'assets/images/media/IllustrationDynamicMedia'
import * as Contacts from 'expo-contacts'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Linking from 'expo-linking'
import { Box, Button, Divider, Heading, ScrollView } from 'native-base'
import { useContext, useEffect, useRef } from 'react'
import { AppState, Platform, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { PermissionContactsReactiveVar } from 'src/reactive/permissions/contacts'
import { ThemeContext } from 'styled-components/native'

// TODO: FN(Open camera app) ln:66

const details = [
	{
		title: 'How you’ll use this',
		detail: 'To search your contacts on Bfs.',
		iconName: 'contact',
		iconType: AntDesign,
	},
	{
		title: 'How we’ll use this',
		detail: 'To show you contact content and updates.',
		iconName: 'android-messages',
		iconType: MaterialCommunityIcons,
	},
	{
		title: 'How theses settings work',
		detail:
			'You can change your choices at any time in your device settings. If you allow access now, you wont have to again.',
		iconName: 'ios-settings-sharp',
		iconType: Ionicons,
	},
]

const ContactsPermissionScreen = () => {
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const appStateRef = useRef(AppState.currentState)
	const isFocused = useIsFocused()
	const rPermissionContacts = useReactiveVar(PermissionContactsReactiveVar)

	const handleAppStateChange = (nextAppState: any) => {
		if (/inactive|background/.exec(appStateRef.current) && nextAppState === 'active') {
		}
		appStateRef.current = nextAppState
	}

	useEffect(() => {
		async function loadPermissionsAsync() {
			try {
				const status = await Contacts.getPermissionsAsync()
				PermissionContactsReactiveVar(status)
			} catch (e) {
				console.warn(e)
			}
		}
		loadPermissionsAsync()
	}, [isFocused])

	const openCameraApp = async () => {
		console.log('TODO: opencamera')
	}

	const openPhoneSettings = async () => {
		if (Platform.OS === 'ios') {
			Linking.openURL('app-settings://')
		} else {
			IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.C)
		}
	}

	const requestPermission = async () => {
		const status = await Contacts.requestPermissionsAsync()
		PermissionContactsReactiveVar(status)
	}

	const DetailView = () => {
		return (
			<ScrollView>
				<Box safeAreaBottom style={{ flex: 1 }}>
					<Box alignItems={'center'} justifyContent={'flex-start'} marginY={5}>
						<IllustrationDynamicMedia width={60} height={60} />
						<Divider width={2} style={{ width: 50, marginVertical: 10 }} />
						<Heading
							fontWeight={'900'}
							style={{
								width: wp(95),
								maxWidth: 300,
								textAlign: 'center',
							}}
							allowFontScaling
							adjustsFontSizeToFit
							numberOfLines={3}
						>
							Allow Barfriends to access your camera and microphone
						</Heading>
					</Box>
					<Box width={wp(95)} style={{ flex: 1, alignSelf: 'center' }}>
						{details.map((item, index) => {
							return (
								<View key={index}>
									<PermissionDetailItem {...item} />
								</View>
							)
						})}
					</Box>
				</Box>
			</ScrollView>
		)
	}

	return (
		<Box safeAreaBottom style={{ flex: 1 }}>
			<DetailView />
			<View>
				<Divider width={0.5} />
				<Button
					onPress={async () =>
						rPermissionContacts?.canAskAgain && !rPermissionContacts.granted
							? await requestPermission()
							: openPhoneSettings()
					}
					width={'100%'}
					my={3}
					px={20}
					bg={themeContext.palette.bfscompany.tertiary}
					style={{
						justifyContent: 'center',
					}}
					_text={{
						fontWeight: 'bold',
					}}
				>
					{rPermissionContacts?.canAskAgain && !rPermissionContacts.granted
						? 'Continue'
						: 'Go to Phone Settings'}
				</Button>
			</View>
		</Box>
	)
}

export default ContactsPermissionScreen
