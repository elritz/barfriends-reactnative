import { useReactiveVar } from '@apollo/client'
import { Profile, useUpdateProfileIdentifiableInformationMutation } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { Button, Icon } from '@rneui/themed'
import { Text } from 'native-base'
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
				const Profile = data.updateProfileIdentifiableInformation as Profile
				AuthorizationReactiveVar({
					...rAuthorizationVar,
					DeviceProfile: {
						...rAuthorizationVar.DeviceProfile,
						Profile,
					},
				})
				reset({ lookfor: data.updateProfileIdentifiableInformation.IdentifiableInformation.lookfor })
			}
			if (data.updateProfileIdentifiableInformation.__typename === 'ErrorProfiling') {
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

	const onSubmit = data => {
		if (dirtyFields.lookfor) {
			updateProfileIdentifiableInfmationMutation({
				variables: {
					where: {
						profileId: rAuthorizationVar.DeviceProfile.Profile.id,
					},
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
												backgroundColor: themeContext.palette.secondary.background,
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
											{(rAuthorizationVar.DeviceProfile.Profile.IdentifiableInformation.lookfor === item ||
												value === item) && <Icon type='ionicon' name='checkmark-sharp' size={25} />}
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
						backgroundColor: themeContext.palette.secondary.background,
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
						buttonStyle={{
							borderRadius: 14,
							backgroundColor: themeContext.palette.bfscompany.primary,
							paddingHorizontal: 30,
						}}
						containerStyle={{
							alignSelf: 'center',
						}}
						title='Update'
					/>
				</SafeAreaView>
			)}
		</SafeAreaView>
	)
}

export default LookingForScreen
