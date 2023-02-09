import { useReactiveVar } from '@apollo/client'
import {
	AntDesign,
	Entypo,
	FontAwesome,
	FontAwesome5,
	Ionicons,
	MaterialIcons,
} from '@expo/vector-icons'
import { Maybe, Photo } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import * as ImagePicker from 'expo-image-picker'
import {
	Box,
	View,
	Button,
	Center,
	Heading,
	Icon,
	Text,
	useTheme,
	IconButton,
	Pressable,
	HStack,
	useColorMode,
} from 'native-base'
import 'native-base'
import { StyleSheet, useWindowDimensions } from 'react-native'

type Props = {
	photo: Maybe<Photo> | undefined
}

const size = 70

export default function ProfilePhotoEmptyState() {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const theme = useTheme()
	const colorScheme = useColorMode()
	const margin = 12

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
			aspect: [4, 3],
			quality: 1,
		})

		// console.log('PICTURE RESULTS', JSON.stringify(result.assets, null, 4))
		result.assets.map(item => {
			console.log('item.uri', item.uri)
		})
	}

	return (
		<Pressable
			onPress={pickImage}
			flex={1}
			p={4}
			w={120}
			h={120}
			_light={{
				bg: 'light.50',
			}}
			_dark={{
				bg: 'dark.50',
			}}
			borderRadius={'lg'}
		>
			<Box h={'100%'} justifyContent={'center'}>
				<Center>
					<Icon
						_light={{
							color: 'light.300',
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
						borderColor: 'light.900',
					}}
					_dark={{
						borderColor: 'dark.900',
					}}
					borderWidth={1}
					borderRadius={'full'}
					alignItems={'center'}
					justifyContent={'center'}
					position={'absolute'}
					bottom={-25}
					right={-25}
				>
					<Icon
						_light={{
							color: 'light.900',
						}}
						_dark={{
							color: 'dark.900',
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
