import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { Box, HStack, Icon, Pressable, Text, VStack } from 'native-base'

export default function SearchCard({ item }) {


	const router = useRouter()

	if (!item?.Profile) {
		return null
	}

	return (
		<Pressable
			key={item.id}
			onPress={() => {
				switch (item.__typename) {
					case 'Personal':
						return router.push({
							pathname: `(app)/public/personal/${item.Profile.id}`,
						})
					case 'Venue':
						return router.push({
							pathname: `(app)/public/venue/${item.Profile.id}`,
						})
				}
			}}
		>
			<Box h={'65px'} px={3}>
				<HStack alignItems={'center'} h={'100%'}>
					{item.Profile?.photos[0]?.url ? (
						<Image
							style={{
								height: 45,
								width: 45,
								borderRadius: 15,
							}}
							placeholder={item.Profile?.photos[0]?.blurhash}
							source={{ uri: item.Profile?.photos[0]?.url }}
						/>
					) : (
						<Box
							_light={{
								bg: 'light.100',
							}}
							_dark={{
								bg: 'dark.100',
							}}
							h={45}
							w={45}
							alignItems={'center'}
							justifyContent={'center'}
							borderRadius={'md'}
						>
							<Icon
								_light={{
									color: 'light.300',
								}}
								_dark={{
									color: 'dark.300',
								}}
								as={Ionicons}
								size={'lg'}
								name={'ios-person'}
							/>
						</Box>
					)}
					<VStack ml={2}>
						<Text fontWeight={'bold'} lineHeight={'xs'} fontSize={'md'}>
							{item.Profile?.IdentifiableInformation.fullname}
						</Text>
						<Text lineHeight={'xs'} fontSize={'sm'}>
							{item.Profile?.IdentifiableInformation.username}
						</Text>
					</VStack>
				</HStack>
			</Box>
		</Pressable>
	)
}
