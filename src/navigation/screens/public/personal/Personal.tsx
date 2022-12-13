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
		<SafeAreaView style={{ flex: 1 }}>
			<NBScrollView mx={3} showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
				<Photos story={PQData?.profile?.Story} photo={PQData?.profile?.photos} />
				<VStack space={3}>
					<Actions data={PQData?.profile} />
					<HStack space={3} h={200}>
						{PQData?.profile?.Personal?.LiveOutPersonal?.joined.length ? <CurrentVenue /> : null}
						{PQData?.profile?.Relationships.length ? (
							<Relationships data={PQData.profile?.Relationships} />
						) : null}
					</HStack>
				</VStack>
			</NBScrollView>
		</SafeAreaView>
	)
}

export default PersonalScreen
