import { useReactiveVar } from '@apollo/client'
import { Feather } from '@expo/vector-icons'
import {
	ClientDeviceManager,
	ProfileType,
	useCreatePersonalProfileMutation,
	useEmojimoodsQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar, CredentialPersonalProfileReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { Text, Icon, Center, IconButton, Box, Image } from 'native-base'
import { useContext } from 'react'
import { FlatList, Pressable, SafeAreaView, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Defs, Ellipse, LinearGradient, Rect, Stop } from 'react-native-svg'
import { ThemeContext } from 'styled-components/native'

export default () => {
	const insets = useSafeAreaInsets()
	const window = useWindowDimensions()
	const router = useRouter()
	const themeContext = useContext(ThemeContext)
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const colorScheme = useThemeColorScheme()

	const [switchDeviceProfileMutation, { data: SDPData, loading: SDPLoading, error: SDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: data => {
				if (data.switchDeviceProfile.__typename === 'ClientDeviceManager') {
					const deviceManager = data.switchDeviceProfile as ClientDeviceManager
					AuthorizationReactiveVar(deviceManager)
					router.push({
						pathname: '(app)/hometab/venuefeedstack',
					})
				}
			},
		})

	const [createProfilePersonal, { loading }] = useCreatePersonalProfileMutation({
		variables: {
			data: {
				PrivacyPolicyId: String(credentialPersonalProfileVar.PrivacyId),
				ServicesId: String(credentialPersonalProfileVar.ServiceId),
				birthday: credentialPersonalProfileVar.birthday,
				password: String(credentialPersonalProfileVar.password),
				username: String(credentialPersonalProfileVar.username),
				fullname: credentialPersonalProfileVar.name,
				emojimood: String(credentialPersonalProfileVar.emojimood?.id),
				address: '',
				EmailInput: {
					email: credentialPersonalProfileVar.email,
				},
				PhoneInput: {
					...credentialPersonalProfileVar.phone,
				},
				photos: {
					data: [
						{
							url: String(credentialPersonalProfileVar?.photo?.url),
						},
					],
				},
			},
		},
		onCompleted: async data => {
			if (data.createPersonalProfile?.__typename === 'Profile') {
				switchDeviceProfileMutation({
					variables: {
						profileId: String(data?.createPersonalProfile.id),
						profileType: ProfileType.Personal,
					},
				})
			}
		},
	})

	const onSubmit = async () => {
		createProfilePersonal()
	}

	const onPressEmojimood = (item: any) => {
		CredentialPersonalProfileReactiveVar({
			...credentialPersonalProfileVar,
			emojimood: {
				...item,
			},
		})
	}

	const { data: emojiData, loading: emojiLoading, error: emojiError } = useEmojimoodsQuery()

	if (emojiLoading) return null

	return (
		<Box alignItems={'center'}>
			<Svg
				style={{
					position: 'absolute',
				}}
				width={window.width}
				height='100%'
			>
				<Defs>
					<LinearGradient id='grad' x1='1' y1='0' x2='1' y2='1'>
						<Stop
							offset='0.25'
							// stopColor={credentialPersonalProfileVar?.emojimood?.colors?[0] ? credentialPersonalProfileVar.emojimood.colors[0]: themeContext.palette.primary.background.default }
							stopColor={
								credentialPersonalProfileVar?.emojimood?.colors?.length
									? credentialPersonalProfileVar.emojimood.colors[0]
									: themeContext.palette.primary.background.default
							}
							stopOpacity='1'
						/>
						<Stop
							offset='1'
							stopColor={
								credentialPersonalProfileVar?.emojimood?.colors?.length
									? credentialPersonalProfileVar.emojimood.colors[1]
									: themeContext.palette.primary.background.default
							}
							stopOpacity='1'
						/>
					</LinearGradient>
				</Defs>
				<Rect height='100%' width={window.width} fill='url(#grad)' />
			</Svg>
			<FlatList
				style={{
					width: '100%',
					height: '100%',
				}}
				keyExtractor={item => item.id.toString()}
				onEndReachedThreshold={0.4}
				showsVerticalScrollIndicator={false}
				numColumns={3}
				contentInset={{ top: window.width + 20, bottom: 120, left: 0, right: 0 }}
				contentInsetAdjustmentBehavior='automatic'
				data={emojiData?.emojimoods}
				renderItem={({ item }: any) => {
					return (
						<Pressable onPress={() => onPressEmojimood(item)}>
							<Center>
								<Svg width={window.width / 3} height={window.width / 3}>
									<Defs>
										<LinearGradient id='grad' x1='1' y1='0' x2='1' y2='1'>
											<Stop offset='0' stopColor={item.colors[0]} stopOpacity='1' />
											<Stop offset='1' stopColor={item.colors[1]} stopOpacity='1' />
										</LinearGradient>
									</Defs>
									<Ellipse
										cx='50%'
										cy='50%'
										rx={window.width / 10}
										ry={window.width / 10}
										fill='url(#grad)'
										stroke={credentialPersonalProfileVar.emojimood?.id === item.id ? 'white' : '#FFFFFF00'}
										strokeWidth='2'
									/>
								</Svg>
								<Text
									style={{
										position: 'absolute',
									}}
									fontSize={'34'}
								>
									{item.emoji}
								</Text>
							</Center>
							<Text style={{ textAlign: 'center' }}>{item.name}</Text>
						</Pressable>
					)
				}}
			/>
			<BlurView
				tint={colorScheme}
				intensity={20}
				style={{
					position: 'absolute',
					top: 0,
					width: '100%',
					height: window.width / 1.05,
				}}
			/>
			<ExpoLinearGradient
				colors={[
					credentialPersonalProfileVar.emojimood?.colors?.length
						? credentialPersonalProfileVar?.emojimood.colors[0]
						: themeContext.palette.primary.background.default,
					'transparent',
				]}
				style={{
					top: 0,
					position: 'absolute',
					height: window.width,
					width: window.width,
				}}
			/>
			<Image
				style={{
					position: 'absolute',
					marginVertical: 20,
					borderRadius: 20,
					borderColor: credentialPersonalProfileVar.emojimood?.colors?.length
						? credentialPersonalProfileVar.emojimood.colors[0]
						: 'transparent',
					borderWidth: 2,
				}}
				height={window.width / 1.2}
				width={window.width / 1.3}
				source={{ uri: credentialPersonalProfileVar.photo?.uri }}
				alt={'Profile Photo'}
			/>
			<SafeAreaView
				style={{
					position: 'absolute',
					bottom: insets.bottom,
					left: 0,
					right: 0,
					display: 'flex',
					flexDirection: 'row-reverse',
					marginVertical: 10,
				}}
			>
				<IconButton
					mx={'10%'}
					onPress={onSubmit}
					variant={'solid'}
					color={'primary.500'}
					style={{
						justifyContent: 'center',
						borderRadius: 50,
						height: 70,
						width: 70,
						paddingHorizontal: 20,
						alignSelf: 'center',
					}}
					borderRadius={'xl'}
					icon={<Icon color={'white'} name='arrow-right' size={'2xl'} as={Feather} />}
				>
					<Text color={'primary.500'} fontSize={'lg'}>
						{loading ? 'Completing' : !credentialPersonalProfileVar.emojimood?.id ? 'Skip' : 'Complete'}
					</Text>
				</IconButton>
			</SafeAreaView>
		</Box>
	)
}
