import { useReactiveVar } from '@apollo/client'
import VectorFonts from '@helpers/VectorFonts'
import { ThemeReactiveVar } from '@reactive'
import { cacheFonts, cacheImages } from '@util/hooks/local/useCacheImages'
import useCachedResources from '@util/hooks/local/useCachedResources'
import { Asset } from 'expo-asset'
import Constants from 'expo-constants'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { View, Animated, StyleSheet, useColorScheme } from 'react-native'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'

function AnimatedSplashScreen({ children, image }) {
	const colorScheme = useThemeColorScheme()
	const animation = useMemo(() => new Animated.Value(1), [])
	const [isAppReady, setAppReady] = useState(false)
	const [isSplashAnimationComplete, setAnimationComplete] = useState(false)
	const rThemeVar = useReactiveVar(ThemeReactiveVar)

	useEffect(() => {
		if (isAppReady) {
			Animated.timing(animation, {
				toValue: 0,
				duration: 200,
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
		<View
			style={{
				position: 'absolute',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				// backgroundColor: colorScheme === 'dark' ? '#0d0d0d' : '#f1f1f1',
				backgroundColor: colorScheme === 'dark' ? '#0d0d0d' : '#f1f1f1',
				flex: 1,
			}}
		>
			{isAppReady && children}
			{!isSplashAnimationComplete && (
				<Animated.View
					pointerEvents='none'
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: colorScheme === 'dark' ? '#0d0d0d' : '#f1f1f1',
						},
					]}
				>
					<Animated.Image
						style={{
							width: '100%',
							height: '100%',
							resizeMode: 'contain',
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
