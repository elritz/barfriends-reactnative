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
import { Input, Button } from '@rneui/base'
import { Icon } from '@rneui/themed'
import { LinearGradient } from 'expo-linear-gradient'
import { Box, Image, KeyboardAvoidingView } from 'native-base'
import { useContext, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, InputAccessoryView, Platform, View } from 'react-native'
import { LoginStackParamList } from 'src/types/app'
import { ThemeContext } from 'styled-components/native'

export type PasswordLoginScreenRouteProp = RouteProp<LoginStackParamList, 'PasswordLoginScreen'>

type PasswordScreenProps = {
	Profile?: Profile
}

const IMAGE_SIZE = 75

const PasswordLoginScreen = () => {
	const inputAccessoryViewID = 'uni2que123ID4'
	const passwordRef = useRef(null)
	const keyboardVerticalOffset = Platform.OS === 'ios' ? 50 : 0
	const navigation = useNavigation()
	const route = useRoute<PasswordLoginScreenRouteProp>()
	const isFocused = useIsFocused()
	const themeContext = useContext(ThemeContext)

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

	const InputRightIcon = () => (
		<Feather
			onPress={() => {
				setShowPassword(!showPassword)
			}}
			name={showPassword ? 'eye-off' : 'eye'}
			size={20}
			style={{
				padding: 10,
			}}
			color={
				showPassword
					? themeContext.palette.disabled.background
					: themeContext.palette.active.color.primary
			}
		/>
	)

	const RightIcon = () => (
		<>
			{SDPLoading || LPLoading ? (
				<ActivityIndicator size='small' color={themeContext.palette.primary.color.primary} />
			) : (
				<Icon type='feather' name='arrow-right' size={35} />
			)}
		</>
	)

	if (!PQData) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size='large' color={themeContext.palette.primary.color.primary} />
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
				colors={[themeContext.palette.secondary.background, themeContext.palette.secondary.background]}
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
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							ref={passwordRef}
							key='password'
							value={value}
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
							errorStyle={{ color: 'red' }}
							errorMessage={errors?.password?.message}
							rightIcon={<InputRightIcon />}
						/>
					)}
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
							<Button
								disabled={SDPLoading || LPLoading}
								onPress={handleSubmit(onSubmit)}
								buttonStyle={{
									backgroundColor: !!errors.password
										? themeContext.palette.disabled.background
										: themeContext.palette.highlight.background.primary,
									height: 70,
									width: 'auto',
									minWidth: 70,
									justifyContent: 'center',
									borderRadius: 50,
								}}
								iconPosition='right'
								icon={<RightIcon />}
							/>
						</View>
					</Box>
				</InputAccessoryView>
			</View>
		</KeyboardAvoidingView>
	)
}

export default PasswordLoginScreen
