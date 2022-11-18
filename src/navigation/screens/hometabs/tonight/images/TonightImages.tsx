import { MARGIN } from './Config'
import Item from './Item'
import SortableList from './SortableList'
import { useReactiveVar } from '@apollo/client'
import {
	Feather,
	FontAwesome,
	FontAwesome5,
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
} from '@expo/vector-icons'
import { AuthorizationReactiveVar } from '@reactive'
import useCloudinaryImageUploading from '@util/uploading/useCloudinaryImageUploading'
import * as ImageManipulator from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'
import { Box, Button, Heading, HStack, Icon, Skeleton, Text, VStack } from 'native-base'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// TODO: FN(this needs to be operational for user story line)
// TODO: UX(get photos in order and update order)

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
	{},
]

const TonightImages = () => {
	const window = useWindowDimensions()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const handleSelectImage = async () => {
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
						.then(res => {
							console.log('TODO: ===========>', res)
							// ===========> Object {
							// 	"access_mode": "public",
							// 	"asset_id": "71f1571bc20005e90d13992cf003e3ce",
							// 	"bytes": 11386,
							// 	"created_at": "2022-10-30T17:02:14Z",
							// 	"eager": Array [
							// 		Object {
							// 			"bytes": 29947,
							// 			"format": "jpg",
							// 			"height": 1000,
							// 			"secure_url": "https://res.cloudinary.com/ritz/image/upload/c_scale,w_1000/v1667149334/barfriends/users/plldjwri3nldpgrgmlrm.jpg",
							// 			"transformation": "c_scale,w_1000",
							// 			"url": "http://res.cloudinary.com/ritz/image/upload/c_scale,w_1000/v1667149334/barfriends/users/plldjwri3nldpgrgmlrm.jpg",
							// 			"width": 1000,
							// 		},
							// 	],
							// 	"etag": "00ea73743ec6c27509201822fbdd0345",
							// 	"folder": "barfriends/users",
							// 	"format": "jpg",
							// 	"height": 500,
							// 	"placeholder": false,
							// 	"public_id": "barfriends/users/plldjwri3nldpgrgmlrm",
							// 	"resource_type": "image",
							// 	"secure_url": "https://res.cloudinary.com/ritz/image/upload/v1667149334/barfriends/users/plldjwri3nldpgrgmlrm.jpg",
							// 	"signature": "976a7e687fea2c85742236f3c9b0d2179eb1fc40",
							// 	"tags": Array [],
							// 	"type": "upload",
							// 	"url": "http://res.cloudinary.com/ritz/image/upload/v1667149334/barfriends/users/plldjwri3nldpgrgmlrm.jpg",
							// 	"version": 1667149334,
							// 	"version_id": "4c8dee2cc09c2215ef1edba5c9ede570",
							// 	"width": 500,
							// }
						})
						.catch(err => {})
				})
				.catch(err => err)
		}
	}

	return (
		<SafeAreaView style={{ paddingHorizontal: MARGIN }}>
			{!tiles.length ? (
				<Box
					mx={2}
					h={window.width}
					borderRadius={'lg'}
					alignItems={'center'}
					justifyContent={'center'}
					_light={{
						bg: 'light.50',
					}}
					_dark={{
						bg: 'light.800',
					}}
				>
					<VStack space={2} alignItems={'center'}>
						<Icon color={'primary.600'} as={MaterialCommunityIcons} name={'sticker-plus'} size={'6xl'} />
						<Box alignItems={'center'} mx={4}>
							<Heading fontSize={'2xl'}>Start tonights Story</Heading>
							<Text fontSize={'lg'}>Ready to go out, add photos of you tonight. </Text>
						</Box>
						<Button
							mt={4}
							w={window.width / 2}
							bg={'tertiary.500'}
							rightIcon={<Icon as={MaterialIcons} name={'photo-library'} size={'lg'} />}
							_text={{
								fontSize: 'lg',
							}}
							onPress={async () => {
								const result = await ImagePicker.launchImageLibraryAsync({
									mediaTypes: ImagePicker.MediaTypeOptions.Images,
									selectionLimit: 4,
									allowsEditing: false,
									aspect: [1, 1],
									quality: 1,
									allowsMultipleSelection: true,
								})
								if (result.selected) {
									console.log(
										'TODO:',
										'🚀 ~ file: TonightImages.tsx ~ line 126 ~ onPress={ ~ result',
										result.selected,
									)
								}
								if (result.cancelled) {
									result.cancelled
									console.log(
										'TODO:',
										'🚀 ~ file: TonightImages.tsx ~ line 131 ~ onPress={ ~ result.cancelled',
										result.cancelled,
									)
								}
							}}
						>
							Select images
						</Button>
					</VStack>
				</Box>
			) : (
				<SortableList
					editing
					onDragEnd={positions => console.log('TODO:', JSON.stringify(positions, null, 2))}
				>
					{tiles.map((tile, index) => (
						<Item
							onPress={handleSelectImage}
							key={`${tile.id}-${index}`}
							id={`${tile.id}-${index}`}
							uri={tile.picture}
						/>
					))}
				</SortableList>
			)}
		</SafeAreaView>
	)
}

export default TonightImages
