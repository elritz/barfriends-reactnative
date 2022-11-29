import PreferenceNotificationPermission from '@components/molecules/preferences/preferencenotificationpermission/PreferenceNotificationPermission'
import PersonalScreen from '@navigation/screens/hometabs/profile/PersonalProfile/PersonalProfile'
import VenueScreen from '@navigation/screens/hometabs/profile/VenueProfile/VenueProfile'
import { uniqueId } from 'lodash'
import { AnimatePresence } from 'moti'
import { ScrollView } from 'native-base'

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

const Profile = () => (
	<ScrollView
		contentInset={{ top: 0, left: 0, bottom: 90, right: 0 }}
		showsVerticalScrollIndicator={false}
		scrollEventThrottle={16}
	>
		<AnimatePresence key={uniqueId()}>
			<PreferenceNotificationPermission />
		</AnimatePresence>
		{renderProfile(ProfileType.USER)}
	</ScrollView>
)

export default Profile
