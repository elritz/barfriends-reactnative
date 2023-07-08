import { SplashVideo } from './SplashVideo'
import Constants from 'expo-constants'
import { SplashScreen } from 'expo-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'

function AnimatedVideoSplashScreen({ children }) {
	const animation = useMemo(() => new Animated.Value(1), [])
	const [isAppReady, setAppReady] = useState(false)
	const [isSplashVideoComplete, setSplashVideoComplete] = useState(false)
	const [isSplashAnimationComplete, setAnimationComplete] = useState(false)

	useEffect(() => {
		if (isAppReady && isSplashVideoComplete) {
			Animated.timing(animation, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
			}).start(() => setAnimationComplete(true))
		}
	}, [isAppReady, isSplashVideoComplete])

	const onImageLoaded = useCallback(async () => {
		try {
			SplashScreen.hideAsync()
			// Load stuff
			await Promise.all([])
		} catch (e) {
			// handle errors
		} finally {
			setAppReady(true)
		}
	}, [])

	const videoElement = useMemo(() => {
		return (
			<SplashVideo
				onLoaded={onImageLoaded}
				onFinish={() => {
					setSplashVideoComplete(true)
				}}
			/>
		)
	}, [onImageLoaded, setSplashVideoComplete])
	return (
		<View style={{ flex: 1 }}>
			{isAppReady && children}
			{!isSplashAnimationComplete && (
				<Animated.View
					pointerEvents='none'
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: Constants?.manifest?.splash?.backgroundColor,
							opacity: animation,
						},
					]}
				>
					{videoElement}
				</Animated.View>
			)}
		</View>
	)
}
export default AnimatedVideoSplashScreen
