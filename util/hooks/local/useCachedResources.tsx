import { cacheFonts, cacheImages } from './useCacheImages'
import VectorFonts from '@helpers/VectorFonts'
import * as Font from 'expo-font'
import { SplashScreen } from 'expo-router'
import { useEffect, useState } from 'react'

export default function useCachedResources() {
	const [isCacheComplete, setIsCacheComplete] = useState(false)

	// Load any resources or data that we need prior to rendering the app
	useEffect(() => {
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
				setIsCacheComplete(true)
				SplashScreen.hideAsync()
			}
		}
		loadResourcesAndDataAsync()
	}, [isCacheComplete])

	return isCacheComplete
}
