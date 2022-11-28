import { useReactiveVar } from '@apollo/client'
import VectorFonts from '@helpers/VectorFonts'
import { ThemeReactiveVar } from '@reactive'
import { cacheFonts, cacheImages } from '@util/hooks/local/useCacheImages'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, Image, useColorScheme } from 'react-native'

function AnimatedSplashScreen({ children, assets }) {
	const deviceColorScheme = useColorScheme()
	const colorScheme = useThemeColorScheme()
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const [isSplashAnimationComplete, setAnimationComplete] = useState(false)
	const [isAppReady, setAppReady] = useState(false)

	useEffect(() => {
		if (isAppReady) {
			setTimeout(() => setAnimationComplete(true), 2000)
		}
	}, [isAppReady])

	const loadResourcesAndDataAsync = async () => {
		try {
			const imageAssets = cacheImages([])
			const fontAssets = cacheFonts([...VectorFonts])

			// Load fonts
			// await Font.loadAsync({
			// 	// eslint-disable-next-line global-require
			// 	'space-mono': require('../../../assets/fonts/SpaceMono-Regular.ttf'),
			// })

			await Promise.all([...imageAssets, ...fontAssets])
		} catch (e) {
			console.warn(e)
		}
	}

	const onImageLoaded = useCallback(async () => {
		try {
			// Load stuff
			setTimeout(() => SplashScreen.hideAsync(), 2000)

			// Load stuff
			// await Promise.all([loadResourcesAndDataAsync])
			await loadResourcesAndDataAsync()
		} catch (e) {
			// handle errors
		} finally {
			setAppReady(true)
		}
	}, [])

	return (
		<View
			style={{
				flex: 1,
			}}
		>
			{isAppReady && children}
			{!isSplashAnimationComplete && (
				<View
					pointerEvents='none'
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: colorScheme === 'dark' ? '#0d0d0d' : '#f1f1f1',
						},
					]}
				>
					<Image
						onLoad={onImageLoaded}
						fadeDuration={0}
						source={
							rThemeVar.colorScheme === 'system'
								? deviceColorScheme === 'light'
									? assets[0]
									: assets[1]
								: rThemeVar.colorScheme === 'light'
								? assets[0]
								: assets[1]
						}
						style={{
							width: '100%',
							height: '100%',
							resizeMode: 'cover',
						}}
					/>
				</View>
			)}
		</View>
	)
}

export default AnimatedSplashScreen
