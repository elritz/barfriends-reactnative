import { useReactiveVar } from '@apollo/client'
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar } from '@reactive'
import { Image } from '@rneui/themed'
import useCloudinaryImageUploading from '@util/uploading/useCloudinaryImageUploading'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { Box, Button, Center, HStack, Icon, IconButton, Skeleton, Text, VStack } from 'native-base'
import React, { useContext, useEffect, useState, memo } from 'react'
import { useForm } from 'react-hook-form'
import { FlatList, Pressable, SafeAreaView, useWindowDimensions, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg'
import { ThemeContext } from 'styled-components/native'

const UserFemaleIllustration = require('@assets/images/illustration/user_female_illustration.png')

// TODO: FN()

const PhotoScreen = () => {
	const insets = useSafeAreaInsets()
	const isFocused = useIsFocused()
	const navigation = useNavigation()
	const window = useWindowDimensions()
	const themeContext = useContext(ThemeContext)
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const [status] = MediaLibrary.usePermissions()
	const [mediaLoading, setMediaLoading] = useState(false)
	const [loading, setLoading] = useState(false)
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
		if (status && status.granted) {
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
	}

	const _pickMediaPicker = async () => {
		if (!status.granted) {
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
		setLoading(true)
		const { secure_url } = await useCloudinaryImageUploading(data.photo.uri)
		if (secure_url) {
			CredentialPersonalProfileReactiveVar({
				...credentialPersonalProfileVar,
				photo: {
					...data.photo,
					url: secure_url,
				},
			})
			setLoading(false)
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
		if (status?.granted) {
			if (!photoLibrary.length) {
				loadMediaAsync()
			}
		} else {
			if (status?.canAskAgain) {
				navigation.navigate('PermissionNavigator', {
					screen: 'MediaLibraryPermissionScreen',
				})
			}
		}
	}, [status, isFocused])

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
							<Stop offset='0.25' stopColor={themeContext.palette.primary.background} stopOpacity='1' />
							<Stop offset='1' stopColor={themeContext.palette.primary.background} stopOpacity='1' />
						</LinearGradient>
					</Defs>
					<Rect height='100%' width={window.width} fill='url(#grad)' />
				</Svg>
				<Image
					style={{
						height: window.width / 1.55,
						width: window.width / 1.75,
					}}
					containerStyle={{ margin: 10, borderRadius: 20 }}
					source={watchValues?.photo?.uri ? { uri: watchValues.photo.uri } : UserFemaleIllustration}
				/>
			</Center>
			{!photoLibrary && (
				<VStack alignItems={'center'}>
					{[...Array(6)].map((item, index) => {
						return (
							<HStack key={index} space={0} overflow='hidden'>
								{[...Array(3)].map((item, index) => {
									return (
										<Skeleton
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
			)}
			{photoLibrary && (
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
					scrollEnabled={!loading}
					renderItem={({ item }: any) => {
						return (
							<Pressable
								onPress={() => {
									!loading && setValue('photo.uri', item.uri)
								}}
							>
								<Image
									containerStyle={{
										height: window.width / 3,
										width: window.width / 3,
										justifyContent: 'center',
										borderColor: 'black',
										borderWidth: 1,
									}}
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
			)}
			<View
				style={{
					position: 'absolute',
					bottom: 0,
					backgroundColor: themeContext.palette.primary.background,
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
					isDisabled={loading}
					icon={
						<Icon
							as={MaterialIcons}
							name='photo-library'
							size={29}
							color={themeContext.palette.primary.color.primary}
						/>
					}
				/>
				<Button
					w={'40%'}
					mx={'10%'}
					onPress={handleSubmit(onSubmit)}
					variant={'ghost'}
					isLoading={loading}
					endIcon={
						<Icon
							name='arrow-right'
							size={29}
							as={Feather}
							color={themeContext.palette.highlight.background.primary}
						/>
					}
				>
					<Text color={themeContext.palette.highlight.background.primary} fontSize={'xl'}>
						Continue
					</Text>
				</Button>
			</View>
		</SafeAreaView>
	)
}

export default PhotoScreen
