import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Input, Icon, Box } from 'native-base'
import { useController, UseControllerProps, useFormContext } from 'react-hook-form'
import { TextInputProps as RNTextInputProps } from 'react-native'

export interface TextInputProps extends RNTextInputProps, UseControllerProps {
	label: string
	defaultValue?: string //ADD DEFAULT VALUE TO PROPS
}

const ControlledInput = (props: TextInputProps) => {
	const navigation = useNavigation()
	const colorScheme = useThemeColorScheme()
	const { name, label, rules, defaultValue, ...inputProps } = props
	const { field } = useController({ name, rules, defaultValue })

	return (
		<Input
			placeholder={props.placeholder}
			autoFocus
			onChangeText={field.onChange}
			keyboardAppearance={colorScheme}
			variant={'filled'}
			rounded={'lg'}
			size={'xl'}
			mx={2}
			py={4}
			onBlur={field.onBlur}
			value={field.value}
			{...inputProps}
			returnKeyType='done'
			underlineColorAndroid='transparent'
			leftElement={[
				<Icon
					as={Ionicons}
					name='chevron-back'
					size={'lg'}
					ml={2}
					onPress={() => {
						navigation.goBack()
					}}
				/>,
				<Icon as={Ionicons} name='ios-search' size={'lg'} ml={2} />,
			]}
			rightElement={
				field.value.length && (
					<Icon
						as={Ionicons}
						name='close-circle'
						size={'lg'}
						mr={3}
						onPress={() => {
							field.onChange('')
						}}
					/>
				)
			}
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
