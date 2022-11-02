import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Input, Icon } from 'native-base'
import { useContext } from 'react'
import { useController, UseControllerProps, useFormContext } from 'react-hook-form'
import { TextInputProps as RNTextInputProps } from 'react-native'
import { ThemeContext } from 'styled-components/native'

export interface TextInputProps extends RNTextInputProps, UseControllerProps {
	label: string
	defaultValue?: string //ADD DEFAULT VALUE TO PROPS
}

const ControlledInput = (props: TextInputProps) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const { watch, reset } = useFormContext()

	const { name, label, rules, defaultValue, ...inputProps } = props

	const { field } = useController({ name, rules, defaultValue })

	return (
		<Input
			placeholder={props.placeholder}
			autoFocus
			onChangeText={field.onChange}
			// onClear={() => field.onChange}
			onBlur={field.onBlur}
			value={field.value}
			{...inputProps}
			returnKeyType='done'
			underlineColorAndroid='transparent'
			leftElement={<Icon as={Ionicons} name='ios-search' size={20} />}
			// onCancel={() => {
			// 	reset()
			// 	navigation.dispatch(StackActions.popToTop())
			// }}
			style={{
				alignSelf: 'center',
				borderBottomColor: 'transparent',
				paddingHorizontal: 5,
				borderRadius: 14,
				height: 50,
			}}
		/>
	)
}

export default ControlledInput
