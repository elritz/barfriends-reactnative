import { Personal, Profile, Theme, Venue } from '@graphql/generated'
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs'
import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Float } from 'react-native/Libraries/Types/CodegenTypes'

export interface IColor {
	color: string
}

export type AuthorizationDecoded =
	| {
			devicemanager: string
			iat: number
			exp: number
	  }
	| null
	| undefined

export type ConfigurationParamList = {
	config: undefined
	env: undefined
}

export type RootNavigatorParamList = {
	HomeTabNavigator: NavigatorScreenParams<HomeTabNavigatorParamList> | undefined
	CredentialNavigator: NavigatorScreenParams<CredentialNavigatorParamList> | undefined
	PermissionNavigator: NavigatorScreenParams<PermissionNavigatorParamList> | undefined
	ProfileSettingsNavigator: NavigatorScreenParams<ProfileSettingsNavigatorParamList> | undefined
	PublicNavigator: NavigatorScreenParams<PublicNavigatorParamList> | undefined
	ModalNavigator: NavigatorScreenParams<ModalNavigatorParamList> | undefined
	MessageRoomNavigator: NavigatorScreenParams<MessageRoomNavigatorParamList> | undefined
}

export type MessageRoomNavigatorParamList = {
	MessagingRoomScreen: {
		messageroomId: string
	}
}

export type ModalNavigatorParamList = {
	DeviceManager: undefined
	MediaLibraryModal: undefined
	SearchAreaModalStack: NavigatorScreenParams<SearchAreaStackParamList> | undefined
	InviteStack: NavigatorScreenParams<InviteStackParamList> | undefined
	NotFound: undefined
}

export type ProfileSettingsNavigatorParamList = {
	ProfileSettingsOptionsScreen: undefined
	NotificationsSettingsScreen: undefined
	SecuritySettingsScreen: undefined
	AppearanceSettingsScreen: undefined
	ProfileEditorStack: NavigatorScreenParams<ProfileEditorStackParamList> | undefined
}

export type ProfileEditorStackParamList = {
	EditableOptionsScreen: undefined
	NamesScreen: undefined
	EmojimoodScreen: undefined
	UsernameScreen: undefined
	BirthdayScreen: undefined
	DescriptionScreen: undefined
	InterestScreen: undefined
	GenderScreen: undefined
	LookingForScreen: undefined
	StatusScreen: undefined
	SexualPreferenceScreen: undefined
	HometownScreen: undefined
	CurentPlaceScreen: undefined
}

export type CredentialNavigatorParamList = {
	PersonalCredentialStack: NavigatorScreenParams<PersonalCredentialStackParamList> | undefined
	LoginCredentialStack: NavigatorScreenParams<LoginStackParamList> | undefined
}

export type HomeTabNavigatorParamList = {
	VenueFeedStack: NavigatorScreenParams<VenueFeedTabStackParamList>
	ExploreStack: NavigatorScreenParams<ExploreFilterTabParamList> | undefined
	TonightStack: NavigatorScreenParams<TonightTabStackParamList> | undefined
	MessagesStack: NavigatorScreenParams<MessagesTabStackParamList>
	ProfileStack: NavigatorScreenParams<ProfileTabStackParamList> | undefined
	DevelopmentStack?: NavigatorScreenParams<DevelopmentStackParamList> | undefined
}

export type DevelopmentStackParamList = {
	DevelopmentOptionsScreen: undefined
	ThemeViewer: {
		theme: Theme | undefined
	}
	NotFound: undefined
}
export type ProfileTabStackParamList = {
	UserProfileScreen: undefined
	VenueProfileScreen: undefined
	NotFound: undefined
}

export type PublicNavigatorParamList = {
	PersonalStack: NavigatorScreenParams<PersonalProfileStackParamList> | undefined
	VenueStack: NavigatorScreenParams<VenueProfileStackParamList> | undefined
}

export type PersonalProfileStackParamList = {
	PublicPersonalScreen: {
		profileId: string
	}
	NotFound: undefined
}

export type VenueProfileStackParamList = {
	PublicVenueScreen: {
		profileId: string
		distanceInM: number
		latitude: number
		longitude: number
	}
	MessagingStack: NavigatorScreenParams<MessagingStackParamList> | undefined
	NotFound: undefined
}

export type MessagesTabStackParamList = {
	MessagesScreen: undefined
}

export type TonightTabStackParamList = {
	TonightScreen: undefined
	SelectEmojimoodScreen: undefined
	NotFound: undefined
}

export type ExploreFilterTabParamList = {
	ExploreScreen: {
		searchText?: string
	}
	SearchTextScreen: {
		searchText?: string
		data?: []
	}
	SearchResultTabStack: NavigatorScreenParams<SearchResultTabStackParamList> | undefined
	PublicNavigator: NavigatorScreenParams<PublicNavigatorParamList> | undefined
	NotFound: undefined
}

export type SearchResultTabStackParamList = {
	TopScreen: {
		loading: boolean
		searchtext?: string
		data?: []
	}
	VenueScreen: {
		loading: boolean
		searchtext?: string
		data?: []
	}
	AccountScreen: {
		loading: boolean
		searchtext?: string
		data?: []
	}
	NotFound: undefined
}

export type InviteStackParamList = {
	VenueInviteModal: undefined
	NotFound: undefined
}
export type SearchAreaStackParamList = {
	SearchAreaModal: undefined
	SearchCountryTextScreen: {
		searchText?: string
	}
	SearchCountryStatesTextScreen: {
		country: string
	}
	SearchStateCitiesTextScreen: {
		country: string
		state: string
	}
	SearchAreaLocationTabStackModal:
		| NavigatorScreenParams<SearchAreaLocationStackModalParamList>
		| undefined
	NotFound: undefined
}

export type SearchAreaLocationStackModalParamList = {
	SearchCountryTextScreen: {
		searchText?: string
	}
	SearchCountryStatesTextScreen: {
		country: string
	}
	SearchStateCitiesTextScreen: {
		country: string
		state: string
	}
	NotFound: undefined
}

export type VenueFeedTabStackParamList = {
	VenueFeedScreen: undefined
	NotFound: undefined
}
export type HomeTabStackParamList = {
	VenueFeedScreen: undefined
	NotFound: undefined
}

export type ProfileOutStackParamList = {
	NotFound: undefined
}

export type LoginStackParamList = {
	AuthenticatorScreen: undefined
	ConfirmationCodeScreen: { authenticator: string; code: string }
	DeviceManagerScreen: { authenticator: string }
	PasswordLoginScreen: { profile: string }
}

export type PersonalCredentialStackParamList = {
	GetStartedScreen: undefined
	EmailPhoneTabStack: NavigatorScreenParams<EmailPhoneTabStackParamlist> | undefined
	ConfirmationCodeScreen:
		| {
				code: string
		  }
		| undefined
	BirthdayScreen: undefined
	NameScreen: undefined
	UsernameScreen: undefined
	PasswordCreateScreen: undefined
	PersonalCreationComplete: undefined
	TermsServicePrivacyTabStack:
		| NavigatorScreenParams<TermsServicePrivacyTabStackParamList>
		| undefined
}

export type VenueCredentialStackParamList = {
	TermsServicePrivacyScreen: NavigatorScreenParams<TermsServicePrivacyTabStackParamList> | undefined
	LoginScreen: undefined
	BirthdayScreen: undefined
	EmailPhoneTabStack: NavigatorScreenParams<EmailPhoneTabStackParamlist> | undefined
	ConfirmationCodeScreen: undefined
	PasswordScreen: undefined
	PhotoScreen: undefined
	EmojimoodScreen: undefined
	CongratulationsScreen: undefined
	NotFound: undefined
}

export type EmailPhoneTabStackParamlist = {
	PhoneScreen: undefined
	EmailScreen: undefined
}

export type TermsServicePrivacyTabStackParamList = {
	ServiceScreen: undefined
	TermsScreen: undefined
	PrivacyScreen: undefined
}

export type PersonalCredentialStackNavProps = CompositeNavigationProp<
	StackNavigationProp<PersonalCredentialStackParamList>,
	MaterialTopTabNavigationProp<SettingsStackParamList, 'TermsServicePrivacyTabStack'>
>

export type Error = {
	error: string
	message: string
}

export type Phone = {
	number: string
	countryCode: string
	completeNumber: string
	countryCallingCode: string
	canUseAsRecovery: boolean
}

export type Email = {
	email: string
}

export type Code = {
	email: string
}

export type AuthorizationDeviceManager = {
	id: string
	Device: Device
	createdAt?: Date
	updatedAt?: Date
	DeviceProfile: DeviceProfile
}

export type DynamicIllustrationProps = {
	width: number
	height: number
	primary?: string
	secondary?: string
	tertiary?: string
}
