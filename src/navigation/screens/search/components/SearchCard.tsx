import { useNavigation } from '@react-navigation/native'
import { Box, HStack, Image, Pressable, Text, VStack } from 'native-base'

export default function SearchCard({ item }) {
	const navigation = useNavigation()

	return (
		<Pressable
			onPress={() => {
				switch (item.__typename) {
					case 'Personal':
						return navigation.navigate('HomeTabNavigator', {
							screen: 'ExploreStack',
							params: {
								screen: 'PublicNavigator',
								params: {
									screen: 'PersonalStack',
									params: {
										screen: 'PublicPersonalScreen',
										params: {
											profileId: item.Profile.id,
										},
									},
								},
							},
						})
					case 'Venue':
						return navigation.navigate('HomeTabNavigator', {
							screen: 'ExploreStack',
							params: {
								screen: 'PublicNavigator',
								params: {
									screen: 'VenueStack',
									params: {
										screen: 'PublicVenueScreen',
										params: {
											profileId: item.Profile.id,
										},
									},
								},
							},
						})
				}
			}}
		>
			<Box h={'65px'} px={3}>
				<HStack alignItems={'center'} h={'100%'}>
					<Image
						w={'45px'}
						h={'45px'}
						bg={'blue.300'}
						borderRadius={'lg'}
						source={{ uri: item.Profile.photos.url }}
						alt={'Profile picture'}
					/>

					<VStack ml={2}>
						<Text fontWeight={'bold'} lineHeight={'xs'} fontSize={'sm'}>
							{item.Profile.IdentifiableInformation.fullname}
						</Text>
						<Text lineHeight={'xs'} fontSize={'xs'}>
							{item.Profile.IdentifiableInformation.username}
						</Text>
					</VStack>
				</HStack>
			</Box>
		</Pressable>
	)
}
