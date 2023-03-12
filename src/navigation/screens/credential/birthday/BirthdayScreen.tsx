import { useReactiveVar } from '@apollo/client'
import DatePicker from '@components/atoms/inputs/DatePicker'
import { Feather } from '@expo/vector-icons'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar } from '@reactive'
import diffNow from '@util/@fn/luxon'
import createDeviceTokenInSecureStorage from '@util/hooks/auth/useDeviceToken'
import { IconButton, Text, Icon, Box } from 'native-base'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { SafeAreaView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const BirthdayScreen = () => {
	const insets = useSafeAreaInsets()
	const isFocused = useIsFocused()
	const navigation = useNavigation()
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const [legalAge] = useState<number>(19)

	const {
		control,
		setError,
		clearErrors,
		setValue,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			date: new Date(),
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const onDateChange = async (selectedDate: Date | undefined): Promise<boolean> => {
		setValue('date', selectedDate)
		if (selectedDate) {
			const { days, months, years } = diffNow(selectedDate)
			clearErrors('date')
			if (years === 0) {
				setError('date', {
					type: 'validate',
					message: 'You must exsist to sign up.',
				})
				return false
			} else if (years + 1 === legalAge && months >= 11 && days >= 27) {
				const { success } = await createDeviceTokenInSecureStorage({
					birthday: selectedDate,
				})
				if (success) {
					setValue('date', selectedDate)
					return true
				}
			} else if (years < legalAge) {
				setError('date', {
					type: 'validate',
					message: `Must be closer to ${legalAge} to join.`,
				})
				return false
			}
			setValue('date', selectedDate)
			return true
		}
	}

	const onSubmit = async (): Promise<void | null> => {
		try {
			if (errors.date) {
				setError('date', {
					type: 'validate',
					message: 'Enter a valid birthday',
				})
			}
			const birthday = getValues('date')
			CredentialPersonalProfileReactiveVar({
				...credentialPersonalProfileVar,
				birthday: String(birthday),
			})
			navigation.navigate('CredentialNavigator', {
				screen: 'PersonalCredentialStack',
				params: {
					screen: 'NameScreen',
				},
			})
		} catch (e) {
			return setError('date', {
				type: 'validate',
				message: 'Something went wrong',
			})
		}
	}

	useEffect(() => {
		if (!credentialPersonalProfileVar.birthday) {
			setError('date', { type: 'validate' })
		} else {
			setValue('date', new Date(credentialPersonalProfileVar.birthday))
		}
	}, [isFocused])

	return (
		<Box
			style={{
				flex: 1,
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'space-between',
				marginTop: 20,
			}}
		>
			<Text numberOfLines={2} mt={4} lineHeight={35} fontWeight={'black'} fontSize={'3xl'}>
				What's your birthday
			</Text>
			<>
				<Controller
					control={control}
					name='date'
					render={({ field: { value } }) => (
						<View style={{ width: '100%', height: '70%' }}>
							<DatePicker
								display='spinner'
								mode='date'
								value={value}
								maxDate={new Date()}
								onChange={(e, selectedDate) => onDateChange(selectedDate)}
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
							isOldEnough: value => onDateChange(value) || 'Must be less young to join.',
						},
					}}
				/>
				<Text color={'error.500'}>
					{errors.date && errors.date.type ? errors?.date?.message : null}
				</Text>
			</>
			<Box
				_light={{
					bg: 'light.100',
				}}
				_dark={{
					bg: 'dark.200',
				}}
				display={'flex'}
				flexDir={'row-reverse'}
				justifyContent={'space-between'}
				w={'100%'}
			>
				<Box mt={insets.bottom / 2} mb={insets.bottom}>
					<IconButton
						disabled={!!errors.date}
						onPress={handleSubmit(onSubmit)}
						variant={'solid'}
						color={'primary.500'}
						isDisabled={!!errors.date}
						h={70}
						w={70}
						mx={2}
						borderRadius={'full'}
						style={{
							justifyContent: 'center',
							borderRadius: 50,
							alignSelf: 'center',
						}}
						icon={
							<Icon
								as={Feather}
								name='arrow-right'
								size={'2xl'}
								color={errors.date ? 'light.800' : 'white'}
							/>
						}
					/>
				</Box>
			</Box>
		</Box>
	)
}

export default BirthdayScreen
