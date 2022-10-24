import { Input, IconNode } from '@rneui/themed'
import { Key, Ref } from 'react'
import * as React from 'react'
import {
	KeyboardType,
	ReturnKeyType,
	StyleProp,
	TextInputAndroidProps,
	TextInputIOSProps,
	TextInputProps,
	TextProps,
	TextStyle,
	ViewStyle,
	Platform,
} from 'react-native'
import styled from 'styled-components/native'

const RNETextInputStyle = styled(Input)`
	color: ${props => props.theme.palette.primary.color.primary};
	font-size: 20px;
	/* line-height: 20px; */
	font-weight: 500;
`

export interface RNEInputProps {
	keyProp?: Key | null
	onChange?: (value: string) => void
	onChangeText?: (value: string) => void
	onSubmitEditing: () => void
	onBlur: () => void
	value: string
	blurOnSubmit: boolean
	autoCorrect?: boolean
	placeholder: string
	textContentType?: TextInputIOSProps['textContentType']
	returnKeyType?: ReturnKeyType
	autoCompleteType?: TextInputAndroidProps['autoCompleteType']
	keyboardType?: KeyboardType
	numberOfLines?: number
	autoCapitalize?: TextInputProps['autoCapitalize']
	autoFocus?: boolean
	refChild?: Ref<typeof Input>
	secureTextEntry?: boolean
	renderErrorMessage?: boolean
	inputStyle?: StyleProp<TextStyle>
	errorProps?: TextProps
	errorMessage?: string
	errorStyle?: StyleProp<TextStyle>
	disabledInputStyle?: StyleProp<TextStyle>
	rightIcon?: IconNode
	leftIcon?: IconNode
	leftIconContainerStyle?: StyleProp<ViewStyle>
	rightIconContainerStyle?: StyleProp<ViewStyle>
	containerStyle?: StyleProp<ViewStyle>
	inputContainerStyle?: StyleProp<ViewStyle>
	dataDetectorTypes?: TextInputProps['dataDetectorTypes']
	importantForAutofill?: TextInputProps['importantForAutofill']
	inputAccessoryViewID?: string
	disabled?: boolean
	multiline?: boolean
	maxLength?: number
}
const RNETextInput: React.FC<RNEInputProps> = ({
	refChild,
	onChange,
	onSubmitEditing,
	onBlur,
	value,
	autoCorrect,
	keyProp,
	textContentType,
	returnKeyType,
	blurOnSubmit,
	autoCompleteType,
	placeholder,
	keyboardType,
	numberOfLines,
	autoCapitalize,
	autoFocus,
	secureTextEntry,
	containerStyle,
	inputContainerStyle,
	inputStyle,
	disabledInputStyle,
	errorMessage,
	errorStyle,
	rightIcon,
	leftIcon,
	leftIconContainerStyle,
	rightIconContainerStyle,
	renderErrorMessage,
	errorProps,
	dataDetectorTypes,
	importantForAutofill,
	inputAccessoryViewID,
	disabled,
	multiline,
	maxLength,
}: RNEInputProps) => {
	RNETextInput.defaultProps = {
		keyProp: 'RNETextInput',
		keyboardType: 'default',
		maxLength: undefined,
		returnKeyType: Platform.OS === 'ios' ? 'done' : 'none',
		autoFocus: false,
		autoCapitalize: 'characters',
		autoCompleteType: 'off',
		autoCorrect: true,
		numberOfLines: 1,
		blurOnSubmit: true,
		secureTextEntry: false,
		placeholder: 'Bafriends Input',
		errorMessage: '',
		multiline: false,
	}

	return (
		<RNETextInputStyle
			ref={refChild}
			key={keyProp}
			textContentType={textContentType}
			autoCompleteType={autoCompleteType}
			multiline={multiline}
			maxLength={maxLength}
			placeholder={placeholder}
			autoCorrect={autoCorrect}
			secureTextEntry={secureTextEntry}
			autoFocus={autoFocus}
			returnKeyType={returnKeyType}
			numberOfLines={numberOfLines}
			keyboardType={keyboardType}
			renderErrorMessage={renderErrorMessage}
			autoCapitalize={autoCapitalize}
			onChangeText={value => onChange(value)}
			onSubmitEditing={onSubmitEditing}
			importantForAutofill={importantForAutofill}
			onBlur={onBlur}
			value={value}
			disabled={disabled}
			inputAccessoryViewID={inputAccessoryViewID}
			blurOnSubmit={blurOnSubmit}
			containerStyle={containerStyle}
			inputContainerStyle={inputContainerStyle}
			inputStyle={inputStyle}
			disabledInputStyle={disabledInputStyle}
			dataDetectorTypes={dataDetectorTypes}
			errorProps={errorProps}
			errorMessage={errorMessage}
			errorStyle={errorStyle}
			rightIcon={rightIcon}
			leftIcon={leftIcon}
			leftIconContainerStyle={leftIconContainerStyle}
			rightIconContainerStyle={rightIconContainerStyle}
		/>
	)
}

export default RNETextInput
