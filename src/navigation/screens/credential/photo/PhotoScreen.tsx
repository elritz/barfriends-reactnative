import { useReactiveVar } from '@apollo/client'
import { Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar, PermissionMediaReactiveVar } from '@reactive'
import useCloudinaryImageUploading from '@util/uploading/useCloudinaryImageUploading'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import {
	Box,
	Button,
	Center,
	HStack,
	Icon,
	IconButton,
	Skeleton,
	Text,
	VStack,
	Image,
} from 'native-base'
import React, { useContext, useEffect, useState, memo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import {
	AppState,
	FlatList,
	Pressable,
	SafeAreaView,
	useWindowDimensions,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg'
import { ThemeContext } from 'styled-components/native'

const UserFemaleIllustration = require('@assets/images/illustration/user_female_illustration.png')

// TODO: FN()

const PhotoScreen = () => {
	const appStateRef = useRef(AppState.currentState)
	const insets = useSafeAreaInsets()
	const navigation = useNavigation()
	const window = useWindowDimensions()
	const themeContext = useContext(ThemeContext)
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const rPermissionMediaReactiveVar = useReactiveVar(PermissionMediaReactiveVar)
	const [status] = MediaLibrary.usePermissions()
	const [mediaLoading, setMediaLoading] = useState(false)
	const [imageUploading, setImageUploading] = useState(false)
	const [numberOfPhotos] = useState(100)
	const [photoLibrary, setPhotoLibrary] = useState([])
	const [lastPhotoID, setLastPhotoID] = useState<string>('')
	const [hasNextPage, setHasNextPage] = useState<boolean>(true)

	const loadingSkelWidth = window.width / 2.15
	const loadingSkelHeight = window.width - 20

	const {
		control,
		handleSubmit,
		setValue,
		watch,
		getValues,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			photo: {
				id: '',
				uri: '',
				url: '',
			},
		},
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const watchValues = watch()

	const loadMediaAsync = async () => {
		setMediaLoading(true)
		const assets = await MediaLibrary.getAssetsAsync({
			first: numberOfPhotos,
			mediaType: 'photo',
		})
		const id = assets.endCursor
		setLastPhotoID(id)
		setHasNextPage(assets.hasNextPage)
		setPhotoLibrary(assets.assets)
		setMediaLoading(false)
	}

	const _pickMediaPicker = async () => {
		if (!rPermissionMediaReactiveVar.granted) {
			navigation.navigate('PermissionNavigator', {
				screen: 'MediaLibraryPermissionScreen',
			})
		} else {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: false,
				aspect: [4, 3],
				quality: 1,
			})
			if (!result.cancelled) {
				setValue('photo', { id: '', uri: result.uri, url: '' })
			}
		}
	}

	const onSubmit = async data => {
		setImageUploading(true)
		const { secure_url } = await useCloudinaryImageUploading(data.photo.uri)
		if (secure_url) {
			CredentialPersonalProfileReactiveVar({
				...credentialPersonalProfileVar,
				photo: {
					...data.photo,
					url: secure_url,
				},
			})
			setImageUploading(false)
			navigation.navigate('CredentialNavigator', {
				screen: 'PersonalCredentialStack',
				params: {
					screen: 'EmojimoodScreen',
				},
			})
		}
	}

	const _loadMoreMedia = async () => {
		if (!mediaLoading) {
			setMediaLoading(true)
		}

		const assets = await MediaLibrary.getAssetsAsync({
			first: numberOfPhotos,
			after: lastPhotoID,
		})

		const id = assets.endCursor

		setLastPhotoID(id)
		setHasNextPage(assets.hasNextPage)
		setPhotoLibrary([...photoLibrary, ...assets.assets])
		setMediaLoading(false)
	}

	useEffect(() => {
		const subscription = AppState.addEventListener('change', handleAppStateChange)
		return () => {
			subscription.remove()
		}
	}, [])

	const handleAppStateChange = async (nextAppState: any) => {
		if (/inactive|background/.exec(appStateRef.current) && nextAppState === 'active') {
			const mediapermission = await MediaLibrary.getPermissionsAsync()
			PermissionMediaReactiveVar(mediapermission)

			if (mediapermission.granted && mediapermission.status === 'granted') {
			}
		}
		appStateRef.current = nextAppState
	}

	useEffect(() => {
		if (rPermissionMediaReactiveVar.granted) {
			if (!photoLibrary.length) {
				loadMediaAsync()
			}
		} else {
			navigation.navigate('PermissionNavigator', {
				screen: 'MediaLibraryPermissionScreen',
			})
		}
	}, [rPermissionMediaReactiveVar, mediaLoading])

	if (!photoLibrary.length) {
		return (
			<Box>
				<VStack alignItems={'center'}>
					<Image
						style={{
							height: window.width / 1.55,
							width: window.width / 1.75,
							margin: 10,
							borderRadius: 20,
						}}
						alt={'loading image'}
						source={watchValues?.photo?.uri ? { uri: watchValues.photo.uri } : UserFemaleIllustration}
					/>
					<Box
						mb={2}
						mx={2}
						_dark={{ backgroundColor: 'dark.100' }}
						_light={{ backgroundColor: 'light.100' }}
						borderRadius={'lg'}
						p={5}
					>
						<VStack my={2} alignItems={'center'}>
							<Text px={2}>
								Continue with your profile setup, use your own photos to share and create the style that
								reflect you the best.
							</Text>
							<Button
								variant='solid'
								onPress={async () =>
									navigation.navigate('PermissionNavigator', {
										screen: 'MediaLibraryPermissionScreen',
									})
								}
								mt={15}
								w={'85%'}
								_text={{
									fontSize: 'lg',
									fontWeight: 'bold',
								}}
							>
								Continue
							</Button>
						</VStack>
					</Box>
					{[...Array(6)].map((item, index) => {
						return (
							<HStack key={index} space={0} overflow='hidden'>
								{[...Array(3)].map((item, index) => {
									return (
										<Skeleton
											m={0.27}
											key={index}
											startColor='secondary.900'
											endColor={'secondary.800'}
											h={window.width / 3}
											w={window.width / 3}
										/>
									)
								})}
							</HStack>
						)
					})}
				</VStack>
			</Box>
		)
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Center>
				<Svg
					style={{
						position: 'absolute',
					}}
					width={window.width}
					height='100%'
				>
					<Defs>
						<LinearGradient id='grad' x1='1' y1='0' x2='1' y2='1'>
							<Stop
								offset='0.25'
								stopColor={themeContext.palette.primary.background.default}
								stopOpacity='1'
							/>
							<Stop
								offset='1'
								stopColor={themeContext.palette.primary.background.default}
								stopOpacity='1'
							/>
						</LinearGradient>
					</Defs>
					<Rect height='100%' width={window.width} fill='url(#grad)' />
				</Svg>
				<Image
					style={{
						height: window.width / 1.55,
						width: window.width / 1.75,
						margin: 10,
						borderRadius: 20,
					}}
					alt={'loading image'}
					source={watchValues?.photo?.uri ? { uri: watchValues.photo.uri } : UserFemaleIllustration}
				/>
			</Center>
			<FlatList
				style={{
					width: '100%',
					height: '100%',
				}}
				keyExtractor={item => item.id}
				onEndReachedThreshold={0.4}
				onEndReached={_loadMoreMedia}
				numColumns={3}
				data={photoLibrary}
				scrollEnabled={!imageUploading}
				renderItem={({ item }: any) => {
					return (
						<Pressable
							onPress={() => {
								!imageUploading && setValue('photo.uri', item.uri)
							}}
						>
							<Image
								style={{
									height: window.width / 3,
									width: window.width / 3,
									justifyContent: 'center',
									// borderWidth: 3,
									// borderRadius: 5,
								}}
								alt={'Image'}
								// _light={{
								// 	borderColor: watchValues?.photo?.uri === item.uri ? 'black' : 'light.300',
								// }}
								// _dark={{
								// 	borderColor: watchValues?.photo?.uri === item.uri ? 'white' : 'black.300',
								// }}
								source={{ uri: item.uri }}
							/>
							{watchValues?.photo?.uri === item.uri && (
								<Icon
									as={Ionicons}
									name='checkmark-circle'
									size={'3xl'}
									color={'success.500'}
									position='absolute'
									bottom={1}
									right={1}
								/>
							)}
						</Pressable>
					)
				}}
			/>
			<View
				style={{
					position: 'absolute',
					bottom: 0,
					backgroundColor: themeContext.palette.primary.background.default,
					flexDirection: 'row',
					width: '100%',
					height: 90,
					paddingTop: 10,
					justifyContent: 'space-around',
					alignItems: 'center',
					paddingBottom: insets.bottom,
				}}
			>
				<IconButton
					w={'40%'}
					mx={'10%'}
					onPress={_pickMediaPicker}
					variant={'ghost'}
					isDisabled={imageUploading}
					icon={
						<Icon
							as={MaterialIcons}
							name='photo-library'
							size={29}
							color={themeContext.palette.primary.color.default}
						/>
					}
				/>
				<Button
					w={'40%'}
					mx={'10%'}
					onPress={handleSubmit(onSubmit)}
					variant={'ghost'}
					isLoading={imageUploading}
					endIcon={<Icon name='arrow-right' size={29} as={Feather} />}
				>
					<Text color={'primary.500'} fontSize={'xl'}>
						Continue
					</Text>
				</Button>
			</View>
		</SafeAreaView>
	)
}

export default PhotoScreen
