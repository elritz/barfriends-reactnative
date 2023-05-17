import { useReactiveVar } from '@apollo/client'
import Photos from '@components/molecules/images/photos'
import { MaterialIcons } from '@expo/vector-icons'
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet'
import { useEmojimoodsQuery, useUpdateStoryEmojimoodMutation } from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'
import {
	Box,
	Heading,
	IconButton,
	Icon,
	Pressable,
	Button,
	Text,
	View,
	FlatList,
	useTheme,
} from 'native-base'
import React, { useCallback, useContext, useMemo, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useWindowDimensions } from 'react-native'
import Svg, { Defs, Ellipse, Rect, Stop, LinearGradient } from 'react-native-svg'
import { ThemeContext } from 'styled-components/native'

interface AddEmojiProps {}

const AddEmoji = () => {
	const _bottomSheetRef = useRef<BottomSheetModal>(null)
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const window = useWindowDimensions()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const snapPoints = useMemo(() => ['55%', '90%'], [])
	const colorScheme = useThemeColorScheme()
	const theme = useTheme()

	const ITEM_HEIGHT = window.width / 3
	const ITEM_WIDTH = window.width / 3

	const {
		control,
		setError,
		setValue,
		handleSubmit,
		reset,
		getValues,
		watch,
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

	const { data: emojiData, loading: emojiLoading, error: emojiError } = useEmojimoodsQuery()

	const [updateStoryEmojimoodMutation, { data: USEData, loading: USELoading, error: USEError }] =
		useUpdateStoryEmojimoodMutation({
			onCompleted: data => {
				console.log('🚀 -------------------------------------------------🚀')
				console.log('🚀 ~ file: AddEmoji.tsx:73 ~ AddEmoji ~ data', data)
				console.log('🚀 -------------------------------------------------🚀')
			},
		})

	const onPressEmojimood = (item: any) => {
		setValue('emojimood', {
			...item,
		})
	}

	const onSubmit = () => {}

	const handlePresentModalPress = useCallback(() => {
		_bottomSheetRef.current?.present()
	}, [])

	return (
		<Pressable onPress={handlePresentModalPress}>
			<BottomSheetModal
				ref={_bottomSheetRef}
				index={1}
				onDismiss={() => {
					updateStoryEmojimoodMutation({
						variables: {
							emojimoodId: Number(getValues().emojimood.id),
						},
					})
				}}
				snapPoints={snapPoints}
				enableContentPanningGesture={false}
				backgroundStyle={{
					// backgroundColor: colorScheme === 'light' ? theme.colors.light[50] : theme.colors.dark[50],
					backgroundColor: watch().emojimood.colors[0]
						? watch().emojimood.colors[0]
						: themeContext.palette.primary.background.default,
				}}
				handleIndicatorStyle={{
					backgroundColor: colorScheme === 'light' ? theme.colors.light[500] : theme.colors.dark[500],
				}}
				style={{
					shadowColor: '#000',
					shadowOffset: {
						width: 0,
						height: 8,
					},
					shadowOpacity: 0.44,
					shadowRadius: 10.32,
					elevation: 16,
				}}
			>
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
										zIndex: 0,
										height: '100%',
									}}
									width={window.width}
								>
									<Defs>
										<LinearGradient id={'grad'} x1='1' y1='0' x2='1' y2='1'>
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
										paddingTop: window.width / 1.75,
									}}
									contentInset={{ bottom: window.width / 1.5, left: 0, right: 0 }}
									contentInsetAdjustmentBehavior='automatic'
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
										zIndex: 5,
										position: 'absolute',
										top: 0,
										width: '100%',
										height: window.width / 1.75,
									}}
								>
									<Photos
										h={window.width / 1.75 - 20}
										w={window.width / 1.75 - 20}
										story={rAuthorizationVar?.DeviceProfile?.Profile?.Story}
										photo={rAuthorizationVar?.DeviceProfile?.Profile?.photos}
									/>
								</BlurView>
								<ExpoLinearGradient
									colors={[
										value.colors[0] ? value.colors[0] : themeContext.palette.primary.background.default,
										'transparent',
									]}
									style={{
										zIndex: 2,
										top: 0,
										position: 'absolute',
										height: window.width / 2,
										width: window.width,
									}}
								/>
							</>
						)}
					/>
				</Box>
			</BottomSheetModal>
			<Box
				flex={1}
				h={200}
				justifyContent={'center'}
				alignItems={'center'}
				rounded='lg'
				overflow='hidden'
				_light={{
					bg: 'light.100',
				}}
				_dark={{
					bg: rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.emojimood[0].colors[1]
						? rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.emojimood[0].colors[2]
						: 'dark.50',
				}}
				px={5}
			>
				{/* <ExpoLinearGradient
					colors={[
						String(rAuthorizationVar?.DeviceProfile?.Profile?.Story?.emojimood[0].colors[0]),
						String(rAuthorizationVar?.DeviceProfile?.Profile?.Story?.emojimood[0].colors[1]),
					]}
					start={{ x: 0.0, y: 1.0 }}
					end={{ x: 1.0, y: 1.0 }}
					style={{
						position: 'absolute',
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: 9,
					}}
				/> */}
				<ExpoLinearGradient
					colors={[
						'#ff5100',
						'#ff9900',
						'#c3ff00',
						'#83ff17',
						'#1eff00',
						'#83ff17',
						'#32ff7d',
						'#4cfff0',
						'#36bfff',
						'#369eff',
						'#3665ff',
						'#3665ff',
						'#e836ff',
						'#d736ff',
						'#ff36f2',
						'#ff36bf',
						'#ff36c3',
						'#ff3665',
						'#ff363d',
						'#ff3636',
					]}
					start={{ x: 0.0, y: 1.0 }}
					end={{ x: 1.0, y: 1.0 }}
					style={{
						width: 56,
						height: 56,
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: 9,
					}}
				>
					<IconButton
						disabled={true}
						variant={'solid'}
						borderRadius={'md'}
						bg={'#47d0a7'}
						icon={<Icon size={30} color={'darkBlue.800'} as={MaterialIcons} name='emoji-emotions' />}
						height={51}
						width={51}
					/>
				</ExpoLinearGradient>
				<Heading
					mt={3}
					w={'100%'}
					textAlign={'center'}
					fontSize={'lg'}
					fontWeight={'bold'}
					style={{ textTransform: 'uppercase' }}
				>
					Add an
				</Heading>
				<Heading
					w={'100%'}
					textAlign={'center'}
					fontSize={'lg'}
					fontWeight={'bold'}
					style={{ textTransform: 'uppercase' }}
				>
					emojimood
				</Heading>
			</Box>
		</Pressable>
	)
}

export default AddEmoji
// style = {{ height: 200, width: width / 2, backgroundColor: 'blue', padding: 10 }}
