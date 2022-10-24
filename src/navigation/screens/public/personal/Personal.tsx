import CurrentVenue from './components/currentvenue/CurrentVenue'
import Details from './components/details/Details'
import Relationship from './components/relationship/Relationship'
import {
	Box,
	Button,
	HStack,
	Image,
	Pressable,
	ScrollView as NBScrollView,
	View,
	VStack,
} from 'native-base'
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
import { SafeAreaView } from 'react-native-safe-area-context'

const image2 = {
	image:
		'https://images.unsplash.com/photo-1665624175386-0b5b0e6bba4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80',
	background: 'red.100',
}
const image1 = {
	image:
		'https://images.unsplash.com/photo-1665581688232-de69dbcc2ffc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
	background: 'red.500',
}
const image3 = {
	image:
		'https://images.unsplash.com/photo-1665398892998-8ee81dae4bcb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
	background: 'red.800',
}
const image4 = {
	image:
		'https://images.unsplash.com/photo-1665623328945-35acef28302a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
	background: 'red.700',
}
const data = [image1, image2, image3, image4]

const PersonalScreen = (props: any) => {
	const { width } = useWindowDimensions()
	const scrollRef = useAnimatedRef<ScrollView>()
	const translateX = useSharedValue(0)

	const margin = 12
	const DOT_SIZE = 8
	const ITEM_WIDTH = width - margin * 2

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: event => {
			translateX.value = event.contentOffset.x
		},
	})

	//! don't move this from here
	const activeIndex = useDerivedValue(() => {
		return Math.round(translateX.value / ITEM_WIDTH)
	})

	const onPressScroll = useCallback(side => {
		if (side === 'left') {
			if (activeIndex.value === 0) return
			scrollRef.current?.scrollTo({ x: ITEM_WIDTH * (activeIndex.value - 1), animated: false })
		}

		if (side == 'right') {
			if (activeIndex.value === data.length - 1) {
				scrollRef.current?.scrollTo({ x: ITEM_WIDTH * 0, animated: false })
				return
			}
			scrollRef.current?.scrollTo({ x: ITEM_WIDTH * (activeIndex.value + 1), animated: false })
		}
	}, [])

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<NBScrollView mx={3} showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
				<VStack space={3}>
					<Box
						_light={{
							bg: 'light.50',
						}}
						_dark={{
							bg: 'light.800',
						}}
						h={400}
						w={'100%'}
						borderRadius={'lg'}
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
							{data.map((item, index) => {
								return (
									<>
										<Box key={index} h={'100%'} w={ITEM_WIDTH}>
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
												height={'100%'}
												width={'100%'}
												rounded={'none'}
												source={{
													uri: item.image,
												}}
												alt='Alternate Text'
											/>
										</Box>
									</>
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
							<>
								{data.map((_, i) => {
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
							</>
						</View>
					</Box>
					<VStack
						p={3}
						space={3}
						borderRadius={'xl'}
						_light={{
							bg: 'light.50',
						}}
						_dark={{
							bg: 'light.800',
						}}
					>
						<HStack space={3}>
							<Button
								flex={1}
								_text={{
									fontWeight: '600',
								}}
								colorScheme={'primary'}
							>
								Barfriend
							</Button>
							<Button
								bg={'blue.500'}
								_text={{
									fontWeight: '600',
								}}
								flex={2}
								colorScheme={'primary'}
							>
								Message
							</Button>
						</HStack>
						<Details />
					</VStack>
					<HStack space={3} h={200}>
						<CurrentVenue />
						<Relationship />
					</HStack>
				</VStack>
			</NBScrollView>
		</SafeAreaView>
	)
}

export default PersonalScreen
