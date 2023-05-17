import { Feather } from '@expo/vector-icons'
import {
	AuthorizationDeviceManager,
	ProfileType,
	useLoginPasswordLazyQuery,
	useProfileQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { useIsFocused } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useRouter, useSearchParams } from 'expo-router'
import { Box, Image, Input, Icon, Text, IconButton, Spinner, VStack } from 'native-base'
import { useTheme } from 'native-base'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputAccessoryView, Platform, View } from 'react-native'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import Reanimated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const IMAGE_SIZE = 85

const PasswordLoginScreen = () => {
	const INPUT_ACCESSORY_VIEW_ID = 'p-21565434tw'
	const router = useRouter()
	const params = useSearchParams()
	const theme = useTheme()
	const colorScheme = useThemeColorScheme()
	const passwordRef = useRef(null)
	const [showPassword, setShowPassword] = useState<boolean>(true)

	const isFocused = useIsFocused()
	const { bottom } = useSafeAreaInsets()
	const { height: platform } = useReanimatedKeyboardAnimation()
	const INPUT_CONTAINER_HEIGHT = 90

	const height = useDerivedValue(() => platform.value, [isFocused])

	const textInputContainerStyle = useAnimatedStyle(
		() => ({
			width: '100%',
			position: 'absolute',
			bottom: 0,
			paddingBottom: bottom,
			height: INPUT_CONTAINER_HEIGHT,
			transform: [{ translateY: height.value }],
		}),
		[],
	)

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

	const {
		data: PQData,
		loading: PQLoading,
		error: PQError,
	} = useProfileQuery({
		skip: !params.profileid,
		variables: {
			where: {
				id: {
					equals: String(params.profileid),
				},
			},
		},
	})

	const [switchDeviceProfileMutation, { data: SDPData, loading: SDPLoading, error: SDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: data => {
				if (!data || !data.switchDeviceProfile) {
					return null
				} else if (data.switchDeviceProfile.__typename == 'AuthorizationDeviceManager') {
					const deviceManager = data.switchDeviceProfile as AuthorizationDeviceManager
					AuthorizationReactiveVar(deviceManager)
					router.push({
						pathname: '(app)/hometab/venuefeedstack',
					})
				}
			},
		})

	const [loginPasswordQuery, { data: LPData, loading: LPLoading, error: LPError }] =
		useLoginPasswordLazyQuery({
			onCompleted: data => {
				if (!data.loginPassword) {
					setError('password', { type: 'validate', message: 'Incorrect password' })
				} else {
					switchDeviceProfileMutation({
						variables: {
							profileId: String(params.profileid),
							profileType: ProfileType.Personal,
						},
					})
				}
			},
		})

	const onSubmit = async (data: any) => {
		if (PQData?.profile?.IdentifiableInformation?.username) {
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
		<Box flex={1}>
			<Reanimated.View style={{ flex: 1, marginHorizontal: 15 }}>
				<VStack space={3}>
					{!PQLoading && (
						<Image
							mt={5}
							alignSelf={'center'}
							height={`${IMAGE_SIZE}px`}
							width={`${IMAGE_SIZE}px`}
							borderRadius={'md'}
							source={{ uri: PQData?.profile?.photos[0].url }}
							alt={'Profile Photo'}
						/>
					)}
					<Controller
						name='password'
						control={control}
						defaultValue=''
						render={({ field: { onChange, onBlur, value } }) => {
							return (
								<Input
									variant={'underlined'}
									ref={passwordRef}
									key='password'
									placeholder='Password'
									keyboardAppearance={colorScheme}
									value={value}
									_input={{
										fontSize: '2xl',
										fontWeight: 'medium',
									}}
									secureTextEntry
									onChangeText={value => onChange(value)}
									onSubmitEditing={() => {
										handleSubmit(onSubmit)
										passwordRef?.current?.focus()
									}}
									h={'50px'}
									onBlur={onBlur}
									textContentType='password'
									blurOnSubmit={false}
									autoComplete={'password-new'}
									autoFocus
									returnKeyType='next'
									autoCorrect={false}
									inputAccessoryViewID={inputAccessoryViewID}
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
							)
						}}
					/>

					<Box h={'30px'} w={'100%'}>
						<Text>{errors?.password?.message}</Text>
					</Box>
				</VStack>
			</Reanimated.View>
			{Platform.OS === 'ios' ? (
				<InputAccessoryView nativeID={INPUT_ACCESSORY_VIEW_ID}>
					<Box
						flexDir={'row'}
						justifyContent={'flex-end'}
						alignContent={'space-around'}
						height={'90px'}
						px={'2.5%'}
						_light={{
							bg: 'light.200',
						}}
						_dark={{
							bg: 'dark.200',
						}}
					>
						<View
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-around',
							}}
						>
							<IconButton
								disabled={!!errors.password || LPLoading || SDPLoading}
								onPress={handleSubmit(onSubmit)}
								variant={'solid'}
								color={'primary.500'}
								isDisabled={!!errors.password || LPLoading || SDPLoading}
								style={{
									justifyContent: 'center',
									borderRadius: 50,
									height: 70,
									width: 70,
									paddingHorizontal: 20,
									alignSelf: 'center',
								}}
								icon={
									<Icon
										as={Feather}
										name='arrow-right'
										size={'2xl'}
										color={errors?.password ? 'light.800' : 'white'}
									/>
								}
							/>
						</View>
					</Box>
				</InputAccessoryView>
			) : (
				<Reanimated.View
					style={[
						{
							height: INPUT_CONTAINER_HEIGHT,
						},
						textInputContainerStyle,
					]}
				>
					<Box
						flexDir={'row'}
						justifyContent={'flex-end'}
						alignContent={'space-around'}
						height={'90px'}
						px={'2.5%'}
						_light={{
							bg: 'light.200',
						}}
						_dark={{
							bg: 'dark.200',
						}}
					>
						<View
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-around',
							}}
						>
							<IconButton
								disabled={!!errors.password || LPLoading || SDPLoading}
								onPress={handleSubmit(onSubmit)}
								variant={'solid'}
								color={'primary.500'}
								isDisabled={!!errors.password || LPLoading || SDPLoading}
								style={{
									justifyContent: 'center',
									borderRadius: 50,
									height: 70,
									width: 70,
									paddingHorizontal: 20,
									alignSelf: 'center',
								}}
								icon={
									<Icon
										as={Feather}
										name='arrow-right'
										size={'2xl'}
										color={errors?.password ? 'light.800' : 'white'}
									/>
								}
							/>
						</View>
					</Box>
				</Reanimated.View>
			)}
		</Box>
	)
}

export default PasswordLoginScreen
