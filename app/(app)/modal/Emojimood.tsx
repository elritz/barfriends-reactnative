import { useReactiveVar } from '@apollo/client'
import Photos from '@components/molecules/images/photos'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useEmojimoodsQuery, useUpdateStoryEmojimoodMutation } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'
import { Text, Box, Skeleton, useTheme, Pressable, View, Heading, FlatList } from 'native-base'
import { Controller, useForm } from 'react-hook-form'
import { useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Defs, LinearGradient, Stop, Rect, Ellipse } from 'react-native-svg'

export default function Emojimood() {
	const window = useWindowDimensions()
	const insets = useSafeAreaInsets()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const theme = useTheme()
	const colorScheme = useThemeColorScheme()

	const onPressEmojimood = (item: any) => {
		setValue('emojimood', {
			...item,
		})
	}

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
				id: rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.emojimood[0].id || '',
				emoji: rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.emojimood[0].emoji || '',
				name: rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.emojimood[0].emojiname || '',
				colors:
					rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.emojimood[0].colors ||
					([] as string[]),
			},
		},
	})

	const [updateStoryEmojimoodMutation, { data: USEData, loading: USELoading, error: USEError }] =
		useUpdateStoryEmojimoodMutation({})
	const {
		data: emojiData,
		loading: emojiLoading,
		error: emojiError,
	} = useEmojimoodsQuery({
		onError: error => {
			console.log('error :>> ', error)
		},
		onCompleted: data => {
			console.log('data :>> ', data)
		},
	})

	if (emojiLoading) {
		return (
			<Box safeAreaTop flex={1}>
				<FlashList
					numColumns={3}
					data={[...Array(21)]}
					showsVerticalScrollIndicator={false}
					ListHeaderComponent={() => {
						return (
							<Skeleton
								h={window.width / 2.5}
								w={window.width / 2.5}
								rounded={'lg'}
								style={{
									alignSelf: 'center',
								}}
							/>
						)
					}}
					renderItem={({ item }) => {
						return (
							<Skeleton
								w={ITEM_WIDTH}
								minH={ITEM_HEIGHT}
								maxH={ITEM_HEIGHT}
								p={3}
								rounded={'full'}
								style={{
									alignSelf: 'center',
									overflow: 'hidden',
								}}
							/>
						)
					}}
					ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
				/>
			</Box>
		)
	}

	return (
		<Box
			alignItems={'center'}
			flex={1}
			// bgColor={'red.200'}
			bg={
				watch().emojimood.colors[0]
					? watch().emojimood.colors[0]
					: colorScheme === 'light'
					? theme.colors.light[100]
					: theme.colors.dark[100]
			}
		>
			<Controller
				name='emojimood'
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<Box flex={1} w={'100%'} bg={'red.500'}>
						<Svg
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								left: 0,
								right: 0,
								zIndex: 0,
							}}
							width={window.width}
						>
							<Defs>
								<LinearGradient id={'grad'} x1='1' y1='0' x2='1' y2='1'>
									<Stop
										offset='0.25'
										stopColor={
											watch().emojimood.colors[0]
												? watch().emojimood.colors[0]
												: colorScheme === 'light'
												? theme.colors.light[100]
												: theme.colors.dark[100]
										}
										stopOpacity='1'
									/>
									<Stop
										offset='1'
										stopColor={
											watch().emojimood.colors[1]
												? watch().emojimood.colors[1]
												: colorScheme === 'light'
												? theme.colors.light[100]
												: theme.colors.dark[100]
										}
										stopOpacity='1'
									/>
								</LinearGradient>
							</Defs>
							<Rect height='100%' width={window.width} fill='url(#grad)' />
						</Svg>
						<FlashList
							estimatedItemSize={ITEM_HEIGHT}
							contentInset={{
								top: window.width / 1.75 + 10,
								bottom: window.width / 1.75,
							}}
							extraData={value}
							contentInsetAdjustmentBehavior='automatic'
							keyExtractor={item => item.id.toString()}
							onEndReachedThreshold={0.4}
							showsVerticalScrollIndicator={false}
							numColumns={3}
							// ItemSeparatorComponent={() => <View height={'15px'} />}
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
												<Rect
													width={window.width / 3}
													height={window.width / 3}
													fill='url(#grad)'
													stroke={value.id === String(item.id) ? 'white' : '#FFFFFF00'}
													strokeWidth='3'
												/>
											</Svg>
											<Text
												style={{
													position: 'absolute',
													top: ITEM_HEIGHT / 3,
													textAlign: 'center',
													alignSelf: 'center',
												}}
												fontSize={'4xl'}
											>
												{item.emoji}
											</Text>
										</View>
										<BlurView
											tint={'dark'}
											intensity={20}
											style={{
												zIndex: 5,
												width: '100%',
												paddingVertical: 10,
												alignSelf: 'center',
											}}
										>
											<Text
												fontSize={'md'}
												isTruncated
												w={ITEM_WIDTH}
												adjustsFontSizeToFit
												allowFontScaling
												minimumFontScale={0.5}
												fontWeight={'bold'}
												color={colorScheme === 'light' ? 'light.100' : 'dark.800'}
												style={{ textAlign: 'center' }}
											>
												{item.emojiname}
											</Text>
										</BlurView>
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
								width: '100%',
								height: window.width / 1.75 + 2 * insets.top + 5,
							}}
						>
							<Box safeAreaTop mt={insets.top}>
								<Photos
									h={window.width / 1.75 - 20}
									w={window.width / 1.75 - 20}
									story={rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory}
									photo={rAuthorizationVar?.DeviceProfile?.Profile?.photos}
								/>
							</Box>
						</BlurView>
						<ExpoLinearGradient
							colors={[
								value.colors[0]
									? value.colors[0]
									: colorScheme === 'light'
									? theme.colors.light[100]
									: theme.colors.dark[100],
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
					</Box>
				)}
			/>
		</Box>
	)
}
