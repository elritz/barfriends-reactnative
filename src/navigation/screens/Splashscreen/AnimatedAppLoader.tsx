import AnimatedSplashScreen from '@navigation/screens/Splashscreen/AnimatedSplashScreen'
import { Asset } from 'expo-asset'
import { useEffect, useState } from 'react'

function AnimatedAppLoader({ children, assets }) {
	const [isAppSplashIsReady, setAppSplashIsReady] = useState(false)

	useEffect(() => {
		async function prepare() {
			try {
				// Artificially delay for two seconds to simulate a slow loading
				// experience. Please remove this if you copy and paste the code!
				// await loadResourcesAndDataAsync()
				// await new Promise(resolve => setTimeout(() => setAppSplashIsReady(true), 500))
				// assets.map(async item => {
				// 	await Asset.fromURI(item.localUri).downloadAsync()
				// })
				setAppSplashIsReady(true)
			} catch (e) {
				console.warn(e)
			}
		}
		prepare()
	}, [assets])

	if (!isAppSplashIsReady) {
		return null
	}

	return <AnimatedSplashScreen assets={assets}>{children}</AnimatedSplashScreen>
}

export default AnimatedAppLoader
