import { useReactiveVar } from '@apollo/client'
import { Box, Heading, Text, VStack } from '@components/core'
import { Feather } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useRouter } from 'expo-router'
import { Input, Button, Icon, IInputProps } from 'native-base'
import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputAccessoryView, Platform, View } from 'react-native'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import Reanimated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const INPUT_ACCESSORY_VIEW_ID = 'n-1298187263'
	const router = useRouter()
	const isFocused = useIsFocused()
	const { bottom } = useSafeAreaInsets()
	const colorScheme = useThemeColorScheme()
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const _firstnameRef = useRef<IInputProps | null>(null)
	const _lastnameRef = useRef(null)

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
		formState: { errors },
		setError,
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			firstname: '',
			lastname: '',
		},
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const onSubmit = (data: any) => {
		if (!data.firstname) {
			setError('firstname', {
				message: 'You need to enter a first name',
			})
		}
		if (!data.lastname) {
			setError('firstname', {
				message: 'You need to enter a last name',
			})
		}
		CredentialPersonalProfileReactiveVar({
			...credentialPersonalProfileVar,
			firstname: data.firstname,
			lastname: data.lastname,
		})
		router.push({
			pathname: '(app)/credential/personalcredentialstack/username',
		})
	}

	const InnerContent = () => {
		return (
			<Box
				flexDirection={'row'}
				justifyContent={'flex-end'}
				alignItems={'center'}
				sx={{
					h: 90,
				}}
				px={'$2'}
			>
				<Button
					onPress={handleSubmit(onSubmit)}
					disabled={!!errors.firstname || !!errors.lastname}
					borderRadius={'full'}
					style={{
						justifyContent: 'center',
						height: 50,
						width: 50,
						alignSelf: 'center',
					}}
					rightIcon={
						<Icon
							as={Feather}
							name='arrow-right'
							size={'xl'}
							color={errors.firstname || errors.lastname ? 'primary.700' : 'white'}
						/>
					}
				/>
			</Box>
		)
	}

	return (
		<Box flex={1}>
			<Reanimated.View style={{ flex: 1, marginHorizontal: 15 }}>
				<Heading mt={'$4'} fontWeight={'$black'} fontSize={'$3xl'}>
					Enter your name
				</Heading>
				<VStack space={'md'} style={{ marginVertical: '10%' }}>
					<Controller
						name='firstname'
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								ref={_firstnameRef}
								keyboardAppearance={colorScheme}
								key={'name'}
								variant={'underlined'}
								returnKeyType='next'
								textContentType='givenName'
								autoComplete={'name-given'}
								autoCapitalize={'none'}
								keyboardType='default'
								numberOfLines={1}
								autoFocus
								placeholder='First name'
								inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
								py={1}
								_input={{
									fontSize: '2xl',
									fontWeight: 'medium',
								}}
								size={'lg'}
								onSubmitEditing={() => _lastnameRef?.current?.focus()}
								onBlur={onBlur}
								blurOnSubmit={false}
								onChangeText={onChange}
								value={value.toLowerCase()}
							/>
						)}
						rules={{
							required: {
								value: true,
								message: 'Your lastname is required to continue.',
							},
						}}
					/>
					<Text>{errors?.firstname?.message}</Text>

					<Controller
						name='lastname'
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								keyboardAppearance={colorScheme}
								key={'name'}
								ref={_lastnameRef}
								variant={'underlined'}
								returnKeyType='done'
								textContentType='familyName'
								autoComplete={'name-family'}
								autoCapitalize={'none'}
								keyboardType='default'
								blurOnSubmit={false}
								numberOfLines={1}
								placeholder='Last name'
								inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
								py={1}
								_input={{
									fontSize: '2xl',
									fontWeight: 'medium',
								}}
								size={'lg'}
								onSubmitEditing={handleSubmit(onSubmit)}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value.toLowerCase()}
							/>
						)}
						rules={{
							required: {
								value: true,
								message: 'Your first name is required to continue.',
							},
						}}
					/>
					<Text>{errors?.firstname?.message}</Text>
				</VStack>
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
