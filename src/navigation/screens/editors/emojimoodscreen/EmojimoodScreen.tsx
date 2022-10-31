import { useReactiveVar } from '@apollo/client'
import { Profile, useEmojimoodsQuery, useUpdateOneProfileMutation } from '@graphql/generated'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Text } from '@rneui/base'
import { BlurView } from 'expo-blur'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'
import { Box, Button } from 'native-base'
import { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FlatList, Image, Pressable, SafeAreaView, View, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Defs, Ellipse, LinearGradient, Rect, Stop } from 'react-native-svg'
import { ThemeContext } from 'styled-components/native'

interface EmojimoodScreenProps {}

const EmojimoodScreen = ({}: EmojimoodScreenProps) => {
	const insets = useSafeAreaInsets()
	const isFocused = useIsFocused()
	const window = useWindowDimensions()
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const onPressEmojimood = (item: any) => {
		setValue('emojimood', {
			...item,
		})
	}
	const [updateOneProfileMutation, { data, loading: UOPLoading }] = useUpdateOneProfileMutation({
		onCompleted: data => {
			if (data.updateOneProfile) {
				const Profile = data.updateOneProfile as Profile
				AuthorizationReactiveVar({
					...rAuthorizationVar,
					DeviceProfile: {
						...rAuthorizationVar.DeviceProfile,
						Profile,
					},
				})
				reset({
					description: data.updateOneProfile.DetailInformation.description,
				})
			} else {
				setError('description', { message: 'Couldnt update profile' })
			}
		},
	})

	const {
		control,
		setError,
		setValue,
		handleSubmit,
		reset,
		formState: { dirtyFields, errors },
	} = useForm({
		defaultValues: {
			emojimood: {
				id: rAuthorizationVar.DeviceProfile.Profile.Story[0]?.emojimood.id || '',
				emoji: rAuthorizationVar.DeviceProfile.Profile.Story[0]?.emojimood.emoji || '',
				name: rAuthorizationVar.DeviceProfile.Profile.Story[0]?.emojimood.emojiname || '',
				colors: rAuthorizationVar.DeviceProfile.Profile.Story[0]?.emojimood.colors || ([] as string[]),
			},
		},
	})

	// const onSubmit = () => {
	// 	updateOneProfileMutation({
	// 		variables: {
	// 			data: {
	// 				DetailInformation: {
	// 					update: {},
	// 				},
	// 			},
	// 		},
	// 	})
	// }

	const { data: emojiData, loading: emojiLoading, error: emojiError } = useEmojimoodsQuery()

	if (emojiLoading) return null

	return (
		<Box alignItems={'center'} flex={1}>
			<Controller
				name='emojimood'
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<>
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
										stopColor={value.colors[0] ? value.colors[0] : themeContext.palette.primary.background}
										stopOpacity='1'
									/>
									<Stop
										offset='1'
										stopColor={value.colors[1] ? value.colors[1] : themeContext.palette.primary.background}
										stopOpacity='1'
									/>
								</LinearGradient>
							</Defs>
							<Rect height='100%' width={window.width} fill='url(#grad)' />
						</Svg>
						<FlatList
							style={{
								flex: 1,
							}}
							ListHeaderComponent={() => {
								return (
									<Button
										onPress={() => {
											console.log('Clear emoijimood ========>')
										}}
									>
										Clear
									</Button>
								)
							}}
							keyExtractor={item => item.id.toString()}
							onEndReachedThreshold={0.4}
							showsVerticalScrollIndicator={false}
							numColumns={3}
							contentInset={{ top: window.width / 1.5, bottom: 90, left: 0, right: 0 }}
							contentInsetAdjustmentBehavior='automatic'
							data={emojiData.emojimoods}
							renderItem={({ item }: any) => {
								return (
									<Pressable onPress={() => onPressEmojimood(item)}>
										<View>
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
													rx={window.width / 8}
													ry={window.width / 8}
													fill='url(#grad)'
													stroke={value.id === item.id ? 'white' : '#FFFFFF00'}
													strokeWidth='2'
												/>
											</Svg>
											<Text
												style={{
													position: 'absolute',
													top: window.width / 12,
													textAlign: 'center',
													alignSelf: 'center',
													marginTop: 10,
													justifyContent: 'center',
													fontSize: 35,
												}}
											>
												{item.emoji}
											</Text>
										</View>
										<Text style={{ textAlign: 'center' }}>{item.name}</Text>
									</Pressable>
								)
							}}
						/>
						<BlurView
							tint={'dark'}
							intensity={20}
							style={{
								position: 'absolute',
								top: 0,
								width: '100%',
								height: window.width / 1.75,
							}}
						/>
						<ExpoLinearGradient
							colors={[
								value.colors[0] ? value.colors[0] : themeContext.palette.primary.background,
								'transparent',
							]}
							style={{
								top: 0,
								position: 'absolute',
								height: window.width / 2,
								width: window.width,
							}}
						/>
						<Image
							style={{
								position: 'absolute',
								marginVertical: 20,
								borderRadius: 20,
								borderColor: value.colors[1] ? value.colors[1] : 'transparent',
								borderWidth: 2,
							}}
							width={window.width / 2.3}
							height={window.width / 2.2}
							source={{ uri: rAuthorizationVar.DeviceProfile.Profile.photos[0].url }}
						/>
						<SafeAreaView
							style={{
								position: 'absolute',
								bottom: insets.bottom,
								left: 0,
								right: 0,
								display: 'flex',
								flexDirection: 'row-reverse',
							}}
						></SafeAreaView>
					</>
				)}
			/>
		</Box>
	)
}
export default EmojimoodScreen
