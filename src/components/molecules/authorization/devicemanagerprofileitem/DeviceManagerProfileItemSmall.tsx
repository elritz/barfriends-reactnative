import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Text, Icon, Image, Box, HStack, Checkbox, IconButton } from 'native-base'
import { useContext } from 'react'
import { ActivityIndicator } from 'react-native'
import { ThemeContext } from 'styled-components/native'

type ProfileItemType = {
	item: any
	loading?: boolean
	selectedProfileId?: string
	isActive: boolean
}

const ProfileItemSmall = ({ item, loading, isActive, selectedProfileId }: ProfileItemType) => {
	const themeContext = useContext(ThemeContext)

	return (
		<Box key={item.id} my={2} p={2} px={3} borderRadius={'lg'}>
			<Image
				alt={'Profile photo'}
				source={{ uri: item.Profile.photos[0].url }}
				style={{ width: 40, height: 40, borderRadius: 4 }}
			/>
			<HStack style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
				{item.Profile.IdentifiableInformation.fullname && (
					<Text style={{ textTransform: 'capitalize' }}>
						{item.Profile.IdentifiableInformation.fullname}
					</Text>
				)}
				{item.Profile.IdentifiableInformation.username && (
					<Text style={{ fontWeight: 'bold' }}>{item.Profile.IdentifiableInformation.username}</Text>
				)}
			</HStack>
			<IconButton
				icon={
					!loading ? (
						<>
							{isActive ? (
								<Icon name='ios-checkmark-circle' as={Ionicons} colorScheme={'primary'} size={'xl'} />
							) : (
								<Icon name='radio-button-unchecked' as={MaterialIcons} colorScheme={'danger'} size={'xl'} />
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

export default ProfileItemSmall
