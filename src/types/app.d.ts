import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { BottomSheetModalRef } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModalProvider/types'
import { Personal, Profile, Theme, Venue } from '@graphql/generated'
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs'
import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

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
	SettingsNavigator: NavigatorScreenParams<SettingsNavigatorParamList> | undefined
	ProfileEditorNavigator: NavigatorScreenParams<ProfileEditorNavigatorParamList> | undefined
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
	DeviceManagerModal: undefined
	MediaLibraryModal: undefined
	SearchAreaModalStack: NavigatorScreenParams<SearchAreaStackParamList> | undefined
	NotFound: undefined
}

export type ProfileEditorNavigatorParamList = {
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

export type SettingsNavigatorParamList = {
	TermsServicePrivacyTabStack: NavigatorScreenParams<TermsServicePrivacyTabStackParamList>
}

export type PermissionNavigatorParamList = {
	CameraPermissionScreen: undefined
	NetworkInformationScreen: undefined
	ForegroundLocationPermissionScreen: undefined
	BackgroundLocationPermissionScreen: undefined
	MediaLibraryPermissionScreen: undefined
	ForegroundLocationPermissionSearchAreaScreen: undefined
	NotificationsPermissionScreen: undefined
	NotFound: undefined
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
	}
	SearchResultTabStack: NavigatorScreenParams<SearchResultTabStackParamList> | undefined
	NotFound: undefined
}

export type SearchResultTabStackParamList = {
	TopScreen: {
		searchText?: string
	}
	VenueScreen: {
		searchText?: string
	}
	UserScreen: {
		searchText?: string
	}
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
	GetStartedScreen: { nextScreen: NavigatorScreenParams<RootNavigatorParamList> | undefined }
	EmailPhoneTabStack: NavigatorScreenParams<EmailPhoneTabStackParamlist> | undefined
	ConfirmationCodeScreen: {
		code: string
		nextScreen?: NavigatorScreenParams<RootNavigatorParamList> | undefined
	}
	BirthdayScreen: { nextScreen: NavigatorScreenParams<RootNavigatorParamList> | undefined }
	NameScreen: { nextScreen: NavigatorScreenParams<RootNavigatorParamList> | undefined }
	UsernameScreen: { nextScreen: NavigatorScreenParams<RootNavigatorParamList> | undefined }
	PasswordCreateScreen: { nextScreen: NavigatorScreenParams<RootNavigatorParamList> | undefined }
	PhotoScreen: { nextScreen: NavigatorScreenParams<RootNavigatorParamList> | undefined }
	EmojimoodScreen: { nextScreen: NavigatorScreenParams<RootNavigatorParamList> | undefined }
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
	PhoneScreen: { nextScreen: NavigatorScreenParams<RootNavigatorParamList> | undefined }
	EmailScreen: { nextScreen: NavigatorScreenParams<RootNavigatorParamList> | undefined }
}

export type TermsServicePrivacyTabStackParamList = {
	ServiceScreen: { nextScreen: NavigatorScreenParams<RootNavigatorParamList> | undefined }
	TermsScreen: { nextScreen: NavigatorScreenParams<RootNavigatorParamList> | undefined }
	PrivacyScreen: { nextScreen: NavigatorScreenParams<RootNavigatorParamList> | undefined }
}

export type PersonalCredentialStackNavProps = CompositeNavigationProp<
	StackNavigationProp<PersonalCredentialStackParamList>,
	MaterialTopTabNavigationProp<SettingsStackParamList, 'TermsServicePrivacyTabStack'>
>

/**
 * ? NavigatorType
 * Are the navigators for the entire application
 * Only able to render one of these at a time
 * AppContext is how to switch between navigators
 *
 * * CLIENT ONLY
 */

/**
 * ? ProfileType
 * Is the shape of Profiles saved in SecureStorage on the client
 *
 * * CLIENT ONLY
 *
 * ? AuthorizedCredentialType
 * The client is able to store multiple Profiles
 *
 * * CLIENT ONLY
 *
 */

export type Error = {
	error: string
	message: string
}

export type MeType = {
	activeProfile?: Maybe<ProfileTokenType> | undefined
	profile?: Maybe<Profile> | undefined
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

export type ProfileType = {
	isActive?: boolean | undefined
	profileType?: string | number | undefined
	username?: string | undefined
	authorizationToken?: string | undefined
	refreshToken?: string | undefined
}

export type ProfileTokenType = {
	isActive?: boolean | undefined
	profileType?: string | number | undefined
	username?: string | undefined
	authorizationToken?: string | undefined
	refreshToken?: string | undefined
}

export type MeTokenType = {
	active: boolean | undefined
	me: Personal | Venue
	authorization?: string | undefined
	refreshToken?: string | undefined
}

export type ProfileListRenderType = {
	index: number
	item: Personal | Venue
}

export type ItemRenderType<T> = {
	onPress?: (item: T) => void
	loading?: boolean
	item: T
	index: number
}

export type AuthorizedCredentialType = {
	profiles: ProfileType[]
}

export type Maybe<T> = T | null

export interface UpdateActiveProfilesProp {
	values: ProfileType
}
export interface CheckProfileIdProp {
	username: string
}

export interface AddSetActiveProfileProp {
	username?: string | null
}

export type ReturnProfileAuthentication = {
	success: boolean
}

export type ReturnActiveProfile = {
	error: Maybe<string>
	data: Maybe<ProfileType>
}

export interface AuthorizationToken {
	profiles: Maybe<ProfileType[]>
}

export type ReturnParseTokenAuthorization = {
	error: Maybe<string>
	data: Maybe<AuthorizationToken>
	activeprofile: Maybe<ProfileType> | undefined
}

interface IFinishedCallback {
	(): void
}
