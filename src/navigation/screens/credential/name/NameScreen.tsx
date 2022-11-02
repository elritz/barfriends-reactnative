import { useReactiveVar } from '@apollo/client'
import { TAB_NAVIGATION_HEIGHT } from '@constants/ReactNavigationConstants'
import { Feather } from '@expo/vector-icons'
import { useHeaderHeight } from '@react-navigation/elements'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar } from '@reactive'
import {
	Box,
	Input,
	KeyboardAvoidingView,
	Text,
	Button,
	Icon,
	IInputProps,
	useTheme,
} from 'native-base'
import React, { useContext, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputAccessoryView, Platform, View } from 'react-native'
import { ThemeContext } from 'styled-components/native'

const NameScreen = () => {
	const isFocused = useIsFocused()
	const headerHeight = useHeaderHeight()
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const theme = useTheme()
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const nameRef = useRef<IInputProps | null>(null)

	const inputAccessoryViewID = 'uniqueID2'
	const keyboardVerticalOffset =
		Platform.OS === 'ios' ? headerHeight + TAB_NAVIGATION_HEIGHT + 65 : 0

	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			name: '',
		},
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const onSubmit = (data: any) => {
		CredentialPersonalProfileReactiveVar({
			...credentialPersonalProfileVar,
			name: data.name,
		})

		navigation.navigate('CredentialNavigator', {
			screen: 'PersonalCredentialStack',
			params: {
				screen: 'UsernameScreen',
			},
		})
	}

	return (
		<KeyboardAvoidingView
			height={'auto'}
			flexDir={'column'}
			mx={'5%'}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={keyboardVerticalOffset}
		>
			<Text mt={4} lineHeight={35} fontWeight={'black'} fontSize={'3xl'}>
				Enter your name
			</Text>
			{isFocused ? (
				<View style={{ marginVertical: '10%', width: '100%' }}>
					<Controller
						name='name'
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								ref={nameRef}
								key={'name'}
								variant={'underlined'}
								returnKeyType='done'
								textContentType='name'
								autoComplete={'name'}
								autoCapitalize={'none'}
								keyboardType='default'
								numberOfLines={1}
								autoFocus
								placeholder='Mobile Number'
								inputAccessoryViewID={inputAccessoryViewID}
								py={4}
								_input={{
									fontSize: '2xl',
									fontWeight: 'medium',
								}}
								onSubmitEditing={handleSubmit(onSubmit)}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value.toLowerCase()}
							/>
						)}
						rules={{
							required: {
								value: true,
								message: 'Hey this is required 🤷‍♂️.',
							},
						}}
					/>
					<Text>{errors?.name?.message}</Text>
				</View>
			) : null}
			<InputAccessoryView nativeID={inputAccessoryViewID}>
				<Box
					flexDir={'row'}
					justifyContent={'flex-end'}
					alignContent={'space-around'}
					height={'90px'}
					px={'2.5%'}
				>
					<Button
						onPress={handleSubmit(onSubmit)}
						disabled={!!errors.name}
						style={{
							backgroundColor: errors.name ? theme.colors.gray[300] : theme.colors.primary[500],
							borderRadius: 50,
							height: 70,
							width: 70,
							paddingHorizontal: 20,
							justifyContent: 'center',
						}}
						rightIcon={
							<Icon
								as={Feather}
								name='arrow-right'
								size={35}
								color={errors.name ? theme.colors.gray[500] : 'white'}
							/>
						}
					/>
				</Box>
			</InputAccessoryView>
		</KeyboardAvoidingView>
	)
}

export default NameScreen
