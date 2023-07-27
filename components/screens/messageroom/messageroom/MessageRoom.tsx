import { useReactiveVar } from '@apollo/client'
import { Box, Input, Text } from '@components/core'
import { Ionicons } from '@expo/vector-icons'
import { useKeyboard } from '@react-native-community/hooks'
import { ThemeReactiveVar } from '@reactive'
import { BlurView } from 'expo-blur'
import { useEffect } from 'react'
import { FlatList, Keyboard, Platform, KeyboardAvoidingView } from 'react-native'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import Animated, {
	Easing,
	interpolate,
	useAnimatedRef,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function MessageRoom(props) {
	const data = [...Array(16)]
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const insets = useSafeAreaInsets()
	const _keyboard = useKeyboard()
	const { height, progress } = useReanimatedKeyboardAnimation()
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
					const transformY = interpolate(positionBottom.value, inputRange, [
						_keyboard.keyboardHeight,
						insets.bottom,
					])
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
		// 		// positionBottom.value = withTiming(_keyboard.keyboardHeight)
		// 		positionBottom.value = withTiming(_keyboard.keyboardHeight)
		// 	})
		const showSubscription = Keyboard.addListener('keyboardDidShow', e => {
			positionBottom.value = withTiming(-_keyboard.keyboardHeight)
		})
		// const willHideSubscription = Keyboard.addListener('keyboardWillHide', e => {
		// 	positionBottom.value = withTiming(insets.bottom)
		// })
		// const hideSubscription = Keyboard.addListener('keyboardDidHide', e => {
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
						<Text bg={'$red500'} fontSize={'$4xl'}>
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
					tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
					style={{
						minWidth: '100%',
						height: '100%',
						backgroundColor: 'transparent',
						paddingVertical: 15,
					}}
				>
					<Input variant={'rounded'} size={'lg'}>
						<Input.Input
							keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
							onPressIn={handlePressIn}
							mx={'$2'}
							my={'auto'}
							rounded={'$md'}
							multiline
							placeholder=''
						/>
						<Ionicons
							name={'md-send'}
							size={30}
							color={
								rTheme.colorScheme === 'light'
									? rTheme.theme?.gluestack.tokens.colors.light900
									: rTheme.theme?.gluestack.tokens.colors.dark900
							}
							style={{
								marginHorizontal: 2,
							}}
						/>
					</Input>
				</BlurView>
				{/* </Animated.View> */}
			</KeyboardAvoidingView>
			<Box
				bg={
					rTheme.colorScheme === 'light'
						? rTheme.theme?.gluestack.tokens.colors.light100
						: rTheme.theme?.gluestack.tokens.colors.dark100
				}
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
