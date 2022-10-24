import { makeVar } from '@apollo/client'

export type CredentialPersoanl = {
	PrivacyId: string
	ServiceId: string
	email: string
	birthday: string
	password: string
	username: string
	name: string
	phone: {
		number: string
		completeNumber: string
		countryCallingCode: string
		countryCode: string
	}
	photo: {
		id: string
		uri: string
		url: string
	}
	emojimood: {
		id: string
		name: string
		emoji: string
		colors: string[]
	}
}


export const CredentialPersonalProfileReactiveVar = makeVar<CredentialPersoanl>({
	PrivacyId: '',
	ServiceId: '',
	birthday: '',
	email: '',
	name: '',
	password: '',
	username: '',
	photo: {
		url: '',
		id: '',
		uri: '',
	},
	phone: {
		number: '',
		completeNumber: '',
		countryCallingCode: '',
		countryCode: '',
	},
	emojimood: {
		id: '',
		name: '',
		emoji: '',
		colors: [],
	},
})
