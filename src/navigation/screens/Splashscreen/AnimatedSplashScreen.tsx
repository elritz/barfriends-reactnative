import useCachedResources from '@util/hooks/local/useCachedResources'
import { Asset } from 'expo-asset'
import Constants from 'expo-constants'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { View, Animated, StyleSheet } from 'react-native'

function AnimatedSplashScreen({ children, image }) {
	const animation = useMemo(() => new Animated.Value(1), [])
	const [isAppReady, setAppReady] = useState(false)
	const [isSplashAnimationComplete, setAnimationComplete] = useState(false)
	const isCacheComplete = useCachedResources()
	const onLayoutRootView = useCallback(async () => {}, [isCacheComplete])

	useEffect(() => {
		if (isAppReady) {
			Animated.timing(animation, {
				toValue: 0,
				duration: 1000,
				useNativeDriver: true,
			}).start(() => setAnimationComplete(true))
		}
	}, [isAppReady])

	const onImageLoaded = useCallback(async () => {
		try {
			await SplashScreen.hideAsync()
			// Load stuff
			await Promise.all([])
		} catch (e) {
			// handle errors
		} finally {
			setAppReady(true)
		}
	}, [])

	console.log(
		'🚀 ~ file: AnimatedSplashScreen.tsx ~ line 71 ~ AnimatedSplashScreen ~ isAppReady',
		isAppReady,
		isSplashAnimationComplete,
	)

	return (
		<View style={{ flex: 1 }}>
			{isAppReady && children}
			{!isSplashAnimationComplete && (
				<Animated.View
					pointerEvents='none'
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: Constants.manifest.splash.backgroundColor,
							opacity: animation,
						},
					]}
				>
					<Animated.Image
						style={{
							width: '100%',
							height: '100%',
							resizeMode: 'contain',
							transform: [
								{
									scale: animation,
								},
							],
						}}
						source={image}
						onLoadEnd={onImageLoaded}
						fadeDuration={0}
					/>
				</Animated.View>
			)}
		</View>
	)
}

export default AnimatedSplashScreen
