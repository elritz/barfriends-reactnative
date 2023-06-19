import { useReactiveVar } from '@apollo/client'
import { Heading } from '@components/core'
import {
	AuthorizationDeviceManager,
	AuthorizationDeviceProfile,
	Profile,
	useUpdateOneProfileMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Input, KeyboardAvoidingView, Text, useTheme } from 'native-base'
import { Button, Box } from 'native-base'
import { useForm, Controller } from 'react-hook-form'
import { ActivityIndicator, Pressable } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default () => {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const theme = useTheme()
	const colorScheme = useThemeColorScheme()

	const {
		control,
		setError,
		handleSubmit,
		reset,
		getValues,
		formState: { dirtyFields, errors },
	} = useForm({
		defaultValues: {
			fullname: rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.fullname || '',
			nickname: rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.nickname || '',
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const [updateOneProfilMutation, { data, loading: UOPLoading, error }] =
		useUpdateOneProfileMutation({
			onError: error => {
				setError('fullname', error)
			},
			onCompleted: data => {
				if (data.updateOneProfile) {
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

					reset({
						fullname: String(data?.updateOneProfile?.IdentifiableInformation?.fullname),
						nickname: String(data?.updateOneProfile?.IdentifiableInformation?.nickname),
					})
				}
			},
		})

	const resetInput = (value: String) => {
		switch (value) {
			case 'fullname':
				reset({
					fullname: String(rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.fullname),
				})
			case 'nickname':
				reset({
					nickname: String(rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.nickname),
				})
			default:
				reset({
					fullname: String(rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.fullname),
				})
				reset({
					nickname: String(rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.nickname),
				})
		}
	}

	const onSubmit = () => {
		const data = getValues()
		if (dirtyFields.fullname && dirtyFields.nickname) {
			updateOneProfilMutation({
				variables: {
					where: {
						id: rAuthorizationVar?.DeviceProfile?.Profile?.id,
					},
					data: {
						IdentifiableInformation: {
							update: {
								fullname: {
									set: data.fullname,
								},
								nickname: {
									set: data.nickname,
								},
							},
						},
					},
				},
			})
		}
		if (dirtyFields.fullname && !dirtyFields.nickname) {
			updateOneProfilMutation({
				variables: {
					where: {
						id: rAuthorizationVar?.DeviceProfile?.Profile?.id,
					},
					data: {
						IdentifiableInformation: {
							update: {
								fullname: {
									set: data.fullname,
								},
							},
						},
					},
				},
			})
		}
		if (dirtyFields.nickname && !dirtyFields.fullname) {
			updateOneProfilMutation({
				variables: {
					where: {
						id: rAuthorizationVar?.DeviceProfile?.Profile?.id,
					},
					data: {
						IdentifiableInformation: {
							update: {
								nickname: {
									set: data.nickname,
								},
							},
						},
					},
				},
			})
		}
	}

	return (
		<KeyboardAwareScrollView
			keyboardDismissMode='none'
			keyboardShouldPersistTaps={'always'}
			extraScrollHeight={100}
		>
			<KeyboardAvoidingView flexDirection={'column'} justifyContent={'flex-start'} my={2} mx={2}>
				<Controller
					name='fullname'
					control={control}
					rules={{
						required: true,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<Box flexDirection={'column'} alignItems={'flex-start'} width={'100%'} my={3}>
							<Heading fontSize={'$lg'} style={{ marginBottom: 10 }}>
								Full name
							</Heading>
							<Input
								onBlur={onBlur}
								keyboardAppearance={colorScheme}
								onChangeText={onChange}
								value={value}
								isDisabled={UOPLoading}
								blurOnSubmit={false}
								onSubmitEditing={handleSubmit(onSubmit)}
								textContentType='name'
								autoFocus
								placeholder='Full name '
								returnKeyType='done'
								autoCapitalize='none'
								numberOfLines={1}
								autoComplete='name'
								keyboardType='default'
								variant={'filled'}
								style={{
									alignSelf: 'center',
									height: 55,
									padding: 10,
								}}
								fontSize={'md'}
								borderRadius={'md'}
								rightElement={
									<Box mr={3}>
										{UOPLoading && dirtyFields.fullname ? (
											<ActivityIndicator size='small' color={theme.colors.primary[500]} />
										) : (
											dirtyFields.fullname && (
												<Pressable onPress={() => resetInput('fullname')}>
													<Text fontWeight={'bold'}>Reset</Text>
												</Pressable>
											)
										)}
									</Box>
								}
							/>
							<Text>{errors?.fullname?.message}</Text>
						</Box>
					)}
				/>
				<Controller
					name='nickname'
					control={control}
					rules={{
						required: true,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<Box flexDirection={'column'} alignItems={'flex-start'} width={'100%'} my={3}>
							<Heading fontSize={'$lg'} style={{ marginBottom: 10 }}>
								Nick name
							</Heading>
							<Input
								onBlur={onBlur}
								onChange={onChange}
								value={value}
								blurOnSubmit={false}
								isDisabled={UOPLoading}
								keyboardAppearance={colorScheme}
								onSubmitEditing={handleSubmit(onSubmit)}
								textContentType='nickname'
								placeholder='Nickname'
								returnKeyType='done'
								autoCapitalize='none'
								variant={'filled'}
								numberOfLines={1}
								autoComplete='name'
								keyboardType='default'
								fontSize={'md'}
								p={4}
								borderRadius={'md'}
								rightElement={
									<Box mr={3}>
										{UOPLoading && dirtyFields.nickname ? (
											<ActivityIndicator size='small' color={theme.colors.primary[500]} />
										) : (
											dirtyFields.nickname && (
												<Pressable onPress={() => resetInput('nickname')}>
													<Text fontWeight={'bold'}>Reset</Text>
												</Pressable>
											)
										)}
									</Box>
								}
							/>
							<Text>{errors?.nickname?.message}</Text>
						</Box>
					)}
				/>
				{(dirtyFields.fullname || dirtyFields.nickname) && (
					<Button
						disabled={UOPLoading}
						isLoading={UOPLoading}
						isLoadingText={'Updating...'}
						onPress={() => onSubmit()}
						borderRadius={'md'}
						style={{
							backgroundColor: theme.colors.primary[500],
							alignSelf: 'center',
							width: '50%',
						}}
						my={5}
						size={'lg'}
					>
						Update
					</Button>
				)}
			</KeyboardAvoidingView>
		</KeyboardAwareScrollView>
	)
}
