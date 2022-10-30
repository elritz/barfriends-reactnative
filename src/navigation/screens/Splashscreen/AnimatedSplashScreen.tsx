import VectorFonts from '@helpers/VectorFonts'
import { cacheFonts, cacheImages } from '@util/hooks/local/useCacheImages'
import useCachedResources from '@util/hooks/local/useCachedResources'
import { Asset } from 'expo-asset'
import Constants from 'expo-constants'
import * as Font from 'expo-font'
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
				duration: 500,
				useNativeDriver: true,
			}).start(() => setAnimationComplete(true))
		}
	}, [isAppReady])

	async function loadResourcesAndDataAsync() {
		try {
			const imageAssets = cacheImages([])
			const fontAssets = cacheFonts([...VectorFonts])

			// Load fonts
			await Font.loadAsync({
				// eslint-disable-next-line global-require
				'space-mono': require('../../../assets/fonts/SpaceMono-Regular.ttf'),
			})

			await Promise.all([...imageAssets, ...fontAssets])
			// await new Promise(resolve => setTimeout(resolve, 2000))
		} catch (e) {
			console.warn(e)
		} finally {
		}
	}

	const onImageLoaded = useCallback(async () => {
		try {
			await SplashScreen.hideAsync()
			// Load stuff
			await Promise.all([loadResourcesAndDataAsync])
		} catch (e) {
			// handle errors
		} finally {
			setAppReady(true)
		}
	}, [])

	return (
		<View style={{ flex: 1 }}>
			{isAppReady && children}
			{!isSplashAnimationComplete && (
				<Animated.View
					pointerEvents='none'
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: '#1d1d1d',
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
