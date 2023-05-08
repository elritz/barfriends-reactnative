import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import {
	AuthorizationDeviceManager,
	ClientDeviceProfile,
	Profile,
	useUpdateProfileIdentifiableInformationMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { Text, Button, Icon } from 'native-base'
import { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, View, ScrollView, SafeAreaView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeContext } from 'styled-components/native'

interface LookingForScreenProps {}

const relationshipstatuslist = [
	'Single',
	'In a relationship',
	'Engaged',
	'Married',
	'In a civil union',
	'In a domestic partnership',
	'In an open relationship',
	"It's complicated",
	'Separated',
	'Divorced',
	'Widowed',
]

const LookingForScreen = ({}) => {
	const insets = useSafeAreaInsets()
	const themeContext = useContext(ThemeContext)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const [
		updateProfileIdentifiableInfmationMutation,
		{ data: UPIIData, loading: UPIILoading, error: UPIIError },
	] = useUpdateProfileIdentifiableInformationMutation({
		onCompleted: data => {
			if (data.updateProfileIdentifiableInformation.__typename === 'Profile') {
				const profile = data.updateProfileIdentifiableInformation as Profile
				const deviceManager = rAuthorizationVar as AuthorizationDeviceManager
				const deviceprofile = rAuthorizationVar?.DeviceProfile as ClientDeviceProfile

				AuthorizationReactiveVar({
					...deviceManager,
					DeviceProfile: {
						...deviceprofile,
						Profile: profile,
					},
				})
				reset({ lookfor: data.updateProfileIdentifiableInformation.IdentifiableInformation?.lookfor })
			}
			if (data.updateProfileIdentifiableInformation.__typename === 'Error') {
				setError('lookfor', { message: data.updateProfileIdentifiableInformation.message })
			}
		},
	})

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

	const onSubmit = data => {
		if (dirtyFields.lookfor) {
			updateProfileIdentifiableInfmationMutation({
				variables: {
					data: {
						lookfor: {
							set: data.lookfor,
						},
					},
				},
			})
		}
	}

	return (
		<SafeAreaView>
			<ScrollView>
				<View style={{ alignItems: 'center' }}>
					<Controller
						name='lookfor'
						control={control}
						rules={{
							required: true,
							validate: {},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<>
								{relationshipstatuslist.map((item, i) => {
									return (
										<Pressable
											key={i}
											onPress={() => onChange(item)}
											style={{
												backgroundColor: themeContext.palette.secondary.background.default,
												width: '95%',
												padding: 15,
												marginVertical: 5,
												height: 55,
												borderColor: 'transparent',
												borderRadius: 25,
												flexDirection: 'row',
												alignItems: 'center',
												justifyContent: 'space-between',
											}}
										>
											<Text>{item}</Text>
											{(rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.lookfor === item ||
												value === item) && <Icon as={Ionicons} name='checkmark-sharp' size={25} />}
										</Pressable>
									)
								})}
							</>
						)}
					/>
				</View>
			</ScrollView>
			{(dirtyFields.lookfor || !!errors.lookfor) && (
				<SafeAreaView
					style={{
						paddingHorizontal: 10,
						paddingBottom: insets.bottom,
						backgroundColor: themeContext.palette.secondary.background.default,
						position: 'absolute',
						bottom: 0,
						flexDirection: 'row',
						justifyContent: 'space-between',
						padding: 10,
						alignItems: 'center',
						width: '100%',
						minHeight: 90,
					}}
				>
					<Text alignSelf={'center'}></Text>

					<Button
						disabled={false}
						onPress={handleSubmit(onSubmit)}
						borderRadius={14}
						bg={themeContext.palette.bfscompany.primary}
						px={'30px'}
						style={{
							alignSelf: 'center',
						}}
					>
						Update
					</Button>
				</SafeAreaView>
			)}
		</SafeAreaView>
	)
}

export default LookingForScreen
