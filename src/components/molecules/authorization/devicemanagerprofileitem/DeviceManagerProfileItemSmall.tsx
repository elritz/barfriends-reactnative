import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Text, Icon, Image, Box, HStack, IconButton, VStack, Heading } from 'native-base'
import { ActivityIndicator } from 'react-native'

type ProfileItemType = {
	item: any
	loading?: boolean
	selectedProfileId?: string
	isActive: boolean
}

const ProfileItemSmall = ({ item, loading, isActive, selectedProfileId }: ProfileItemType) => {
	return (
		<Box key={item.id} my={2} p={2} px={3} borderRadius={'lg'}>
			<Image
				alt={'Profile photo'}
				source={{ uri: item.Profile.photos[0].url }}
				style={{ width: 40, height: 40, borderRadius: 4 }}
			/>
			<HStack style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
				<VStack mx={2}>
					<Text fontSize={'lg'} numberOfLines={1} isTruncated>
						{item?.IdentifiableInformation?.fullname}
					</Text>
					<Heading fontSize={'sm'} isTruncated>
						{item?.IdentifiableInformation?.username}
					</Heading>
				</VStack>
			</HStack>
			{!loading ? (
				<>
					{isActive ? (
						<Icon name='ios-checkmark-circle' as={Ionicons} colorScheme={'primary'} size={'xl'} />
					) : (
						<Icon name='radio-button-unchecked' as={MaterialIcons} colorScheme={'danger'} size={'xl'} />
					)}
				</>
			) : (
				<ActivityIndicator />
			)}
		</Box>
	)
}

export default ProfileItemSmall
