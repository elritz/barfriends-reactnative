import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Profile } from '@graphql/generated'
import { Box, Heading, HStack, Icon, IconButton, Image, Pressable, Text, VStack } from 'native-base'
import { ActivityIndicator } from 'react-native'

type ProfileItemType = {
	item: Profile
	isActive: boolean
	loading?: boolean
	selectedProfileId?: string
}

const DeviceManagerProfileItemLarge = ({
	item,
	isActive,
	loading,
	selectedProfileId,
}: ProfileItemType) => {
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
			p={2}
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
					<Heading style={{ textTransform: 'capitalize' }}>
						{item?.IdentifiableInformation?.fullname}
					</Heading>
					<Text ml={0.5} style={{ fontWeight: 'bold' }}>
						{item?.IdentifiableInformation?.username}
					</Text>
				</VStack>
			</HStack>
			<IconButton
				icon={
					!loading ? (
						<>
							{isActive ? (
								<Icon name='ios-checkmark-circle' as={Ionicons} color={'success.600'} size={'xl'} />
							) : (
								<Icon name='radio-button-unchecked' as={MaterialIcons} color={'gray.400'} size={'xl'} />
							)}
						</>
					) : (
						<ActivityIndicator />
					)
				}
			/>
		</Box>
	)
}

export default DeviceManagerProfileItemLarge
