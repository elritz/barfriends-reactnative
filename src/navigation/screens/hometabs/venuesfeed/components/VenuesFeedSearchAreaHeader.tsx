import { useReactiveVar } from '@apollo/client'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { SearchAreaReactiveVar } from '@reactive'
import { VStack, Heading, HStack, Icon, IconButton, Box, View, Pressable } from 'native-base'

export default function VenuesFeedSearchAreaHeader() {
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const navigation = useNavigation()

	if (!rSearchAreaVar?.city) return null

	return (
		<VStack alignItems={'flex-start'} mx={2} mb={3}>
			<Pressable
				onPress={() => {
					navigation.navigate('ModalNavigator', {
						screen: 'SearchAreaModalStack',
					})
				}}
			>
				<Heading lineHeight={'xs'} fontSize={'md'} fontWeight={'bold'}>
					Nearby
				</Heading>

				<HStack alignItems={'flex-start'} space={1} mb={1}>
					<Heading mt={'-5px'} lineHeight={'xs'} size={'2xl'} fontWeight={'black'} numberOfLines={1}>
						{rSearchAreaVar?.city}
					</Heading>
					{rSearchAreaVar?.useCurrentLocation && (
						<View
							_light={{
								bg: rSearchAreaVar?.useCurrentLocation ? 'blue.600' : 'light.200',
							}}
							_dark={{
								bg: rSearchAreaVar?.useCurrentLocation ? 'blue.600' : 'light.500',
							}}
							p={2}
							rounded={'full'}
						>
							<Icon
								size={'xs'}
								as={FontAwesome5}
								name={'location-arrow'}
								_light={{
									color: rSearchAreaVar?.useCurrentLocation ? 'white' : 'blue.400',
								}}
								_dark={{
									color: rSearchAreaVar?.useCurrentLocation ? 'white' : 'blue.400',
								}}
							/>
						</View>
					)}
				</HStack>
			</Pressable>
		</VStack>
	)
}
