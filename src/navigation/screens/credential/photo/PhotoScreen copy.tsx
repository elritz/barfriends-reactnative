import { useReactiveVar } from '@apollo/client'
import RNEHeading1000 from '@components/atoms/typography/RNETypography/heading/RNEHeading1000'
import { useNavigation } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar } from '@reactive'
import { Button, Icon, Image } from '@rneui/themed'
import useCloudinaryImageUploading from '@util/uploading/useCloudinaryImageUploading'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ActivityIndicator, FlatList, Pressable, useWindowDimensions, View } from 'react-native'
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
	const [loading, setLoading] = useState(false)
	const [mediaLoading, setMediaLoading] = useState(false)
	const [numberOfPhotos] = useState(100)
	const [photoLibrary, setPhotoLibrary] = useState<unknown | string>()
	const [lastPhotoID, setLastPhotoID] = useState<string>('')

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

	watch()

	const values = getValues()

	const loadMediaAsync = async () => {
		setMediaLoading(true)
		const assets = await MediaLibrary.getAssetsAsync({
			first: 50,
			mediaType: 'photo',
		})
		const { id } = assets.assets[assets.assets.length - 1]
		setLastPhotoID(id)
		setPhotoLibrary(assets.assets)
		setMediaLoading(false)
	}

	useEffect(() => {
		loadMediaAsync()
	}, [])

	const navigateToMediaPermissionScreen = () => {
		navigation.navigate('PermissionNavigator', {
			screen: 'MediaLibraryPermissionScreen',
		})
	}

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

		const getNewPhotos = await MediaLibrary.getAssetsAsync({
			first: numberOfPhotos,
			after: lastPhotoID,
		})

		const { id } = getNewPhotos.assets[getNewPhotos.assets.length - 1]
		const newPhotos = [...photoLibrary, ...getNewPhotos.assets]

		setLastPhotoID(id)
		setPhotoLibrary(newPhotos)
		setMediaLoading(false)
	}

	const RightIcon = () => {
		return <Icon type='feather' name='arrow-right' size={35} />
	}

	if (!status) return null

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
						<Stop
							offset='0.25'
							// stopColor={
							// 	profileState.emojimood.colors[0]
							// 		? profileState.emojimood.colors[0]
							// 		: themeContext.palette.primary.background
							// }
							stopColor={themeContext.palette.primary.background}
							stopOpacity='1'
						/>
						<Stop
							offset='1'
							// stopColor={
							// 	profileState.emojimood.colors[1]
							// 		? profileState.emojimood.colors[1]
							// 		: themeContext.palette.primary.background
							// }
							stopColor={themeContext.palette.primary.background}
							stopOpacity='1'
						/>
					</LinearGradient>
				</Defs>
				<Rect height='100%' width={window.width} fill='url(#grad)' />
			</Svg>
			<Image
				style={{
					height: window.width / 1.4,
					width: window.width / 1.6,
				}}
				containerStyle={{ margin: 10, borderRadius: 20 }}
				source={values?.photo?.uri ? { uri: values.photo.uri } : UserFemaleIllustration}
			/>
			{!status.granted ? (
				<PermissionDescriptionView>
					<RNEHeading1000>
						Continue with media permissions, to select a photo upload to your profile.
					</RNEHeading1000>
					<Button
						containerStyle={{
							marginVertical: 20,
							borderRadius: 15,
						}}
						buttonStyle={{
							backgroundColor: themeContext.palette.bfscompany.primary,
						}}
						title={'Open Photo Library'}
						onPress={() => navigateToMediaPermissionScreen()}
					></Button>
				</PermissionDescriptionView>
			) : (
				<FlatList
					style={{
						width: '100%',
						height: '100%',
					}}
					keyExtractor={item => item.id}
					onEndReachedThreshold={0.4}
					onEndReached={() => _loadMoreMedia()}
					numColumns={3}
					data={photoLibrary}
					scrollEnabled={!loading}
					renderItem={({ item }: any) => (
						<Pressable
							onPress={() => {
								!loading ? setValue('photo.uri', item.uri) : null
							}}
						>
							<Image
								containerStyle={{
									height: window.width / 1.4,
									width: window.width / 2,
									justifyContent: 'center',
									borderColor: 'black',
									borderWidth: 1,
								}}
								source={{ uri: item.uri }}
							/>
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
				<Icon
					type='material'
					name='photo-library'
					size={29}
					color={themeContext.palette.primary.color.primary}
					onPress={_pickMediaPicker}
				/>
				<Button
					onPress={handleSubmit(onSubmit)}
					title={loading ? '' : 'Continue'}
					titleStyle={{
						color: themeContext.palette.highlight.background.primary,
						fontWeight: '600',
					}}
					buttonStyle={{
						paddingHorizontal: 10,
						backgroundColor: 'transparent',
					}}
					iconPosition='right'
					icon={
						loading ? (
							<ActivityIndicator
								size='small'
								color={themeContext.palette.primary.color.primary}
								style={{ marginHorizontal: 5 }}
							/>
						) : (
							<RightIcon />
						)
					}
				/>
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
