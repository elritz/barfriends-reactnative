import { useReactiveVar } from '@apollo/client'
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { StackActions, useNavigation } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar } from '@reactive'
import { Image } from '@rneui/themed'
import useCloudinaryImageUploading from '@util/uploading/useCloudinaryImageUploading'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { Button, Icon, Text, VStack } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FlatList, Pressable, useWindowDimensions, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg'
import styled, { ThemeContext } from 'styled-components/native'

const UserFemaleIllustration = require('@assets/images/illustration/user_female_illustration.png')

const PhotoScreen = () => {
	const insets = useSafeAreaInsets()
	const navigation = useNavigation()
	const window = useWindowDimensions()
	const themeContext = useContext(ThemeContext)
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const [status, requestPermission] = MediaLibrary.usePermissions()
	const [mediaLoading, setMediaLoading] = useState(false)
	const [loading, setLoading] = useState(false)
	const [numberOfPhotos] = useState(100)
	const [photoLibrary, setPhotoLibrary] = useState([])
	const [lastPhotoID, setLastPhotoID] = useState<string>('')
	const [hasNextPage, setHasNextPage] = useState<boolean>(true)

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

	useEffect(() => {
		loadMediaAsync()
	}, [])

	const _pickMediaPicker = async () => {
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

	if (!status) return null

	if (!status.granted) {
		// navigation.dispatch(StackActions.push(''))
		navigation.navigate('PermissionNavigator', {
			screen: 'MediaLibraryPermissionScreen',
		})
	}

	return (
		<OuterView>
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
			{!photoLibrary.length ? (
				<VStack></VStack>
			) : (
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
					renderItem={({ item }: any) => (
						<Pressable
							onPress={() => {
								!loading && setValue('photo.uri', item.uri)
							}}
						>
							<Image
								containerStyle={{
									height: window.width / 2,
									width: window.width / 2,
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
					)}
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
					justifyContent: 'space-around',
					alignItems: 'center',
					paddingBottom: insets.bottom,
				}}
			>
				<Button
					w={'50%'}
					mx={4}
					onPress={handleSubmit(onSubmit)}
					variant={'ghost'}
					isDisabled={loading}
					endIcon={
						<Icon
							as={MaterialIcons}
							name='photo-library'
							size={29}
							color={themeContext.palette.primary.color.primary}
							onPress={_pickMediaPicker}
						/>
					}
				/>
				<Button
					w={'50%'}
					mx={4}
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
		</OuterView>
	)
}

export default PhotoScreen

const OuterView = styled.SafeAreaView`
	align-items: center;
	flex: 1;
`

const PermissionDescriptionView = styled.View`
	width: 90%;
	flex: 1;
`
