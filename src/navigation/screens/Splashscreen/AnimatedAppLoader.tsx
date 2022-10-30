import AnimatedSplashScreen from './AnimatedSplashScreen'
import useCachedResources from '@util/hooks/local/useCachedResources'
import { Asset } from 'expo-asset'
import { useCallback, useEffect, useState } from 'react'

function AnimatedAppLoader({ children, image }) {
	const [isSplashReady, setSplashReady] = useState(false)

	useEffect(() => {
		async function prepare() {
			const [{ localUri }] = await Asset.loadAsync(image.uri)
			console.log('🚀 ~ file: AnimatedAppLoader.tsx ~ line 12 ~ prepare ~ localUri', localUri)
			setSplashReady(true)
		}

		prepare()
	}, [image])

	if (!isSplashReady) {
		return null
	}

	return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>
}

export default AnimatedAppLoader
