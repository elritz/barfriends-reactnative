import RNEText1000 from '@components/atoms/typography/RNETypography/text/RNEText1000'
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants'
import * as MediaLibrary from 'expo-media-library'
import * as Permissions from 'expo-permissions'
import { useEffect, useState } from 'react'
import { View, FlatList, Pressable, Image } from 'react-native'

interface MediaLibraryProps {}

export const MediaLibraryModal: React.FC<MediaLibraryProps> = ({}) => {
	const navigation = useNavigation()
	const [disabled, setDisabled] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [selectedPhoto, setSelectedPhoto] = useState([])
	const [numberOfPhotos, setNumberOfPhotos] = useState(100)
	const [lastPhotoID, setLastPhotoID] = useState('')
	const [photos, setPhotos] = useState()
	const [showPhotos, setShowPhotos] = useState(false)
	const [status, requestPermission] = MediaLibrary.usePermissions()

	if (!status) return null

	const _getPhotosAsync = async () => {
		const photos = await MediaLibrary.getAssetsAsync({ first: numberOfPhotos, hasNextPage: true })
		const { id } = photos.assets[photos.assets.length - 1]
		setLastPhotoID(id)
		setPhotos(photos.assets)
	}

	const _pressedImageCameraRollItem = item => {
		if (item.uri === selectedPhoto) {
			setSelectedPhoto([])
		} else {
			setSelectedPhoto(item.uri)
		}
	}

	const handleLoadMore = async () => {
		const GetNewPhotos = await MediaLibrary.getAssetsAsync({
			first: numberOfPhotos,
			last: lastPhotoID,
			after: lastPhotoID,
			endCursor: lastPhotoID,
			hasNextPage: true,
		})
		const { id } = GetNewPhotos.assets[GetNewPhotos.assets.length - 1]
		const newPhotos = [...photos, ...GetNewPhotos.assets]
		setLastPhotoID(id)
		setPhotos(newPhotos)
	}

	return (
		<View>
			<RNEText1000 style={{ fontWeight: '800', textTransform: 'uppercase' }}>
				Show Media Library
			</RNEText1000>
			<RNEText1000 style={{ fontWeight: '800' }}>Take Photo Options</RNEText1000>
			<FlatList
				style={{ flex: 1 }}
				data={photos}
				numColumns={3}
				renderItem={({ item }) => (
					<Pressable onPress={() => _pressedImageCameraRollItem(item)}>
						<Image
							style={{
								width: 50,
								height: 50,
							}}
							source={{ uri: item.uri }}
						/>
					</Pressable>
				)}
				keyExtractor={item => item.id}
				onEndReachedThreshold={0.4}
				onEndReached={() => handleLoadMore()}
			/>
		</View>
	)
}
