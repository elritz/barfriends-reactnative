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
			base64: true,
			allowsEditing: false,
			aspect: [1, 1],
			quality: 1,
		})

		console.log('🚀 ~ file: TonightImages.tsx:53 ~ handleSelectImage ~ result', result)

		// useCloudinaryImageUploading([])
	}

	return (
		<SafeAreaView style={{ paddingHorizontal: MARGIN, marginVertical: 20 }}>
			{!tiles.length ? (
				<Box
					mx={2}
					h={window.width}
					borderRadius={'md'}
					alignItems={'center'}
					justifyContent={'center'}
					_light={{
						bg: 'light.50',
					}}
					_dark={{
						bg: 'light.50',
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
