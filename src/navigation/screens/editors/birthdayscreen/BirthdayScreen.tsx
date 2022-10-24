import { useReactiveVar } from '@apollo/client'
import DatePicker from '@components/atoms/inputs/DatePicker'
import RNEText500 from '@components/atoms/typography/RNETypography/text/RNEText500'
import { Profile, useUpdateOneProfileMutation } from '@graphql/generated'
import diffNow from '@library/luxon'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import createDeviceTokenInSecureStorage from '@util/hooks/auth/useDeviceToken'
import { Button } from 'native-base'
import React, { useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'

const BirthdayScreen = () => {
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [legalAge] = useState<number>(19)

	const [updateOneProfilMutation, { data, loading: UOPLoading, error }] =
		useUpdateOneProfileMutation({
			onError: error => {
				setError('date', error)
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
				navigation.goBack()
				// reset({ date: data.updateOneProfile.IdentifiableInformation.birthday })
			},
		})

	const {
		control,
		setError,
		clearErrors,
		setValue,
		getValues,
		reset,
		handleSubmit,
		watch,
		formState: { isDirty, dirtyFields, errors },
	} = useForm({
		defaultValues: {
			date: new Date(rAuthorizationVar.DeviceProfile.Profile.IdentifiableInformation.birthday) || '',
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const validateDate1 = async (selectedDate: Date | undefined): Promise<boolean> => {
		if (!selectedDate) {
			return false
		}
		const { days, months, years } = diffNow(selectedDate)
		if (years === 0) {
			return false
		}
		return true
	}

	const validateDate2 = async (selectedDate: Date | undefined): Promise<boolean> => {
		if (!selectedDate) {
			return false
		}
		const { days, months, years } = diffNow(selectedDate)
		if (years + 1 === legalAge && months >= 11 && days >= 27) {
			const { success } = await createDeviceTokenInSecureStorage({
				birthday: selectedDate,
			})
			if (success) {
				return true
			}
		} else if (years < legalAge) {
			return false
		}
		return true
	}

	const onSubmit = (data: any) => {
		updateOneProfilMutation({
			variables: {
				where: {
					id: rAuthorizationVar.DeviceProfile.Profile.id,
				},
				data: {
					IdentifiableInformation: {
						update: {
							birthday: {
								set: data.date,
							},
						},
					},
				},
			},
		})
	}

	return (
		<OuterView>
			<>
				<Controller
					control={control}
					name='date'
					render={({ field: { value, onChange } }) => (
						<View style={{ width: '100%', height: '70%' }}>
							<DatePicker
								display='spinner'
								mode='date'
								value={value}
								maxDate={new Date()}
								onChange={(e, selectedDate) => onChange(selectedDate)}
								style={{
									width: '100%',
									height: '100%',
								}}
							/>
						</View>
					)}
					rules={{
						required: {
							value: true,
							message: 'Hey this is required 🤷‍♂️.',
						},
						validate: {
							validateYear1: async value => (await validateDate1(value)) || 'You must exsist to sign up.',
							validateYear2: async value =>
								(await validateDate2(value)) || `Must be closer to ${legalAge} to join.`,
						},
					}}
				/>
			</>
			<RNEText500>{errors.date && errors?.date.message}</RNEText500>
			<FormButtonView>
				{dirtyFields.date && (
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
			</FormButtonView>
		</OuterView>
	)
}

export default BirthdayScreen

const OuterView = styled.SafeAreaView`
	flex: 1;
	align-items: center;
	flex-direction: column;
	justify-content: space-between;
	margin-horizontal: 5%;
	margin-top: 20px;
`

const FormButtonView = styled.View`
	display: flex;
	justify-content: center;
	padding-vertical: 15px;
	width: 100%;
`
