import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import {
	AuthorizationDeviceManager,
	AuthorizationDeviceProfile,
	Profile,
	useCheckUsernameLazyQuery,
	useUpdateOneProfileMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Icon, Input } from 'native-base'
import { Box, Button, Heading, KeyboardAvoidingView, Text } from 'native-base'
import { useContext } from 'react'
import { useForm, Controller, ValidateResult } from 'react-hook-form'
import { ActivityIndicator, Pressable } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ThemeContext } from 'styled-components/native'

const UsernameScreen = () => {
	const themeContext = useContext(ThemeContext)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const colorScheme = useThemeColorScheme()

	const {
		control,
		setError,
		handleSubmit,
		watch,
		reset,
		clearErrors,
		formState: { dirtyFields, errors },
	} = useForm({
		defaultValues: {
			username: rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.username || '',
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const values = watch()

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

	const [updateOneProfilMutation, { data: UOPData, loading: UOPLoading, error: UOPError }] =
		useUpdateOneProfileMutation({
			onError: error => {
				setError('username', error)
			},
			onCompleted: data => {
				const profile = data.updateOneProfile as Profile
				const deviceManager = rAuthorizationVar as AuthorizationDeviceManager
				const deviceprofile = rAuthorizationVar?.DeviceProfile as AuthorizationDeviceProfile

				AuthorizationReactiveVar({
					...deviceManager,
					DeviceProfile: {
						...deviceprofile,
						Profile: profile,
					},
				})
				reset()
			},
		})

	const onSubmit = data => {
		if (dirtyFields.username) {
			updateOneProfilMutation({
				variables: {
					where: {
						id: rAuthorizationVar?.DeviceProfile?.Profile?.id,
					},
					data: {
						IdentifiableInformation: {
							update: {
								username: {
									set: data.username,
								},
							},
						},
					},
				},
			})
		}
	}

	const resetInput = (value: String) => {
		reset({ username: rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.username })
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

	const InputRightIcon = () => {
		return CULoading ? (
			<ActivityIndicator
				style={{ marginRight: 4 }}
				size='small'
				color={themeContext.palette.primary.color.default}
			/>
		) : (
			<Icon
				as={Ionicons}
				name='checkmark-circle'
				size={'lg'}
				color={errors.username || !CUData?.checkUsername ? 'error.600' : 'success.700'}
				mr={2}
			/>
		)
	}

	return (
		<KeyboardAwareScrollView
			keyboardDismissMode='none'
			keyboardShouldPersistTaps={'always'}
			extraScrollHeight={100}
		>
			<KeyboardAvoidingView
				flexDir={'column'}
				justifyContent={'space-between'}
				alignItems={'center'}
				my={2}
				mx={2}
			>
				<Controller
					name='username'
					control={control}
					rules={{
						required: true,
						validate: {
							greaterThanZero: value => value.length > 0 || 'Must have password',
							greaterQualThanFour: value => value.length >= 1 || '',
							noSpaces: value => /^[\S]+$/.test(value) || 'No spaces are allowed',
							validateCheckUsername: async value => (await validateCheckUsername(value)) || '',
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							key='username'
							value={value}
							keyboardAppearance={colorScheme}
							variant={'filled'}
							onChangeText={value => onChange(value)}
							onSubmitEditing={handleSubmit(onSubmit)}
							onBlur={onBlur}
							autoCapitalize='none'
							numberOfLines={1}
							textContentType='username'
							blurOnSubmit={false}
							autoFocus
							placeholder='Username'
							returnKeyType='done'
							autoCorrect={false}
							fontSize={'md'}
							p={4}
							borderRadius={'md'}
							InputRightElement={<InputRightIcon />}
						/>
					)}
				/>
			</KeyboardAvoidingView>
			{dirtyFields.username && (
				<Button
					disabled={UOPLoading}
					isLoading={UOPLoading}
					isLoadingText={'Updating...'}
					onPress={handleSubmit(onSubmit)}
					borderRadius={'md'}
					style={{
						// backgroundColor: themeContext.palette.bfscompany.primary,
						alignSelf: 'center',
						width: '50%',
					}}
					size={'lg'}
				>
					Update
				</Button>
			)}
		</KeyboardAwareScrollView>
	)
}

export default UsernameScreen
