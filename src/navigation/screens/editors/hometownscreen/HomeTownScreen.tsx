import { useReactiveVar } from '@apollo/client'
import GenerateCountryData from '@helpers/generate/placeholder/GenerateCountryData'
import { useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar, ForegroundLocationPermissionReactiveVar } from '@reactive'
import { SearchBar } from '@rneui/themed'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { View, Pressable } from 'react-native'
import { ThemeContext } from 'styled-components/native'

interface HomeTownScreenProps {}
const data = GenerateCountryData()

const HomeTownScreen = ({}: HomeTownScreenProps) => {
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const [search, setSearch] = useState<string>('')
	const rPermissionLocationVar = useReactiveVar(ForegroundLocationPermissionReactiveVar)
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
			<SearchBar
				placeholder='Search...'
				onChangeText={(text: string) => setSearch(text)}
				showCancel={false}
				platform='ios'
				value={search}
				containerStyle={{
					backgroundColor: 'transparent',
					width: '95%',
					alignSelf: 'center',
				}}
				cancelButtonProps={{
					color: themeContext.palette.primary.color.primary,
				}}
				inputContainerStyle={{
					backgroundColor: themeContext.palette.secondary.background,
					paddingHorizontal: 10,
					borderBottomColor: 'transparent',
					borderRadius: 14,
				}}
			/>
		</View>
	)
}

export default HomeTownScreen
