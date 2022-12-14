import Actions from './components/actions/Actions'
import CurrentVenue from './components/currentvenue/CurrentVenue'
import Details from './components/details/Details'
import Photos from './components/photos'
import Relationships from './components/relationship/Relationships'
import { useProfileQuery } from '@graphql/generated'
import { RouteProp, useRoute } from '@react-navigation/native'
import { PersonalProfileStackParamList } from '@types'
import { database } from 'faker'
import { Button, HStack, ScrollView as NBScrollView, VStack } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'

export type PublicPersonalRouteProp = RouteProp<
	PersonalProfileStackParamList,
	'PublicPersonalScreen'
>

const PersonalScreen = (props: any) => {
	const route = useRoute<PublicPersonalRouteProp>()

	const {
		data: PQData,
		loading: PQLoading,
		error: PQError,
	} = useProfileQuery({
		skip: !route.params?.profileId,
		variables: {
			where: {
				id: route.params?.profileId,
			},
		},
	})

	if (PQLoading && !PQData) return null

	return (
		<NBScrollView pt={4} mx={3} showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
			<Photos story={PQData?.profile?.Story} photo={PQData?.profile?.photos} />
			<VStack space={3}>
				<Actions profile={PQData?.profile} />
				<HStack space={3} h={200}>
					{PQData?.profile?.Personal?.LiveOutPersonal?.joined.length ? <CurrentVenue /> : null}
					{PQData?.profile?.Relationship?.length ? (
						<Relationships relationship={PQData.profile?.Relationships} />
					) : null}
				</HStack>
			</VStack>
		</NBScrollView>
	)
}

export default PersonalScreen
