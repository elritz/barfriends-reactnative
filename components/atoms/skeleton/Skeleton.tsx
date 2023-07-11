import { useEffect } from 'react'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withTiming,
} from 'react-native-reanimated'

export const BORDER_RADIUS = 3
export const MX = 2
export const MY = 2
export const BASE_COLOR = '#ebebeb'

type Dimensions = {
	/**
	 * the `width` of the skeleton element.
	 */
	w?: number
	/**
	 * the `height` of the skeleton element
	 */
	h?: number
	/**
	 * the `border radius` of the skeleton element
	 * @default 3
	 */
	rounded?: number
	/**
	 * the `horizontal mragin` of the skeleton element
	 * @default 2
	 */
	mx?: number
	/**
	 * the `vertical mragin` of the skeleton element
	 * @default 2
	 */
	my?: number
}

type Speed = 400 | 500 | 700 | 1000
type Circle = { radius: number }

export type Skeleton = {
	color?: string
	speed?: Speed
	circle?: Circle
	stagger?: number
}

type SkeletonProps = Skeleton & Dimensions

export default function Skeleton({
	w,
	h,
	rounded = BORDER_RADIUS,
	mx = MX,
	my = MY,
	color = BASE_COLOR,
	speed = 500,
	circle,
	stagger,
}: SkeletonProps) {
	const background = useSharedValue(0)
	const animatedBackground = useAnimatedStyle(() => {
		'worklet'
		return {
			opacity: background.value,
		}
	})

	const dimensions = { width: w, height: h }
	const determineType = circle
		? {
				borderRadius: circle.radius,
				width: circle.radius,
				height: circle.radius,
		  }
		: dimensions
	const styles = {
		borderRadius: rounded,
		marginHorizontal: mx,
		marginVertical: my,
		backgroundColor: color,
		...determineType,
	}

	useEffect(() => {
		background.value = stagger
			? withDelay(stagger * 100, withRepeat(withTiming(1, { duration: speed }), Infinity, true))
			: withRepeat(withTiming(1, { duration: speed }), Infinity, true)
	}, [])

	return <Animated.View style={[styles, animatedBackground]} />
}
