import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { Box, Center, Icon, Pressable } from 'native-base'

export default function ProfilePhotoEmptyState() {
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
			aspect: [4, 3],
			quality: 1,
		})

		if (result.assets) {
			result.assets.map(item => {})
		}
	}

	return (
		<Pressable
			onPress={pickImage}
			flex={1}
			p={4}
			w={120}
			h={120}
			_light={{
				bg: 'light.300',
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
							color: 'light.50',
						}}
						_dark={{
							color: 'dark.300',
						}}
						as={Ionicons}
						size={'4xl'}
						name={'ios-person'}
					/>
				</Center>
				<Box
					_light={{
						borderColor: 'light.700',
					}}
					_dark={{
						borderColor: 'dark.700',
					}}
					borderWidth={2}
					borderRadius={'full'}
					alignItems={'center'}
					justifyContent={'center'}
					position={'absolute'}
					bottom={-25}
					right={-25}
				>
					<Icon
						_light={{
							color: 'light.700',
						}}
						_dark={{
							color: 'dark.700',
						}}
						borderWidth={1}
						borderRadius={'full'}
						as={Ionicons}
						name={'ios-arrow-up-circle'}
						size={'2xl'}
						zIndex={10}
					/>
				</Box>
			</Box>
		</Pressable>
	)
}
