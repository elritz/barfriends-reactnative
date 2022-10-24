import { Ionicons } from '@expo/vector-icons'
import { useKeyboard } from '@react-native-community/hooks'
import { BlurView } from 'expo-blur'
import { Icon, Box, Input, Text, useTheme, useColorMode } from 'native-base'
import { useEffect } from 'react'
import {
	FlatList,
	View,
	TextInput as RNInput,
	Keyboard,
	Platform,
	KeyboardAvoidingView,
} from 'react-native'
import {
	Gesture,
	GestureDetector,
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import {
	useKeyboardAnimation,
	useReanimatedKeyboardAnimation,
} from 'react-native-keyboard-controller'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import Animated, {
	Easing,
	Extrapolate,
	interpolate,
	useAnimatedGestureHandler,
	useAnimatedRef,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

export default function MessageRoom(props) {
	const data = [...Array(16)]
	const theme = useTheme()
	const _nbMode = useColorMode()
	const insets = useSafeAreaInsets()
	const _keyboard = useKeyboard()
	const { height, progress } = useReanimatedKeyboardAnimation()
	// const { height, progress } = useKeyboardAnimation()
	console.log('🚀 ~ file: MessageRoom.tsx ~ line 47 ~ MessageRoom ~ progress', progress)
	console.log('🚀 ~ file: MessageRoom.tsx ~ line 47 ~ MessageRoom ~ height', height)
	const flatListRef = useAnimatedRef<FlatList>()
	const positionBottom = useSharedValue(0)
	const keyboardOffset = useSharedValue(0)
	const INPUT_HEIGHT = 65

	const animatedStyle = useAnimatedStyle(() => {
		const inputRange = [insets.bottom, _keyboard.keyboardHeight]
		const transformY = interpolate(positionBottom.value, inputRange, [
			insets.bottom,
			_keyboard.keyboardHeight,
		])

		return {
			transform: [{ translateY: keyboardOffset.value }],
			// bottom: keyboardOffset.value,
		}
	})

	const getVerticalOffset = () =>
		Platform.select({
			ios: 0,
			android: 0,
		})

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: e => {
			const inputRange = [insets.bottom, _keyboard.keyboardHeight]
			if (e.contentOffset.y < -95) {
				if (positionBottom.value > insets.bottom) {
					console.log(
						'🚀 ~ file: MessageRoom.tsx ~ line 53 ~ MessageRoom ~ positionBottom.value',
						e.contentOffset.y,
					)
					const transformY = interpolate(positionBottom.value, inputRange, [
						_keyboard.keyboardHeight,
						insets.bottom,
					])
					console.log('🚀 ~ file: MessageRoom.tsx ~ line 62 ~ MessageRoom ~ transformY', transformY)

					positionBottom.value = withTiming(transformY)
				}
			}
		},
	})

	const handlePressIn = () => {
		keyboardOffset.value = withTiming(-_keyboard.keyboardHeight + insets.bottom, {
			duration: 230,
			easing: Easing.sin,
		})
	}

	useEffect(() => {
		// start the animation when the keyboard appears
		// Keyboard.addListener('keyboardWillShow', e => {
		// 	console.log(
		// 		'🚀 ~ file: MessageRoom.tsx ~ line 86 ~ useEffect ~ -e.endCoordinates?.height',
		// 		-e.endCoordinates?.height,
		// 	)
		// 	// use the height of the keyboard (negative because the translateY moves upward)
		// 	keyboardOffset.value = withTiming(-_keyboard.keyboardHeight + insets.bottom, { duration: 250 })
		// })
		// perform the reverse animation back to keyboardOffset initial value: 0
		// Keyboard.addListener('keyboardWillHide', () => {
		// 	keyboardOffset.value = withTiming(0, { duration: 160 })
		// })
		// return () => {
		// 	// remove listeners to avoid memory leak
		// 	Keyboard.removeAllListeners('keyboardWillShow')
		// 	Keyboard.removeAllListeners('keyboardWillHide')
		// }
	}, [])

	useEffect(() => {
		flatListRef.current?.scrollToEnd()
		// 	const willShowSubscription = Keyboard.addListener('keyboardWillShow', e => {
		// 		console.log('🚀 ~ file: MessageRoom.tsx ~ line 51 ~ useEffect ~ e', e)
		// 		// positionBottom.value = withTiming(_keyboard.keyboardHeight)
		// 		positionBottom.value = withTiming(_keyboard.keyboardHeight)
		// 	})
		const showSubscription = Keyboard.addListener('keyboardDidShow', e => {
			positionBottom.value = withTiming(-_keyboard.keyboardHeight)
		})
		// const willHideSubscription = Keyboard.addListener('keyboardWillHide', e => {
		// 	console.log('🚀 ~ file: MessageRoom.tsx ~ line 60 ~ hideSubscription ~ e', e)
		// 	positionBottom.value = withTiming(insets.bottom)
		// })
		// const hideSubscription = Keyboard.addListener('keyboardDidHide', e => {
		// 	console.log('🚀 ~ file: MessageRoom.tsx ~ line 60 ~ hideSubscription ~ e', e)
		// 	keyboardShowing.value = false
		// 	positionBottom.value = withTiming(insets.bottom)
		// })

		return () => {
			// 		willShowSubscription.remove()
			showSubscription.remove()
			// willHideSubscription.remove()
			// hideSubscription.remove()
		}
	}, [flatListRef])

	// const PanGesture = Gesture.Pan()
	// 	.onStart(e => {
	// 		console.log(e.translationY)
	// 	})
	// 	.onUpdate(e => {
	// 		console.log(e.translationY)
	// 	})
	// 	.onEnd(e => {
	// 		console.log(e.translationY)
	// 	})

	return (
		<Box bg={'orange.500'} flex={1}>
			{/* <GestureDetector gesture={PanGesture}> */}
			{/* <KeyboardAvoidingView keyboardVerticalOffset={0}> */}
			<Animated.FlatList
				// scrollEnabled={false}
				ref={flatListRef as any}
				contentInset={{ top: insets.top, bottom: INPUT_HEIGHT + insets.bottom }}
				data={data}
				style={{ backgroundColor: 'green', flex: 1 }}
				keyboardDismissMode='interactive'
				// contentInsetAdjustmentBehavior={'scrollableAxes'}
				keyboardShouldPersistTaps={'always'}
				scrollEventThrottle={16}
				onScroll={scrollHandler}
				renderItem={({ item, index }) => {
					return (
						<Text bg={'red.500'} fontSize={'4xl'}>
							MessagesRoom{index}
						</Text>
					)
				}}
			/>
			{/* </KeyboardAvoidingView> */}
			<KeyboardAvoidingView
				style={{
					position: 'absolute',
					bottom: insets.bottom,
					width: '100%',
					height: INPUT_HEIGHT,
				}}
			>
				{/* </GestureDetector> */}
				{/* <Animated.View
				style={[
					{
						position: 'absolute',
						bottom: insets.bottom,
						width: '100%',
						height: INPUT_HEIGHT,
					},
					animatedStyle,
				]}
			> */}
				<BlurView
					style={{
						minWidth: '100%',
						height: '100%',
						backgroundColor: 'transparent',
						paddingVertical: 15,
					}}
					tint={_nbMode.colorMode === 'light' ? 'light' : 'dark'}
				>
					<Input
						bg={_nbMode.colorMode === 'light' ? 'light.100' : 'dark.100'}
						_focus={{
							bg: _nbMode.colorMode === 'light' ? 'light.100' : 'dark.100',
							borderColor: 'transparent',
						}}
						onPressIn={handlePressIn}
						variant={'filled'}
						size={'2xl'}
						mx={2}
						my={'auto'}
						borderRadius={'lg'}
						multiline
						placeholder=''
						InputRightElement={
							<Icon
								size={'lg'}
								color={_nbMode.colorMode === 'light' ? 'dark.100' : 'light.100'}
								mx={2}
								as={Ionicons}
								name={'md-send'}
							/>
						}
					/>
				</BlurView>
				{/* </Animated.View> */}
			</KeyboardAvoidingView>
			<Box
				bg={_nbMode.colorMode === 'light' ? 'light.100' : 'dark.100'}
				style={{
					position: 'absolute',
					height: insets.bottom,
					bottom: 0,
					left: 0,
					right: 0,
				}}
			/>
		</Box>
	)
}
