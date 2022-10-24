import { Key } from 'react'
import {
	KeyboardType,
	ReturnKeyType,
	TextInputAndroidProps,
	TextInputIOSProps,
	TextInputProps,
	ViewProps,
} from 'react-native'
import styled from 'styled-components/native'

const TextInputStyle = styled.TextInput``

export interface InputProps {
	keyProp?: Key | null
	onChange: (value: string) => void
	onSubmitEditing: () => void
	onBlur: () => void
	value: string
	blurOnSubmit: boolean
	autoCorrect?: boolean
	placeholder: string
	textContentType: TextInputIOSProps['textContentType']
	returnKeyType?: ReturnKeyType
	autoCompleteType?: TextInputAndroidProps['autoCompleteType']
	keyboardType?: KeyboardType
	numberOfLines: number
	style?: ViewProps
	autoCapitalize?: TextInputProps['autoCapitalize']
	autoFocus?: boolean
	ref?: any
	secureTextEntry?: boolean
}

const TextInput = ({
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
	style,
	autoCapitalize,
	autoFocus,
	ref,
	secureTextEntry,
}: InputProps) => {
	TextInput.defaultProps = {
		keyProp: 'TextInput',
		keyboardType: 'default',
		returnKeyType: 'done',
		autoFocus: true,
		autoCapitalize: 'characters',
		autoCompleteType: 'off',
		autoCorrect: true,
		numberOfLines: 1,
		blurOnSubmit: true,
		secureTextEntry: false,
		placeholder: 'Bafriends Input',
	}

	return (
		<TextInputStyle
			ref={ref}
			key={keyProp}
			style={style}
			textContentType={textContentType}
			autoCompleteType={autoCompleteType}
			placeholder={placeholder}
			autoCorrect={autoCorrect}
			secureTextEntry={secureTextEntry}
			autoFocus={autoFocus}
			returnKeyType={returnKeyType}
			numberOfLines={numberOfLines}
			keyboardType={keyboardType}
			autoCapitalize={autoCapitalize}
			onChangeText={value => onChange(value)}
			onSubmitEditing={() => onSubmitEditing}
			onBlur={onBlur}
			value={value}
			blurOnSubmit={blurOnSubmit}
		/>
	)
}

export default TextInput
