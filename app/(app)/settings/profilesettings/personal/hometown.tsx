import { useReactiveVar } from '@apollo/client'
import { AuthorizationReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Input } from 'native-base'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { ThemeContext } from 'styled-components/native'

interface HomeTownScreenProps {}

export default ({}: HomeTownScreenProps) => {
	const themeContext = useContext(ThemeContext)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const colorScheme = useThemeColorScheme()
	const [search, setSearch] = useState<string>('')

	const {
		control,
		setError,
		handleSubmit,
		reset,
		formState: { dirtyFields, errors },
	} = useForm({
		defaultValues: {
			lookfor: rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.lookfor,
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	return (
		<View>
			<Input
				placeholder='Search...'
				onChangeText={(text: string) => setSearch(text)}
				keyboardAppearance={colorScheme}
				// platform='ios'
				value={search}
				style={{
					backgroundColor: 'transparent',
					width: '95%',
					alignSelf: 'center',
					paddingHorizontal: 10,
				}}
				_input={{
					color: themeContext.palette.primary.color.default,
					backgroundColor: themeContext.palette.secondary.background.default,
					borderBottomColor: 'transparent',
					borderRadius: 14,
				}}
			/>
		</View>
	)
}
