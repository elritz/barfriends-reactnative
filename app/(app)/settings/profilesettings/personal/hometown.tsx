import { useReactiveVar } from '@apollo/client'
import { AuthorizationReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Input, useTheme } from 'native-base'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'

interface HomeTownScreenProps {}

export default ({}: HomeTownScreenProps) => {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const colorScheme = useThemeColorScheme()
	const theme = useTheme()
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
					color: colorScheme === 'light' ? theme.colors.light[900] : theme.colors.dark[900],
					backgroundColor: colorScheme === 'light' ? theme.colors.light[100] : theme.colors.dark[100],
					borderBottomColor: 'transparent',
					borderRadius: 14,
				}}
			/>
		</View>
	)
}
