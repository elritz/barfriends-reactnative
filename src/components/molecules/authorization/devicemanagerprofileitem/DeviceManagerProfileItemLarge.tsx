import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Profile } from '@graphql/generated'
import { Box, Heading, HStack, Icon, IconButton, Image, Text } from 'native-base'
import { useContext } from 'react'
import { ActivityIndicator } from 'react-native'
import { ThemeContext } from 'styled-components/native'

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
	const themeContext = useContext(ThemeContext)

	return (
		<Box key={item.id} my={2} borderRadius={'lg'}>
			<Image
				source={{ uri: item?.photos[0]?.url }}
				style={{ width: 40, height: 40, borderRadius: 4 }}
				alt={'Profile photo'}
			/>
			<HStack>
				<Heading style={{ textTransform: 'capitalize' }}>
					{item?.IdentifiableInformation?.fullname}
				</Heading>
				<Text style={{ fontWeight: 'bold' }}>{item?.IdentifiableInformation?.username}</Text>
			</HStack>
			<IconButton
				icon={
					!loading ? (
						<>
							{isActive ? (
								<Icon name='ios-checkmark-circle' as={Ionicons} colorScheme={'primary'} size={'xl'} />
							) : (
								<Icon name='radio-button-unchecked' as={MaterialIcons} colorScheme={'gray'} size={'xl'} />
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
