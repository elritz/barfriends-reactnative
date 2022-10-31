import { useReactiveVar } from '@apollo/client'
import RNETextInput from '@components/atoms/inputs/rnetextinput/RNETextInput'
import { Profile, useUpdateOneProfileMutation } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { Box, Button, KeyboardAvoidingView, Text } from 'native-base'
import { useContext } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ThemeContext } from 'styled-components/native'

const DESCRIPTION_LENGTH = 250

//TODO FN(Update to change to detail information) mutation is broken here

const DescriptionScreen = () => {
	const themeContext = useContext(ThemeContext)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const {
		control,
		setError,
		handleSubmit,
		reset,
		formState: { dirtyFields, errors },
	} = useForm({
		defaultValues: {
			description: rAuthorizationVar.DeviceProfile.Profile.DetailInformation.description || '',
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})
	const [updateOneProfileMutation, { data, loading: UOPLoading }] = useUpdateOneProfileMutation({
		onCompleted: data => {
			if (data.updateOneProfile) {
				const Profile = data.updateOneProfile as Profile
				AuthorizationReactiveVar({
					...rAuthorizationVar,
					DeviceProfile: {
						...rAuthorizationVar.DeviceProfile,
						Profile,
					},
				})
				reset({
					description: data.updateOneProfile.DetailInformation.description,
				})
			} else {
				setError('description', { message: 'Couldnt update profile' })
			}
		},
	})

	const resetInput = (value: String) => {
		switch (value) {
			case 'description':
				reset({
					description: rAuthorizationVar.DeviceProfile.Profile.DetailInformation.description,
				})
			default:
				reset({
					description: rAuthorizationVar.DeviceProfile.Profile.DetailInformation.description,
				})
		}
	}

	const onSubmit = data => {
		if (dirtyFields.description) {
			updateOneProfileMutation({
				variables: {
					where: {
						id: rAuthorizationVar.DeviceProfile.Profile.id,
					},
					data: {
						DetailInformation: {
							update: {
								description: {
									set: data.description,
								},
							},
						},
					},
				},
			})
		}
	}

	return (
		<KeyboardAvoidingView
			flexDir={'column'}
			justifyContent={'space-between'}
			alignItems={'center'}
			my={'20px'}
		>
			<KeyboardAwareScrollView
				keyboardDismissMode='none'
				keyboardShouldPersistTaps={'always'}
				extraScrollHeight={0}
				style={{ width: '100%', height: '100%' }}
			>
				<Controller
					name='description'
					control={control}
					rules={{
						required: true,
						validate: {
							maxLength: value =>
								value.length <= DESCRIPTION_LENGTH || 'Description must be less than 200 characters',
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<KeyboardAvoidingView
							flexDir={'column'}
							alignItems={'flex-start'}
							height={'100%'}
							width={'100%'}
						>
							<RNETextInput
								multiline={true}
								maxLength={DESCRIPTION_LENGTH}
								onBlur={onBlur}
								onChange={onChange}
								value={value}
								blurOnSubmit={false}
								onSubmitEditing={handleSubmit(onSubmit)}
								autoFocus
								placeholder='Write a description about yourself'
								returnKeyType='done'
								autoCapitalize='none'
								autoCompleteType='off'
								keyboardType='default'
								containerStyle={{
									alignSelf: 'center',
									borderColor: 'black',
									borderBottomWidth: 1,
								}}
								inputStyle={{
									// backgroundColor: themeContext.palette.secondary.background,
									padding: 5,
									borderRadius: 13,
								}}
								inputContainerStyle={{ borderBottomColor: 'transparent', borderBottomWidth: 0 }}
								errorMessage={errors?.description?.message}
							/>
							<Box
								flexDir={'row'}
								justifyContent={'space-between'}
								alignItems={'center'}
								width={'100%'}
								padding={'10px'}
								minHeight={'70px'}
							>
								<Text mx={3} alignSelf={'center'}>
									{value.length} /{DESCRIPTION_LENGTH}
								</Text>
								{(dirtyFields.description || !!errors.description) && (
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
										my={5}
										size={'lg'}
									>
										Update
									</Button>
								)}
							</Box>
						</KeyboardAvoidingView>
					)}
				/>
			</KeyboardAwareScrollView>
		</KeyboardAvoidingView>
	)
}

export default DescriptionScreen
