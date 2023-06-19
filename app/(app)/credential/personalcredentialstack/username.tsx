import { useReactiveVar } from '@apollo/client'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useCheckUsernameLazyQuery } from '@graphql/generated'
import { useIsFocused } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useRouter } from 'expo-router'
import { Button, Input, useTheme, Text, Icon, Box } from 'native-base'
import { useRef } from 'react'
import { Controller, useForm, ValidateResult } from 'react-hook-form'
import { InputAccessoryView, Platform, TextInput, View } from 'react-native'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import Reanimated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const INPUT_ACCESSORY_VIEW_ID = 'un-1298187263'
	const { bottom } = useSafeAreaInsets()
	const router = useRouter()
	const isFocused = useIsFocused()
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const _usernameRef = useRef<TextInput>(null)
	const colorScheme = useThemeColorScheme()
	const theme = useTheme()

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
		clearErrors,
		getValues,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			username: '',
		},
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const values = getValues()

	const [checkUsername, { data: CUData, loading: CULoading, error: CUError }] =
		useCheckUsernameLazyQuery({
			fetchPolicy: 'no-cache',
			variables: {
				username: values.username,
			},
			onCompleted(data) {
				if (!data.checkUsername) {
					setError('username', { type: 'validate', message: 'Username has been taken' })
				} else {
					clearErrors()
				}
			},
		})

	const onSubmit = (data: any) => {
		CredentialPersonalProfileReactiveVar({
			...credentialPersonalProfileVar,
			username: data.username,
		})
		router.push({
			pathname: '(app)/credential/personalcredentialstack/password',
		})
	}

	const validateCheckUsername = async (value: string): Promise<ValidateResult> => {
		setTimeout(() => {
			checkUsername()
		}, 500)
		if (!CULoading && CUData?.checkUsername) {
			return true
		} else {
			setError('username', { type: 'validate', message: 'Username has been taken' })
			return false
		}
	}

	const InnerContent = () => {
		return (
			<Box
				flexDir={'row'}
				justifyContent={'flex-end'}
				height={'90px'}
				px={'2.5%'}
				_light={{
					bg: theme.colors.light[100],
				}}
				_dark={{
					bg: theme.colors.dark[200],
				}}
			>
				<Box
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-around',
					}}
				>
					<Button
						onPress={handleSubmit(onSubmit)}
						isDisabled={!!errors.username}
						borderRadius={'full'}
						style={{
							justifyContent: 'center',
							height: 60,
							width: 60,
							paddingHorizontal: 20,
							alignSelf: 'center',
						}}
						rightIcon={
							<Icon
								as={Feather}
								name='arrow-right'
								size={'xl'}
								color={errors.username ? 'primary.700' : 'white'}
							/>
						}
					/>
				</Box>
			</Box>
		)
	}
	const InputRightIcon = () => {
		const boxDim = 35

		return (
			<Box h={`${boxDim}px`} w={`${boxDim}px`} justifyContent={'center'} alignItems={'center'}>
				{values.username.length && CUData?.checkUsername ? (
					<Icon
						as={Ionicons}
						name='checkmark-circle'
						size={'lg'}
						color={errors.username || !CUData?.checkUsername ? 'error.600' : 'success.700'}
					/>
				) : null}
			</Box>
		)
	}

	return (
		<Box flex={1}>
			<Reanimated.View style={{ flex: 1, marginHorizontal: 15 }}>
				<Text mt={4} lineHeight={35} fontWeight={'black'} fontSize={'3xl'}>
					Choose your username
				</Text>
				<View style={{ marginVertical: '10%', width: '100%' }}>
					<Controller
						name='username'
						control={control}
						defaultValue=''
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								ref={_usernameRef}
								value={value}
								key='username'
								placeholder='Username'
								keyboardAppearance={colorScheme}
								onChangeText={onChange}
								onSubmitEditing={handleSubmit(onSubmit)}
								onBlur={onBlur}
								autoCorrect={false}
								contextMenuHidden
								spellCheck={false}
								autoFocus
								textContentType='username'
								autoComplete='username-new'
								returnKeyType='done'
								variant={'underlined'}
								py={2}
								_input={{
									fontSize: 'xl',
									fontWeight: 'medium',
								}}
								size={'lg'}
								numberOfLines={1}
								keyboardType='default'
								autoCapitalize='none'
								inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
								blurOnSubmit={false}
								InputRightElement={<InputRightIcon />}
							/>
						)}
						rules={{
							required: {
								value: true,
								message: '',
							},
							validate: {
								greaterThanZero: value => value.length > 0 || '',
								greaterQualThanFour: value => value.length >= 1 || '',
								noSpaces: value => /^[\S]+$/.test(value) || 'No spaces are allowed',
								validateCheckUsername: async value => (await validateCheckUsername(value)) || '',
							},
						}}
					/>
					<Text>{errors?.username?.message}</Text>
				</View>
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
