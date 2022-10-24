import { useReactiveVar } from '@apollo/client'
import RNETextInput from '@components/atoms/inputs/rnetextinput/RNETextInput'
import RNEText500 from '@components/atoms/typography/RNETypography/text/RNEText500'
import { useUpdateProfileIdentifiableInformationMutation, Profile } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { Icon, Button } from '@rneui/themed'
import { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View, Pressable, ActivityIndicator, ScrollView } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'

interface GenderScreenProps {}

const genderlist = [
	{
		gender: 'female',
	},
	{
		gender: 'male',
	},
]

const GenderScreen = ({}: GenderScreenProps) => {
	const themeContext = useContext(ThemeContext)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const [
		updateProfileIdentifiableInfmationMutation,
		{ data: UPIIData, loading: UPIILoading, error: UPIIError },
	] = useUpdateProfileIdentifiableInformationMutation({
		variables: {
			where: {
				profileId: rAuthorizationVar.DeviceProfile.Profile.id,
			},
			data: {
				gender: {
					set: rAuthorizationVar.DeviceProfile.Profile.IdentifiableInformation.gender,
				},
			},
		},
		onCompleted: data => {
			if (data.updateProfileIdentifiableInformation.__typename === 'Profile') {
				const Profile = data.updateProfileIdentifiableInformation as Profile
				AuthorizationReactiveVar({
					...rAuthorizationVar,
					DeviceProfile: {
						...rAuthorizationVar.DeviceProfile,
						Profile,
					},
				})
				reset({ gender: data.updateProfileIdentifiableInformation.IdentifiableInformation.gender })
			}
			if (data.updateProfileIdentifiableInformation.__typename === 'ErrorProfiling') {
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
			gender: rAuthorizationVar.DeviceProfile.Profile.IdentifiableInformation.gender || '',
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
					where: {
						profileId: rAuthorizationVar.DeviceProfile.Profile.id,
					},
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
										backgroundColor: themeContext.palette.secondary.background,
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
									<RNEText500>{item.gender}</RNEText500>
									{value === item.gender && <Icon type='ionicon' name='checkmark-sharp' size={25} />}
								</Pressable>
							))}
						</View>
						<InputView>
							<RNETextInput
								onBlur={onBlur}
								onChange={onChange}
								value={value}
								blurOnSubmit={false}
								onSubmitEditing={handleSubmit(onSubmit)}
								autoFocus
								placeholder='Gender....'
								returnKeyType='done'
								autoCapitalize='none'
								autoCompleteType='off'
								keyboardType='default'
								containerStyle={{
									alignSelf: 'center',
								}}
								rightIconContainerStyle={{
									marginLeft: 10,
								}}
								rightIcon={
									UPIILoading && dirtyFields.gender ? (
										<ActivityIndicator size='small' color={themeContext.palette.primary.color.primary} />
									) : (
										dirtyFields.gender && (
											<Pressable onPress={reset()}>
												<RNEText500>Reset</RNEText500>
											</Pressable>
										)
									)
								}
								inputStyle={{
									backgroundColor: themeContext.palette.secondary.background,
									height: 55,
									padding: 10,
									borderRadius: 15,
								}}
								inputContainerStyle={{
									borderBottomColor: 'transparent',
									borderBottomWidth: 0,
									marginVertical: 10,
								}}
								errorMessage={errors?.gender?.message}
							/>
							<FooterView>
								<RNEText500 style={{ alignSelf: 'center', marginHorizontal: 10 }}></RNEText500>
								{(dirtyFields.gender || !!errors.gender) && (
									<Button
										disabled={false}
										onPress={handleSubmit(onSubmit)}
										buttonStyle={{
											borderRadius: 14,
											backgroundColor: themeContext.palette.bfscompany.primary,
											paddingHorizontal: 30,
										}}
										containerStyle={{
											alignSelf: 'center',
										}}
										title='Update'
									/>
								)}
							</FooterView>
						</InputView>
					</>
				)}
			/>
		</ScrollView>
	)
}

export default GenderScreen

const FooterView = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 10px;
	min-height: 70px;
`

const InputView = styled.KeyboardAvoidingView`
	flex-direction: column;
	align-items: flex-start;
	height: 100%;
	width: 100%;
`
