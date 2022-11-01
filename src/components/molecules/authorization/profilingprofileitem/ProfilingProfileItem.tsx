import { Image, Box, Text, HStack, Heading } from 'native-base'

type ProfileItemType = {
	item: any
}

const ProfilingProfileItemLarge = ({ item }: ProfileItemType) => {
	return (
		<Box key={item.id} my={2} borderRadius={'lg'}>
			<HStack>
				<Image
					source={{ uri: item.photos[0].url }}
					style={{ width: 40, height: 40, borderRadius: 4 }}
					alt={'Profile Photo'}
				/>
				<Text style={{ textTransform: 'capitalize' }}>{item.IdentifiableInformation.fullname}</Text>
				<Heading style={{ fontWeight: 'bold' }}>{item.IdentifiableInformation.username}</Heading>
			</HStack>
		</Box>
	)
}

export default ProfilingProfileItemLarge
