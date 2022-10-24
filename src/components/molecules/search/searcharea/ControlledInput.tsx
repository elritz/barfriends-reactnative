import { CommonActions, StackActions, useNavigation } from '@react-navigation/native'
import { SearchBar } from '@rneui/themed'
import { Icon } from '@rneui/themed'
import { Button, IconButton, Text } from 'native-base'
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
		<SearchBar
			placeholder={props.placeholder}
			platform='ios'
			autoFocus
			onChangeText={field.onChange}
			onClear={() => field.onChange}
			onBlur={field.onBlur}
			value={field.value}
			{...inputProps}
			cancelButtonTitle={watch('done') ? 'Done' : 'Cancel'}
			returnKeyType='done'
			underlineColorAndroid='transparent'
			searchIcon={
				<Icon
					type='ionicon'
					name='ios-search'
					size={20}
					color={themeContext.palette.primary.color.primary}
				/>
			}
			onCancel={() => {
				reset()
				navigation.dispatch(StackActions.popToTop())
			}}
			containerStyle={{
				backgroundColor: 'transparent',
				alignSelf: 'center',
			}}
			cancelButtonProps={{
				color: themeContext.palette.primary.color.primary,
			}}
			inputContainerStyle={{
				borderBottomColor: 'transparent',
				paddingHorizontal: 5,
				backgroundColor: themeContext.palette.secondary.background,
				borderRadius: 14,
				height: 50,
			}}
			inputStyle={{
				color: themeContext.palette.primary.color.primary,
			}}
		/>
	)
}

export default ControlledInput
