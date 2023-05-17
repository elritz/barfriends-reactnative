import { Maybe, Photo, Story } from '@graphql/generated'
import { Box, Center, Image, Pressable, Text, View } from 'native-base'
import { useCallback } from 'react'
import { ScrollView, useWindowDimensions } from 'react-native'
import Animated, {
	interpolate,
	interpolateColor,
	useAnimatedRef,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
} from 'react-native-reanimated'

type Props = {
	story: Maybe<Story> | undefined
	photo: Maybe<Photo> | undefined
	w: number
	h: number
}

export default function Photos({ story, photo, w, h }: Props) {
	const { width } = useWindowDimensions()
	const scrollRef = useAnimatedRef<ScrollView>()
	const translateX = useSharedValue(0)
	const margin = 12
	const DOT_SIZE = 8
	const ITEM_WIDTH = w - margin * 2

	//! don't move this from here
	const activeIndex = useDerivedValue(() => {
		return Math.round(translateX.value / ITEM_WIDTH)
	})

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
			if (activeIndex.value === story.photos.length - 1) {
				scrollRef.current?.scrollTo({ x: ITEM_WIDTH * 0, animated: false })
				return
			}
			scrollRef.current?.scrollTo({ x: ITEM_WIDTH * (activeIndex.value + 1), animated: false })
		}
	}, [])

	return (
		<>
			{story?.photos?.length ? (
				<Box
					_light={{
						bg: 'light.100',
					}}
					_dark={{
						bg: 'dark.50',
					}}
					h={h}
					w={w}
					borderRadius={'md'}
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
						{story.photos.map((item, index) => {
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
											height={'100%'}
											width={'100%'}
											rounded={'none'}
											alt='Alternate Text'
										/>
									</Box>
								</View>
							)
						})}
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
							{story.photos.map((_, i) => {
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
					_light={{
						bg: 'light.100',
					}}
					_dark={{
						bg: 'dark.50',
					}}
					h={h}
					w={w}
					borderRadius={'md'}
					alignItems={'center'}
					justifyContent={'center'}
					overflow={'hidden'}
					m={3}
					alignSelf={'center'}
				>
					<Box h={'100%'} p={2} w={'100%'} borderRadius={'3xl'}>
						<Image
							source={{
								uri: photo.url,
							}}
							height={'100%'}
							width={'100%'}
							rounded={'xl'}
							alt='Alternate Text'
						/>
					</Box>
				</Box>
			)}
		</>
	)
}
