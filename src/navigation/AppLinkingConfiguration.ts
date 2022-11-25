import { RootNavigatorParamList } from '../types/app.d'
import { LinkingOptions } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import * as Notifications from 'expo-notifications'

// TODO: FN(What to do with the last notification Action)

// Published app in Expo Go: exp://exp.host/@community/with-webbrowser-redirect
// Published app in standalone: myapp://
// Development in Expo Go: exp://127.0.0.1:19000

const prefix = Linking.createURL('')

const linking: LinkingOptions<RootNavigatorParamList> = {
	prefixes: [
		prefix,
		'https://barfriends.com',
		'https://app.barfriends.com',
		'https://*.barfriends.com',
	],
	config: {
		screens: {
			PermissionNavigator: {},
			ProfileEditorNavigator: {},
			ModalNavigator: {},
			PublicNavigator: {
				path: 'publicnavigator',
				screens: {
					PersonalStack: {
						path: 'personalstack',
						screens: {
							PublicPersonalScreen: 'publicpersonalscreen/:profileId',
						},
					},
					VenueStack: {
						path: 'venuestack',
						screens: {
							PublicVenueScreen: 'publicvenuescreen/:profileId',
						},
					},
				},
			},
			MessageRoomNavigator: {
				path: 'messageroomnavigator',
				screens: {
					MessagingRoomScreen: {
						path: 'messagingroomscreen/:messageroomId',
					},
				},
			},
			HomeTabNavigator: {
				path: 'hometabnavigator',
				screens: {
					VenueFeedStack: {
						path: 'venuefeedstack',
						screens: {
							VenueFeedScreen: 'venuefeedscreen',
						},
					},
					TonightStack: {
						path: 'tonightstack',
						screens: {
							TonightScreen: 'tonightscreen',
						},
					},
					ExploreStack: {
						path: 'explorestack',
						screens: {
							SearchFeedScreen: 'search/feed',
							SearchTextScreen: 'search/:text?',
						},
					},
					ProfileStack: {
						path: 'profilestack',
						screens: {
							UserProfileScreen: 'userprofilescreen',
							VenueProfileScreen: 'venueprofilescreen',
						},
					},
				},
			},
			CredentialNavigator: {
				path: 'credentialnavigator',
				screens: {
					PersonalCredentialStack: {
						screens: {
							BirthdayScreen: 'birthdayscreen',
							ConfirmationCodeScreen: 'confirmationcodescreen',
							EmojimoodScreen: 'emojimoodscreen',
							GetStartedScreen: 'getstartedscreen',
							UsernameScreen: 'usernamescreen',
							PasswordCreateScreen: 'passwordcreatescreen',
							PhotoScreen: 'photoscreen',
							EmailPhoneTabStack: {
								path: 'emailphonetabstack',
								screens: {
									EmailScreen: 'emailscreen',
									PhoneScreen: 'phonescreen',
								},
							},
							TermsServicePrivacyTabStack: {
								path: 'termserviceprivacytabstack',
								screens: {
									PrivacyScreen: 'privacyscreen',
									ServiceScreen: 'servicescreen',
								},
							},
						},
					},
				},
			},
		},
	},
	// async getInitialURL() {
	// 	// First, you may want to do the default deep link handling
	// 	// Check if app was opened from a deep link
	// 	const url = await Linking.getInitialURL()

	// 	if (url != null) {
	// 		return urls
	// 	}

	// 	// Handle URL from expo push notifications
	// 	const response = await Notifications.getLastNotificationResponseAsync()
	// 	// const url = response?.notification.request.content.data.url;

	// 	return url
	// },
	// subscribe(listener) {
	// 	const onReceiveURL = ({ url }: { url: string }) => listener(url)

	// 	// Listen to incoming links from deep linking
	// 	Linking.addEventListener('url', onReceiveURL)

	// 	// 	// Listen to expo push notifications
	// 	const subscription = Notifications.addNotificationResponseReceivedListener(response => {
	// 		const url = response.notification.request.content.data.url

	// 		// Any custom logic to see whether the URL needs to be handled
	// 		//...

	// 		// Let React Navigation handle the URL
	// 		listener(url)
	// 	})

	// 	return () => {
	// 		// Clean up the event listeners
	// 		subscription.remove()
	// 	}
	// },
}

export default linking
