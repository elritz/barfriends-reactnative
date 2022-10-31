import AnimatedSplashScreen from './AnimatedSplashScreen'
import useCachedResources from '@util/hooks/local/useCachedResources'
import { Asset, useAssets } from 'expo-asset'
import { useCallback, useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'

function AnimatedAppLoader({ children }) {
	const colorScheme = useColorScheme()
	// function AnimatedAppLoader({ children, image }) {
	// const [isSplashReady, setSplashReady] = useState(false);

	// useEffect(() => {
	//   async function prepare() {
	//     await Asset.fromURI(image.uri).downloadAsync();
	//     setSplashReady(true);
	//   }

	//   prepare();
	// }, [image]);
	const [assets, error] = useAssets([
		require('../../../assets/images/splash/splash.light.png'),
		require('../../../assets/images/splash/splash.dark.png'),
	])

	if (!assets) return null
	// if (!isSplashReady) {
	//   return null;
	// }

	console.log('🚀 ~ file: AnimatedAppLoader.tsx ~ line 32 ~ AnimatedAppLoader ~ assets', assets)
	return (
		<AnimatedSplashScreen image={colorScheme === 'light' ? assets[0] : assets[1]}>
			{children}
		</AnimatedSplashScreen>
	)
	// return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>
}

export default AnimatedAppLoader
