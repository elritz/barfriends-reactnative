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
		<Box
			key={item.id}
			style={{ padding: 4, paddingHorizontal: 5, marginVertical: 2, borderRadius: 10 }}
		>
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

export default ProfileItemSmall
