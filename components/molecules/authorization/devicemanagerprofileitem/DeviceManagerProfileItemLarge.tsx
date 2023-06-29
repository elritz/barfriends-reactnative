import { Box, HStack, Heading, Text, VStack } from '@components/core'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Profile } from '@graphql/generated'
import { Center, Icon, Image } from 'native-base'
import { ActivityIndicator } from 'react-native'

type ProfileItemType = {
	item: Profile | undefined
	isActive: boolean | undefined
	loading?: boolean
}

const DeviceManagerProfileItemLarge = ({ item, isActive, loading }: ProfileItemType) => {
	return (
		<Box
			key={item?.id}
			flex={1}
			flexDirection={'row'}
			w={'100%'}
			my={'$2'}
			py={'$3'}
			px={'$3'}
			rounded={'$md'}
			alignItems={'center'}
			justifyContent={'space-between'}
		>
			<HStack alignItems={'center'}>
				{item?.profilePhoto ? (
					<Image
						source={{ uri: item.profilePhoto.url }}
						style={{ width: 50, height: 50 }}
						borderRadius={'md'}
						alt={'Profile photo'}
					/>
				) : (
					<Box
						sx={{
							w: 40,
							h: 40,
						}}
						rounded={'$md'}
					>
						<Box
							sx={{
								h: '100%',
							}}
							justifyContent={'center'}
						>
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
				<VStack mx={'$2'}>
					<Text fontSize={'$lg'} numberOfLines={1}>
						{item?.IdentifiableInformation?.fullname}
					</Text>
					<Heading fontSize={'$sm'}>{item?.IdentifiableInformation?.username}</Heading>
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
