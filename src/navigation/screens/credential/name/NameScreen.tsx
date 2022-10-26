import { useReactiveVar } from '@apollo/client'
import RNETextInput from '@components/atoms/inputs/rnetextinput/RNETextInput'
import RNEHeading800 from '@components/atoms/typography/RNETypography/heading/RNEHeading800'
import { TAB_NAVIGATION_HEIGHT } from '@constants/ReactNavigationConstants'
import { useHeaderHeight } from '@react-navigation/elements'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar } from '@reactive'
import { Input as InputDist } from '@rneui/base/dist/Input'
import { Button, Icon } from '@rneui/themed'
import { Text } from 'native-base'
import React, { useContext, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputAccessoryView, Platform, View } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'

const NameScreen = () => {
	const isFocused = useIsFocused()
	const headerHeight = useHeaderHeight()
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const nameRef = useRef<InputDist | null>(null)

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

	const RightIcon = () => (
		<Icon
			type='feather'
			name='arrow-right'
			size={35}
			color={errors.name ? themeContext.palette.disabled.color.primary : 'white'}
		/>
	)

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
		<OuterView
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
							<RNETextInput
								refChild={nameRef}
								keyProp='name'
								onChange={onChange}
								onSubmitEditing={handleSubmit(onSubmit)}
								onBlur={onBlur}
								textContentType='name'
								value={value.toLowerCase()}
								autoFocus
								blurOnSubmit={false}
								placeholder='Name'
								returnKeyType='done'
								autoCompleteType='name'
								autoCapitalize='none'
								keyboardType='default'
								inputAccessoryViewID={inputAccessoryViewID}
								numberOfLines={1}
								errorMessage={errors?.name?.message}
							/>
						)}
						rules={{
							required: {
								value: true,
								message: 'Hey this is required 🤷‍♂️.',
							},
						}}
					/>
				</View>
			) : null}
			<InputAccessoryView nativeID={inputAccessoryViewID}>
				<InputAccessoryContainer style={{ justifyContent: 'flex-start' }}>
					<InputAccessoryInnerView />
					<Button
						onPress={handleSubmit(onSubmit)}
						disabled={!!errors.name}
						buttonStyle={{
							backgroundColor: errors.name
								? themeContext.palette.disabled.background
								: themeContext.palette.highlight.background.primary,
							borderRadius: 50,
							height: 70,
							width: 70,
							paddingHorizontal: 20,
							justifyContent: 'center',
						}}
						containerStyle={{
							justifyContent: 'center',
						}}
						iconPosition='right'
						icon={<RightIcon />}
					/>
				</InputAccessoryContainer>
			</InputAccessoryView>
		</OuterView>
	)
}

export default NameScreen

const OuterView = styled.KeyboardAvoidingView`
	flex: 1;
	height: auto;
	flex-direction: column;
	margin-horizontal: 5%;
`

const InputAccessoryInnerView = styled.View`
	flex: 2;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	padding-horizontal: 5px;
`

const InputAccessoryContainer = styled.View`
	background-color: ${props => props.theme.palette.background.paper};
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-content: space-around;
	height: 90px;
	padding-horizontal: 2.5%;
`
