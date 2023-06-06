import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import {
	useUpdateProfileIdentifiableInformationMutation,
	Profile,
	AuthorizationDeviceManager,
	AuthorizationDeviceProfile,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Box, Input, KeyboardAvoidingView, Text, Icon, Button } from 'native-base'
import { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View, Pressable, ActivityIndicator, ScrollView } from 'react-native'
import { ThemeContext } from 'styled-components/native'

interface GenderScreenProps {}

const genderlist = [
	{
		gender: 'female',
	},
	{
		gender: 'male',
	},
]

export default ({}: GenderScreenProps) => {
	const themeContext = useContext(ThemeContext)
	const colorScheme = useThemeColorScheme()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const [
		updateProfileIdentifiableInfmationMutation,
		{ data: UPIIData, loading: UPIILoading, error: UPIIError },
	] = useUpdateProfileIdentifiableInformationMutation({
		variables: {
			data: {
				gender: {
					set: rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.gender,
				},
			},
		},
		onCompleted: data => {
			if (
				data &&
				data.updateProfileIdentifiableInformation.__typename === 'AuthorizationDeviceManager'
			) {
				const profile = data.updateProfileIdentifiableInformation as Profile
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
					gender: String(
						data?.updateProfileIdentifiableInformation.DeviceProfile?.Profile?.IdentifiableInformation
							?.gender,
					),
				})
			}
			if (data.updateProfileIdentifiableInformation.__typename === 'Error') {
				setError('gender', { message: data.updateProfileIdentifiableInformation.message })
			}
		},
	})

	const {
		control,
		setError,
		handleSubmit,
		reset,
		formState: { dirtyFields, errors },
	} = useForm({
		defaultValues: {
			gender: rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.gender || '',
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const onSubmit = data => {
		if (dirtyFields.gender) {
			updateProfileIdentifiableInfmationMutation({
				variables: {
					data: {
						gender: {
							set: data.gender,
						},
					},
				},
			})
		}
	}

	return (
		<ScrollView>
			<Controller
				name='gender'
				control={control}
				rules={{
					required: true,
					validate: {
						// maxLength: (value) => value.trim().split(/\s+/).length <= 200 || 'Description must be less than 200 characters'
					},
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<>
						<View style={{ alignItems: 'center' }}>
							{genderlist.map((item, i) => (
								<Pressable
									key={i}
									onPress={() => onChange(item.gender)}
									style={{
										width: '95%',
										padding: 15,
										marginVertical: 5,
										height: 55,
										borderColor: 'transparent',
										borderRadius: 25,
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-between',
									}}
								>
									<Text>{item.gender}</Text>
									{value === item.gender && <Icon as={Ionicons} name='checkmark-sharp' size={25} />}
								</Pressable>
							))}
						</View>
						<KeyboardAvoidingView
							flexDirection={'column'}
							alignItems={'flex-start'}
							height={'100%'}
							width={'100%'}
						>
							<Input
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								keyboardAppearance={colorScheme}
								blurOnSubmit={false}
								onSubmitEditing={handleSubmit(onSubmit)}
								autoFocus
								placeholder='Gender....'
								returnKeyType='done'
								autoCapitalize='none'
								autoComplete='off'
								keyboardType='default'
								fontSize={'md'}
								p={4}
								borderRadius={'md'}
								rightElement={
									<Box ml={3}>
										{UPIILoading && dirtyFields.gender ? (
											<ActivityIndicator size='small' color={themeContext.palette.primary.color.default} />
										) : (
											dirtyFields.gender && (
												<Pressable onPress={() => reset()}>
													<Text>Reset</Text>
												</Pressable>
											)
										)}
									</Box>
								}
							/>
							<Text>{errors?.gender?.message}</Text>
							<Box
								flexDir={'row'}
								justifyContent={'space-between'}
								alignItems={'center'}
								width={'100%'}
								padding={'10px'}
								minHeight={'70px'}
							>
								<Text style={{ alignSelf: 'center', marginHorizontal: 10 }}>ERROR GOES HERE</Text>
								{(dirtyFields.gender || !!errors.gender) && (
									<Button
										disabled={false}
										onPress={handleSubmit(onSubmit)}
										borderRadius={'md'}
										_dark={{
											bg: 'dark.500',
										}}
										_light={{
											bg: 'light.500',
										}}
										px={'30px'}
										style={{
											alignSelf: 'center',
										}}
									>
										Update
									</Button>
								)}
							</Box>
						</KeyboardAvoidingView>
					</>
				)}
			/>
		</ScrollView>
	)
}
