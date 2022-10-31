import { useReactiveVar } from '@apollo/client'
import RNETextInput from '@components/atoms/inputs/rnetextinput/RNETextInput'
import { Profile, useUpdateOneProfileMutation } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { KeyboardAvoidingView, Text } from 'native-base'
import { Heading, Button, Box } from 'native-base'
import { useContext } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { ActivityIndicator, Pressable } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ThemeContext } from 'styled-components/native'

const NamesScreen = () => {
	const themeContext = useContext(ThemeContext)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const {
		control,
		setError,
		handleSubmit,
		reset,
		getValues,
		formState: { dirtyFields, errors },
	} = useForm({
		defaultValues: {
			fullname: rAuthorizationVar.DeviceProfile.Profile.IdentifiableInformation.fullname || '',
			nickname: rAuthorizationVar.DeviceProfile.Profile.IdentifiableInformation.nickname || '',
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
				if (data.updateOneProfile.__typename === 'Profile') {
					const profile = data.updateOneProfile as Profile
					AuthorizationReactiveVar({
						...rAuthorizationVar,
						DeviceProfile: {
							...rAuthorizationVar.DeviceProfile,
							Profile: profile,
						},
					})

					reset({
						fullname: data.updateOneProfile.IdentifiableInformation.fullname,
						nickname: data.updateOneProfile.IdentifiableInformation.nickname,
					})
				}
			},
		})

	const resetInput = (value: String) => {
		switch (value) {
			case 'fullname':
				reset({ fullname: rAuthorizationVar.DeviceProfile.Profile.IdentifiableInformation.fullname })
			case 'nickname':
				reset({ nickname: rAuthorizationVar.DeviceProfile.Profile.IdentifiableInformation.nickname })
			default:
				reset({ fullname: rAuthorizationVar.DeviceProfile.Profile.IdentifiableInformation.fullname })
				reset({ nickname: rAuthorizationVar.DeviceProfile.Profile.IdentifiableInformation.nickname })
		}
	}

	const onSubmit = () => {
		const data = getValues()
		if (dirtyFields.fullname) {
			updateOneProfilMutation({
				variables: {
					where: {
						id: rAuthorizationVar.DeviceProfile.Profile.id,
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
		if (dirtyFields.nickname) {
			updateOneProfilMutation({
				variables: {
					where: {
						id: rAuthorizationVar.DeviceProfile.Profile.id,
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
			<KeyboardAvoidingView flexDirection={'column'} justifyContent={'flex-start'} my={2} mx={'2%'}>
				<Controller
					name='fullname'
					control={control}
					rules={{
						required: true,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<Box flexDirection={'column'} alignItems={'flex-start'} width={'100%'} my={3}>
							<Heading fontSize={'lg'} style={{ marginBottom: 10 }}>
								Full name
							</Heading>
							<RNETextInput
								onBlur={onBlur}
								onChange={onChange}
								value={value}
								disabled={UOPLoading}
								blurOnSubmit={false}
								onSubmitEditing={handleSubmit(onSubmit)}
								textContentType='name'
								autoFocus
								placeholder='Full name '
								returnKeyType='done'
								autoCapitalize='none'
								numberOfLines={1}
								autoCompleteType='name'
								keyboardType='default'
								containerStyle={{
									alignSelf: 'center',
								}}
								rightIconContainerStyle={{
									marginLeft: 10,
								}}
								rightIcon={
									UOPLoading && dirtyFields.fullname ? (
										<ActivityIndicator size='small' color={themeContext.palette.primary.color.primary} />
									) : (
										dirtyFields.fullname && (
											<Pressable onPress={() => resetInput('fullname')}>
												<Text fontWeight={'bold'}>Reset</Text>
											</Pressable>
										)
									)
								}
								inputStyle={{
									backgroundColor: themeContext.palette.secondary.background,
									height: 55,
									padding: 10,
									borderRadius: 13,
								}}
								inputContainerStyle={{ borderBottomColor: 'transparent', borderBottomWidth: 0 }}
								errorMessage={errors?.fullname?.message}
							/>
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
							<Heading fontSize={'lg'} style={{ marginBottom: 10 }}>
								Nick name
							</Heading>
							<RNETextInput
								onBlur={onBlur}
								onChange={onChange}
								value={value}
								blurOnSubmit={false}
								disabled={UOPLoading}
								onSubmitEditing={handleSubmit(onSubmit)}
								textContentType='nickname'
								placeholder='Nickname'
								returnKeyType='done'
								autoCapitalize='none'
								numberOfLines={1}
								autoCompleteType='name'
								keyboardType='default'
								containerStyle={{
									alignSelf: 'center',
								}}
								inputStyle={{
									backgroundColor: themeContext.palette.secondary.background,
									height: 55,
									padding: 10,
									borderRadius: 13,
								}}
								rightIconContainerStyle={{
									marginLeft: 10,
								}}
								rightIcon={
									UOPLoading && dirtyFields.nickname ? (
										<ActivityIndicator size='small' color={themeContext.palette.primary.color.primary} />
									) : (
										dirtyFields.nickname && (
											<Pressable onPress={() => resetInput('nickname')}>
												<Text fontWeight={'bold'}>Reset</Text>
											</Pressable>
										)
									)
								}
								inputContainerStyle={{ borderBottomColor: 'transparent', borderBottomWidth: 0 }}
								errorMessage={errors?.nickname?.message}
							/>
						</Box>
					)}
				/>
				{(dirtyFields.fullname || dirtyFields.nickname) && (
					<Button
						disabled={UOPLoading}
						isLoading={UOPLoading}
						isLoadingText={'Updating...'}
						onPress={() => onSubmit()}
						borderRadius={'lg'}
						style={{
							backgroundColor: themeContext.palette.bfscompany.primary,
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

export default NamesScreen
