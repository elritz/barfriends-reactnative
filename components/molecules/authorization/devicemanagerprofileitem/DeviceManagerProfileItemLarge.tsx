import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Profile } from '@graphql/generated'
import { Box, Center, Heading, HStack, Icon, Image, Text, VStack } from 'native-base'
import { ActivityIndicator } from 'react-native'

type ProfileItemType = {
	item: Profile | undefined
	isActive: boolean | undefined
	loading?: boolean
}

const DeviceManagerProfileItemLarge = ({ item, isActive, loading }: ProfileItemType) => {
	console.log('item', JSON.stringify(item, null, 2))
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
			borderRadius={'md'}
			alignItems={'center'}
			justifyContent={'space-between'}
		>
			<HStack alignItems={'center'}>
				{item?.profilePhoto ? (
					<Image
						source={{ uri: item.profilePhoto.url }}
						style={{ width: 40, height: 40 }}
						minW={40}
						minH={40}
						borderRadius={'md'}
						alt={'Profile photo'}
					/>
				) : (
					<Box
						w={'40px'}
						h={'40px'}
						_light={{
							bg: 'light.100',
						}}
						_dark={{
							bg: 'dark.50',
						}}
						borderRadius={'md'}
					>
						<Box h={'100%'} justifyContent={'center'}>
							<Center>
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
							</Center>
						</Box>
					</Box>
				)}
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
