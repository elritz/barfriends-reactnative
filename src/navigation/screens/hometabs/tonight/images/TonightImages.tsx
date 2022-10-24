import { MARGIN } from './Config'
import Item from './Item'
import SortableList from './SortableList'
import useCloudinaryImageUploading from '@util/uploading/useCloudinaryImageUploading'
import * as ImageManipulator from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

// TODO: FN(this needs to be operational for user story line)

const tiles = [
	{
		id: 'reanimated',
		picture: 'https://picsum.photos/id/1/300/300',
	},
	{
		id: 'github',
		picture: 'https://picsum.photos/id/2/300/300',
	},
	{
		id: 'rnnavigation',
		picture: 'https://picsum.photos/id/3/300/300',
	},
	{
		id: 'youtube',
		picture: 'https://picsum.photos/id/4/300/300',
	},
]

const TonightImages = () => {
	const [image, setImage] = React.useState(null)

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: false,
			aspect: [1, 1],
			quality: 1,
		})
		if (!result.cancelled) {
			const { base64 } = await ImageManipulator.manipulateAsync(
				result.uri,
				[{ resize: { width: 300, height: 300 } }],
				{ compress: 0.6, base64: true },
			)

			const CloudinaryURL = 'https://api.cloudinary.com/v1_1/ritz/image/upload'
			const base64Img = `data:image/jpg;base64,${base64}`
			const data = { file: base64Img, upload_preset: 'barfriends' }

			await fetch(CloudinaryURL, {
				body: JSON.stringify(data),
				headers: {
					'content-type': 'application/json',
				},
				method: 'POST',
			})
				.then(async r => {
					const data = await r
						.json()
						.then(res => {})
						.catch(err => {})
				})
				.catch(err => err)
		}
	}

	return (
		<SafeAreaView style={{ paddingHorizontal: MARGIN }}>
			<SortableList editing onDragEnd={positions => console.log(JSON.stringify(positions, null, 2))}>
				{[...tiles].map((tile, index) => (
					<Item
						onPress={pickImage}
						key={`${tile.id}-${index}`}
						id={`${tile.id}-${index}`}
						uri={tile.picture}
					/>
				))}
			</SortableList>
		</SafeAreaView>
	)
}

export default TonightImages
