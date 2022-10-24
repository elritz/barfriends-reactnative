import PersonalScreen from '@navigation/screens/hometabs/profile/PersonalProfile/PersonalProfile'
import VenueScreen from '@navigation/screens/hometabs/profile/VenueProfile/VenueProfile'
import { SafeAreaView } from 'react-native-safe-area-context'

enum ProfileType {
	USER = 'USER',
	VENUE = 'VENUE',
}

const renderProfile = (param: ProfileType) => {
	switch (param) {
		case ProfileType.USER:
			return <PersonalScreen />
		case ProfileType.VENUE:
			return <VenueScreen />
		default:
			return null
	}
}

const Profile = () => <SafeAreaView>{renderProfile(ProfileType.USER)}</SafeAreaView>

export default Profile
