import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Profile } from '@graphql/generated'
import { Box, Heading, HStack, Icon, IconButton, Image, Text, VStack } from 'native-base'
import { ActivityIndicator } from 'react-native'

type ProfileItemType = {
	item: Profile
	isActive: boolean
	loading?: boolean
}

const DeviceManagerProfileItemLarge = ({ item, isActive, loading }: ProfileItemType) => {
	return (
		<Box
			_light={{
				bg: 'light.100',
			}}
			_dark={{
				bg: 'dark.200',
			}}
			key={item.id}
			flex={1}
			flexDir={'row'}
			my={2}
			py={3}
			px={3}
			borderRadius={'lg'}
			alignItems={'center'}
			justifyContent={'space-between'}
		>
			<HStack alignItems={'center'}>
				<Image
					source={{ uri: item?.photos[0]?.url }}
					style={{ width: 40, height: 40 }}
					borderRadius={'lg'}
					alt={'Profile photo'}
				/>
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
						<Icon name='ios-checkmark-circle' as={Ionicons} color={'success.600'} size={'xl'} />
					) : (
						<Icon name='radio-button-unchecked' as={MaterialIcons} color={'gray.400'} size={'xl'} />
					)}
				</>
			) : (
				<ActivityIndicator />
			)}
		</Box>
	)
}

export default DeviceManagerProfileItemLarge
