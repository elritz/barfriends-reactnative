import Item from '../images/Item'
import { useReactiveVar } from '@apollo/client'
import { Box, Button, Center, Heading, Pressable, Text } from '@components/core'
import { MaterialIcons } from '@expo/vector-icons'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import useCloudinaryImageUploading from '@util/uploading/useCloudinaryImageUploading'
import * as ImagePicker from 'expo-image-picker'
import { useCallback } from 'react'
import { Image } from 'react-native'
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'
import Animated, {
	interpolate,
	interpolateColor,
	useAnimatedRef,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
} from 'react-native-reanimated'

const size = 70

export default function Photos() {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const colorScheme = useThemeColorScheme()
	const { width } = useWindowDimensions()
	const scrollRef = useAnimatedRef<ScrollView>()
	const translateX = useSharedValue(0)
	const margin = 12
	const DOT_SIZE = 8
	const ITEM_WIDTH = width - margin * 2

	//! don't move this from here
	const activeIndex = useDerivedValue(() => {
		return Math.round(translateX.value / ITEM_WIDTH)
	})

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
			selectionLimit: 4,
			aspect: [4, 3],
			allowsMultipleSelection: true,
			quality: 1,
		})

		if (result.assets) {
			const resultSettled = await Promise.allSettled(
				result.assets.map(async item => {
					const { secure_url } = await useCloudinaryImageUploading(item.uri)

					return secure_url
				}),
			)

			resultSettled.map((item, index) => {
				if (item.status === 'fulfilled') {
					return item.value
				}
			})
		}
	}

	const getGitHubUser = async (usernames: []) => {}

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: event => {
			translateX.value = event.contentOffset.x
		},
	})

	const onPressScroll = useCallback(side => {
		if (side === 'left') {
			if (activeIndex.value === 0) return
			scrollRef.current?.scrollTo({ x: ITEM_WIDTH * (activeIndex.value - 1), animated: false })
		}

		if (side == 'right') {
			if (
				activeIndex.value ===
				rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.photos?.length - 1
			) {
				scrollRef.current?.scrollTo({ x: ITEM_WIDTH * 0, animated: false })
				return
			}
			scrollRef.current?.scrollTo({ x: ITEM_WIDTH * (activeIndex.value + 1), animated: false })
		}
	}, [])

	const styles = StyleSheet.create({
		dotLg: {
			position: 'absolute',
			left: -39,
			top: -10,
			height: size + 10,
			width: size + 10,
			borderRadius: size + 10 / 2,
			backgroundColor: rTheme.theme?.gluestack.tokens.colors.primary400,
		},
		dotMd: {
			top: 10,
			left: -55,
			position: 'absolute',
			height: size - 15,
			width: size - 15,
			borderRadius: size / 2,
			backgroundColor: rTheme.theme?.gluestack.tokens.colors.tertiary400,
		},
		dotSm: {
			top: 20,
			left: 20,
			position: 'absolute',
			height: size - 25,
			width: size - 25,
			borderRadius: size / 2,
			backgroundColor: rTheme.theme?.gluestack.tokens.colors.secondary700,
			zIndex: 3,
		},
	})

	return (
		<>
			{rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.photos?.length ? (
				<Box
					sx={{
						h: 400,
					}}
					rounded={'$md'}
					overflow={'hidden'}
				>
					<Animated.ScrollView
						ref={scrollRef as any}
						pagingEnabled
						horizontal
						scrollToOverflowEnabled
						snapToInterval={ITEM_WIDTH}
						onScroll={scrollHandler}
						scrollEventThrottle={16}
						showsHorizontalScrollIndicator={false}
						decelerationRate={'fast'}
						bounces={false}
						style={{ overflow: 'hidden' }}
					>
						{rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.photos?.photos.map(
							(item, index) => {
								return (
									<View key={index}>
										<Box h={'100%'} w={ITEM_WIDTH}>
											<Pressable
												position={'absolute'}
												top={0}
												bottom={0}
												h={'100%'}
												w={ITEM_WIDTH / 2}
												opacity={20}
												onPress={() => {
													onPressScroll('left')
												}}
												zIndex={10}
											/>
											<Pressable
												position={'absolute'}
												top={0}
												right={0}
												bottom={0}
												h={'100%'}
												w={ITEM_WIDTH / 2}
												onPress={() => {
													onPressScroll('right')
												}}
												zIndex={10}
											/>
											<Image
												source={{
													uri: item.url,
												}}
												style={{
													height: '100%',
													width: '100%',
													borderRadius: 0,
												}}
											/>
										</Box>
									</View>
								)
							},
						)}
					</Animated.ScrollView>

					<View
						style={{
							position: 'absolute',
							bottom: 10,
							alignSelf: 'center',
							flexDirection: 'row',
						}}
					>
						<View>
							{rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.photos.map((_, i) => {
								const rDotStyle = useAnimatedStyle(() => {
									const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
									const dotWidth = interpolate(translateX.value, inputRange, [11, 20, 11], 'clamp')
									const dotColor = interpolateColor(translateX.value, inputRange, [
										'#1d1d1d',
										'#ff7000',
										'#1d1d1d',
									])

									return {
										width: dotWidth,
										backgroundColor: dotColor,
									}
								})

								return (
									<Animated.View
										key={i.toString()}
										style={[
											rDotStyle,
											{
												marginHorizontal: 3,
												height: DOT_SIZE,
												borderRadius: DOT_SIZE / 2,
											},
										]}
									/>
								)
							})}
						</View>
					</View>
				</Box>
			) : (
				<Box
					bg={'$transparent'}
					sx={{
						h: 400,
						w: '100%',
					}}
					rounded={'$md'}
					mb={'$3'}
				>
					<Box>
						<Box h={'100%'}>
							<Center flex={1} mx={'$5'}>
								<Box
									sx={{
										w: '100%',
									}}
									alignItems={'center'}
									pb={'$5'}
								>
									<MaterialIcons
										style={{
											zIndex: 10,
											color:
												colorScheme === 'light'
													? rTheme.theme?.gluestack.tokens.colors.light900
													: rTheme.theme?.gluestack.tokens.colors.dark900,
										}}
										size={55}
										name={'photo-size-select-actual'}
									/>
									<Box position={'absolute'} zIndex={5}>
										<View
											style={[
												styles.dotSm,
												{
													alignContent: 'center',
													justifyContent: 'center',
												},
											]}
										/>
										<View
											style={[
												styles.dotMd,
												{
													alignContent: 'center',
													justifyContent: 'center',
												},
											]}
										/>
										<View
											style={[
												styles.dotLg,
												{
													alignContent: 'center',
													justifyContent: 'center',
												},
											]}
										/>
									</Box>
								</Box>
								<Heading pb={1} fontWeight={'$black'}>
									Start tonights story
								</Heading>
								<Text fontSize={'$lg'} fontWeight={'$medium'}>
									Ready to go out? Add photos of your fit and pick your emojimood
								</Text>
								<Button onPress={pickImage} bg={'$tertiary400'} rounded={'$md'} mt={'$4'}>
									<Text>Upload images</Text>
								</Button>
							</Center>
						</Box>
					</Box>
				</Box>
			)}
		</>
	)
}
