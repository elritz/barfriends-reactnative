import { useReactiveVar } from '@apollo/client'
import { Profile, useEmojimoodsQuery, useUpdateOneProfileMutation } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'
import { Box, Button, Text } from 'native-base'
import { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FlatList, Image, Pressable, SafeAreaView, View, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Defs, Ellipse, LinearGradient, Rect, Stop } from 'react-native-svg'
import { ThemeContext } from 'styled-components/native'

// TODO: FN(onPress clear emojimood)
interface EmojimoodScreenProps {}

const EmojimoodScreen = ({}: EmojimoodScreenProps) => {
	const insets = useSafeAreaInsets()
	const window = useWindowDimensions()
	const themeContext = useContext(ThemeContext)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const colorScheme = useThemeColorScheme()

	const ITEM_HEIGHT = window.width / 3
	const ITEM_WIDTH = window.width / 3

	const onPressEmojimood = (item: any) => {
		setValue('emojimood', {
			...item,
		})
	}
	const [updateOneProfileMutation, { data, loading: UOPLoading }] = useUpdateOneProfileMutation({
		onCompleted: data => {
			if (data.updateOneProfile) {
				const Profile = data.updateOneProfile as Profile
				if (rAuthorizationVar?.DeviceProfile) {
					AuthorizationReactiveVar({
						...rAuthorizationVar,
						DeviceProfile: {
							...rAuthorizationVar.DeviceProfile,
							Profile,
						},
					})
				}
				// reset({
				// 	emojimood: {
				// 		name: data.updateOneProfile.DetailInformation.description,
				// 	}
				// })
			} else {
				setError('emojimood', { message: 'Couldnt update profile' })
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
				id: rAuthorizationVar?.DeviceProfile?.Profile?.Story?.emojimood[0].id || '',
				emoji: rAuthorizationVar?.DeviceProfile?.Profile?.Story?.emojimood[0].emoji || '',
				name: rAuthorizationVar?.DeviceProfile?.Profile?.Story?.emojimood[0].emojiname || '',
				colors:
					rAuthorizationVar?.DeviceProfile?.Profile?.Story?.emojimood[0].colors || ([] as string[]),
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

	if (emojiError) {
		return (
			<Box>
				<Text>{emojiError.name}</Text>
				<Text>{emojiError.message}</Text>
			</Box>
		)
	}

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
										stopColor={
											value.colors[0] ? value.colors[0] : themeContext.palette.primary.background.default
										}
										stopOpacity='1'
									/>
									<Stop
										offset='1'
										stopColor={
											value.colors[1] ? value.colors[1] : themeContext.palette.primary.background.default
										}
										stopOpacity='1'
									/>
								</LinearGradient>
							</Defs>
							<Rect height='100%' width={window.width} fill='url(#grad)' />
						</Svg>
						<FlatList
							style={{
								flex: 1,
								paddingTop: window.width / 1.5,
							}}
							contentInset={{ bottom: window.width / 1.5, left: 0, right: 0 }}
							contentInsetAdjustmentBehavior='automatic'
							ListHeaderComponent={() => {
								return (
									<Box alignItems={'center'}>
										<Button
											w={'55%'}
											onPress={() => {
												console.log('TODO: Clear emoijimood ========>')
											}}
										>
											Clear
										</Button>
									</Box>
								)
							}}
							keyExtractor={item => item.id.toString()}
							onEndReachedThreshold={0.4}
							showsVerticalScrollIndicator={false}
							numColumns={3}
							data={emojiData?.emojimoods}
							renderItem={({ item }) => {
								return (
									<Pressable onPress={() => onPressEmojimood(item)}>
										<View>
											<Svg width={ITEM_WIDTH} height={ITEM_HEIGHT}>
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
													stroke={value.id === String(item.id) ? 'white' : '#FFFFFF00'}
													strokeWidth='2'
												/>
											</Svg>
											<Text
												style={{
													position: 'absolute',
													top: ITEM_HEIGHT / 3,
													textAlign: 'center',
													alignSelf: 'center',
												}}
												fontSize={'3xl'}
											>
												{item.emoji}
											</Text>
										</View>
										<Text
											fontSize={'md'}
											isTruncated
											w={ITEM_WIDTH}
											adjustsFontSizeToFit
											allowFontScaling
											minimumFontScale={0.5}
											numberOfLines={2}
											fontWeight={'medium'}
											style={{ textAlign: 'center' }}
										>
											{item.emojiname}
										</Text>
									</Pressable>
								)
							}}
						/>
						<BlurView
							tint={colorScheme === 'light' ? 'light' : 'dark'}
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
								value.colors[0] ? value.colors[0] : themeContext.palette.primary.background.default,
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
							height={window.width / 2.3}
							source={{ uri: rAuthorizationVar.DeviceProfile.Profile.photos[0].url }}
							alt={'Profile Photo'}
						/>
					</>
				)}
			/>
		</Box>
	)
}
export default EmojimoodScreen
