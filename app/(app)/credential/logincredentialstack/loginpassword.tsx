import { Feather, Ionicons } from '@expo/vector-icons'
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
import {
	Box,
	Image,
	Input,
	Icon,
	Text,
	IconButton,
	Spinner,
	VStack,
	Center,
	HStack,
} from 'native-base'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputAccessoryView, Platform, TextInput, View } from 'react-native'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import Reanimated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const IMAGE_SIZE = 85

export default () => {
	const INPUT_ACCESSORY_VIEW_ID = 'lp-21565434tw'
	const _passwordRef = useRef<TextInput>(null)
	const router = useRouter()
	const params = useSearchParams()
	const colorScheme = useThemeColorScheme()
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

	const [switchDeviceProfileMutation, { data: SDPData, loading: SDPLoading, error: SDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: data => {
				if (data.switchDeviceProfile.__typename == 'AuthorizationDeviceManager') {
					const deviceManager = data.switchDeviceProfile as AuthorizationDeviceManager
					AuthorizationReactiveVar(deviceManager)
					router.push({
						pathname: '(app)/hometab',
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
						},
					})
				}
			},
		})

	const onSubmit = async (data: any) => {
		loginPasswordQuery({
			variables: {
				username: String(params.username),
				password: data.password,
			},
		})
	}

	// if (!PQData) {
	// 	return (
	// 		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
	// 			<Spinner size='large' accessibilityLabel={'Loading...'} />
	// 		</View>
	// 	)
	// }

	const InnerContent = () => {
		return (
			<Box
				display={isFocused ? 'flex' : 'none'}
				_light={{
					bg: 'light.200',
				}}
				_dark={{
					bg: 'dark.200',
				}}
				flexDir={'row'}
				justifyContent={'flex-end'}
				alignContent={'space-around'}
				height={'70px'}
				px={'2.5%'}
			>
				<IconButton
					disabled={!!errors?.password}
					onPress={handleSubmit(onSubmit)}
					variant={'solid'}
					color={'primary.500'}
					isDisabled={!!errors.password || LPLoading || SDPLoading}
					borderRadius={'full'}
					style={{
						justifyContent: 'center',
						height: 60,
						width: 60,
						paddingHorizontal: 20,
						alignSelf: 'center',
					}}
					icon={
						<Icon
							as={Feather}
							name='arrow-right'
							size={'xl'}
							color={errors.password ? 'primary.700' : 'white'}
						/>
					}
				/>
			</Box>
		)
	}

	return (
		<Box flex={1}>
			<Reanimated.View style={{ flex: 1, marginVertical: 15, marginHorizontal: 15 }}>
				<VStack space={3}>
					<Center>
						{params.photo ? (
							<Image
								source={{ uri: String(params.photo) }}
								mt={5}
								alignSelf={'center'}
								height={`${IMAGE_SIZE}px`}
								width={`${IMAGE_SIZE}px`}
								borderRadius={'md'}
								alt={'Profile photo'}
							/>
						) : (
							<Box
								w={'40px'}
								h={'40px'}
								_light={{
									bg: 'light.100',
								}}
								_dark={{
									bg: 'dark.100',
								}}
								borderRadius={'md'}
							>
								<Box h={'100%'} flex={1} justifyContent={'center'}>
									<Center>
										<Icon
											_light={{
												color: 'light.300',
											}}
											_dark={{
												color: 'dark.300',
											}}
											as={Ionicons}
											size={'lg'}
											name={'ios-person'}
										/>
									</Center>
								</Box>
							</Box>
						)}
					</Center>
					<Controller
						name='password'
						control={control}
						defaultValue=''
						render={({ field: { onChange, onBlur, value } }) => {
							return (
								<Input
									variant={'underlined'}
									ref={_passwordRef}
									key='password'
									placeholder='Password'
									keyboardAppearance={colorScheme}
									value={value}
									py={2}
									_input={{
										fontSize: '2xl',
										fontWeight: 'medium',
									}}
									size={'lg'}
									secureTextEntry={!showPassword}
									onChangeText={value => onChange(value)}
									onSubmitEditing={handleSubmit(onSubmit)}
									h={'50px'}
									onBlur={onBlur}
									textContentType='password'
									blurOnSubmit={false}
									autoComplete={'password'}
									autoFocus
									returnKeyType='done'
									autoCorrect={false}
									inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
									autoCapitalize='none'
									numberOfLines={1}
									InputRightElement={
										<HStack space={2}>
											{/* {LPLoading && <Spinner size='md' accessibilityLabel={'Loading...'} />} */}
											<Icon
												onPress={() => {
													setShowPassword(!showPassword)
												}}
												as={Ionicons}
												name={showPassword ? 'eye-off' : 'eye'}
												size={'md'}
												_light={{
													color: !showPassword ? 'primary.500' : 'light.800',
												}}
												_dark={{
													color: !showPassword ? 'primary.500' : 'dark.800',
												}}
											/>
										</HStack>
									}
								/>
							)
						}}
					/>

					<Text color={'error.500'}>
						{errors.password && errors.password ? errors?.password.message : null}
					</Text>
				</VStack>
			</Reanimated.View>
			{Platform.OS === 'ios' ? (
				<InputAccessoryView nativeID={INPUT_ACCESSORY_VIEW_ID}>
					<InnerContent />
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
					<InnerContent />
				</Reanimated.View>
			)}
		</Box>
	)
}
