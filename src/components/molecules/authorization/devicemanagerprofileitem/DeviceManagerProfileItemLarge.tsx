import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Profile } from '@graphql/generated'
import { Box, Heading, HStack, Icon, Image, Text, VStack } from 'native-base'
import { ActivityIndicator } from 'react-native'

type ProfileItemType = {
	item: Profile | undefined
	isActive: boolean | undefined
	loading?: boolean
}

const DeviceManagerProfileItemLarge = ({ item, isActive, loading }: ProfileItemType) => {
	console.log(
		'🚀 ---------------------------------------------------------------------------------------------------🚀',
	)
	console.log(
		'🚀 ~ file: DeviceManagerProfileItemLarge.tsx:59 ~ DeviceManagerProfileItemLarge ~ isActive',
		isActive,
	)
	console.log(
		'🚀 ---------------------------------------------------------------------------------------------------🚀',
	)

	return (
		<Box
			_light={{
				bg: 'light.200',
			}}
			_dark={{
				bg: 'dark.200',
			}}
			key={item?.id}
			flex={1}
			flexDir={'row'}
			my={2}
			w={'100%'}
			py={3}
			px={3}
			borderRadius={'lg'}
			alignItems={'center'}
			justifyContent={'space-between'}
		>
			<HStack alignItems={'center'}>
				<Image
					source={{ uri: item?.photos?.url }}
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
