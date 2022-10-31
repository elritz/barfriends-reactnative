import { useReactiveVar } from '@apollo/client'
import RNETextInput from '@components/atoms/inputs/rnetextinput/RNETextInput'
import RNEText500 from '@components/atoms/typography/RNETypography/text/RNEText500'
import { Ionicons } from '@expo/vector-icons'
import { Profile, useCheckUsernameLazyQuery, useUpdateOneProfileMutation } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { Box, Button, Heading, KeyboardAvoidingView } from 'native-base'
import React, { useContext } from 'react'
import { useForm, Controller, ValidateResult } from 'react-hook-form'
import { ActivityIndicator, Pressable } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styled, { ThemeContext } from 'styled-components/native'

const UsernameScreen = () => {
	const themeContext = useContext(ThemeContext)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

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
			username: rAuthorizationVar.DeviceProfile.Profile.IdentifiableInformation.username || '',
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

	const [updateOneProfilMutation, { data: UOPData, loading: UOPLoading, error: UOPError }] =
		useUpdateOneProfileMutation({
			onError: error => {
				setError('username', error)
			},
			onCompleted: data => {
				const profile = data.updateOneProfile as Profile
				AuthorizationReactiveVar({
					...rAuthorizationVar,
					DeviceProfile: {
						...rAuthorizationVar.DeviceProfile,
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
						id: rAuthorizationVar.DeviceProfile.Profile.id,
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

	const InputRightIcon = () => {
		return CULoading ? (
			<ActivityIndicator size='small' color={themeContext.palette.primary.color.primary} />
		) : (
			<Ionicons
				name='checkmark-circle'
				size={24}
				color={errors.username || !CUData?.checkUsername ? 'lightgrey' : 'green'}
			/>
		)
	}

	const resetInput = (value: String) => {
		reset({ username: rAuthorizationVar.DeviceProfile.Profile.IdentifiableInformation.username })
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
				my={'20px'}
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
						<Box flexDir={'column'} alignItems={'flex-start'} width={'95%'}>
							<Heading fontSize={'lg'} style={{ marginBottom: 10 }}>
								Username
							</Heading>
							<RNETextInput
								onBlur={onBlur}
								onChange={onChange}
								value={value}
								blurOnSubmit={false}
								keyProp='username'
								blurOnSubmit={false}
								onSubmitEditing={handleSubmit(onSubmit)}
								textContentType='name'
								autoFocus
								placeholder='Username '
								returnKeyType='done'
								autoCapitalize='none'
								numberOfLines={1}
								rightIcon={<InputRightIcon />}
								autoCompleteType='name'
								keyboardType='default'
								containerStyle={{
									alignSelf: 'center',
								}}
								rightIcon={
									UOPLoading && dirtyFields.username ? (
										<ActivityIndicator size='small' color={themeContext.palette.primary.color.primary} />
									) : (
										dirtyFields.username && (
											<Pressable onPress={() => resetInput('nickname')}>
												<RNEText500>Reset</RNEText500>
											</Pressable>
										)
									)
								}
								errorMessage={errors?.username?.message}
							/>
						</Box>
					)}
				/>
			</KeyboardAvoidingView>
			{dirtyFields.username && (
				<Button
					disabled={UOPLoading}
					isLoading={UOPLoading}
					isLoadingText={'Updating...'}
					onPress={handleSubmit(onSubmit)}
					borderRadius={'lg'}
					style={{
						backgroundColor: themeContext.palette.bfscompany.primary,
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
