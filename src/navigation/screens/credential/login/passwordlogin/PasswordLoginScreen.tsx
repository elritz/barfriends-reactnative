import { Feather } from '@expo/vector-icons'
import {
	DeviceManager,
	Profile,
	useLoginPasswordLazyQuery,
	useProfileQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { useRoute, useIsFocused, useNavigation, RouteProp } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { LinearGradient } from 'expo-linear-gradient'
import {
	Box,
	Image,
	KeyboardAvoidingView,
	Input,
	Icon,
	HStack,
	Text,
	IconButton,
	Spinner,
} from 'native-base'
import { useTheme } from 'native-base'
import { useContext, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputAccessoryView, Platform, View } from 'react-native'
import { LoginStackParamList } from 'src/types/app'
import { ThemeContext } from 'styled-components/native'

export type PasswordLoginScreenRouteProp = RouteProp<LoginStackParamList, 'PasswordLoginScreen'>

type PasswordScreenProps = {
	Profile?: Profile
}

const IMAGE_SIZE = 75

const PasswordLoginScreen = () => {
	const inputAccessoryViewID = 'uni2que123ID4'
	const isFocused = useIsFocused()
	const navigation = useNavigation()
	const route = useRoute<PasswordLoginScreenRouteProp>()
	const themeContext = useContext(ThemeContext)
	const theme = useTheme()
	const colorScheme = useThemeColorScheme()
	const passwordRef = useRef(null)

	const keyboardVerticalOffset = Platform.OS === 'ios' ? 50 : 0

	const [showPassword, setShowPassword] = useState<boolean>(true)

	const {
		control,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			password: '',
		},
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	useEffect(() => {
		if (passwordRef && passwordRef.current) {
			passwordRef.current?.focus()
		}
	}, [isFocused])

	const {
		data: PQData,
		loading: PQLoading,
		error: PQError,
	} = useProfileQuery({
		skip: !route.params.profile,
		variables: {
			where: {
				id: route.params.profile,
			},
		},
	})

	const [switchDeviceProfileMutation, { data: SDPData, loading: SDPLoading, error: SDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: data => {
				if (data.switchDeviceProfile.__typename == 'DeviceManager') {
					const deviceManager = data.switchDeviceProfile as DeviceManager
					AuthorizationReactiveVar(deviceManager)
					navigation.navigate('HomeTabNavigator', {
						screen: 'VenueFeedStack',
						params: {
							screen: 'VenueFeedScreen',
						},
					})
				}
			},
		})

	const [loginPasswordQuery, { data: LPData, loading: LPLoading, error: LPError }] =
		useLoginPasswordLazyQuery({
			onCompleted: data => {
				if (!data.loginPassword) {
					setError('password', { type: 'validate', message: 'Incorrect password' })
				}
				switchDeviceProfileMutation({
					variables: {
						profileId: route.params.profile,
					},
				})
			},
		})

	const onSubmit = async (data: any) => {
		if (PQData.profile.IdentifiableInformation.username) {
			loginPasswordQuery({
				variables: {
					username: PQData.profile.IdentifiableInformation.username,
					password: data.password,
				},
			})
		}
	}

	if (!PQData) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Spinner size='large' accessibilityLabel={'Loading...'} />
			</View>
		)
	}

	return (
		<KeyboardAvoidingView
			height={'auto'}
			flexDir={'column'}
			mx={'5%'}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={keyboardVerticalOffset}
		>
			<LinearGradient
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: 10,
					padding: 5,
					borderRadius: 20,
				}}
				colors={[
					themeContext.palette.secondary.background.default,
					themeContext.palette.secondary.background.default,
				]}
			>
				{!PQLoading && (
					<Image
						height={`${IMAGE_SIZE}px`}
						width={`${IMAGE_SIZE}px`}
						borderRadius={'lg'}
						source={{ uri: PQData.profile.photos[0].url }}
						alt={'Profile Photo'}
					/>
				)}
			</LinearGradient>
			<View style={{ marginVertical: '10%', width: '100%' }}>
				<Controller
					name='password'
					control={control}
					defaultValue=''
					render={({ field: { onChange, onBlur, value } }) => {
						return (
							<HStack>
								<Input
									ref={passwordRef}
									key='password'
									value={value}
									keyboardAppearance={colorScheme}
									onChangeText={onChange}
									onSubmitEditing={handleSubmit(onSubmit)}
									onBlur={onBlur}
									textContentType='password'
									blurOnSubmit={false}
									autoFocus
									placeholder='Password'
									returnKeyType='done'
									autoCorrect={false}
									inputAccessoryViewID={inputAccessoryViewID}
									secureTextEntry={showPassword}
									autoCapitalize='none'
									numberOfLines={1}
									rightElement={
										<Icon
											onPress={() => {
												setShowPassword(!showPassword)
											}}
											name={showPassword ? 'eye-off' : 'eye'}
											size={20}
											style={{
												padding: 10,
											}}
											color={showPassword ? theme.colors.gray[300] : theme.colors.primary[500]}
										/>
									}
								/>
								<Text>{errors?.password?.message}</Text>
							</HStack>
						)
					}}
				/>
				<InputAccessoryView nativeID={inputAccessoryViewID}>
					<Box
						flexDir={'row'}
						justifyContent={'flex-end'}
						alignContent={'space-around'}
						height={'90px'}
						px={'2.5%'}
					>
						<View
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-around',
							}}
						>
							<IconButton
								disabled={SDPLoading || LPLoading}
								onPress={handleSubmit(onSubmit)}
								as={Feather}
								style={{
									backgroundColor: !!errors.password ? theme.colors.gray[300] : theme.colors.primary[500],
									height: 70,
									width: 'auto',
									minWidth: 70,
									justifyContent: 'center',
									borderRadius: 50,
								}}
								icon={
									SDPLoading || LPLoading ? (
										<Spinner size='small' />
									) : (
										<Icon as={Feather} name='arrow-right' size={35} />
									)
								}
							/>
						</View>
					</Box>
				</InputAccessoryView>
			</View>
		</KeyboardAvoidingView>
	)
}

export default PasswordLoginScreen
