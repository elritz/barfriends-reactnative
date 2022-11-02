import { useReactiveVar } from '@apollo/client'
import GenerateCountryData from '@helpers/generate/placeholder/GenerateCountryData'
import { useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Input } from 'native-base'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { ThemeContext } from 'styled-components/native'

interface HomeTownScreenProps {}
const data = GenerateCountryData()

const HomeTownScreen = ({}: HomeTownScreenProps) => {
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const [search, setSearch] = useState<string>('')
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const handleLocationPermissionNavigation = async () => {
		navigation.navigate('PermissionNavigator', {
			screen: 'ForegroundLocationPermissionScreen',
		})
	}

	const {
		control,
		setError,
		handleSubmit,
		reset,
		formState: { dirtyFields, errors },
	} = useForm({
		defaultValues: {
			lookfor: rAuthorizationVar.DeviceProfile.Profile.IdentifiableInformation.lookfor,
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
				// platform='ios'
				value={search}
				style={{
					backgroundColor: 'transparent',
					width: '95%',
					alignSelf: 'center',
					paddingHorizontal: 10,
				}}
				_input={{
					color: themeContext.palette.primary.color.primary,
					backgroundColor: themeContext.palette.secondary.background,
					borderBottomColor: 'transparent',
					borderRadius: 14,
				}}
			/>
		</View>
	)
}

export default HomeTownScreen
