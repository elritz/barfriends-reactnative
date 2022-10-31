import AnimatedSplashScreen from './AnimatedSplashScreen'
import { useAssets } from 'expo-asset'
import { useColorScheme } from 'react-native'

function AnimatedAppLoader({ children }) {
	const colorScheme = useColorScheme()

	const [assets, error] = useAssets([
		require('../../../assets/images/splash/splash.light.png'),
		require('../../../assets/images/splash/splash.dark.png'),
	])

	if (!assets) return null

	return (
		<AnimatedSplashScreen image={colorScheme === 'light' ? assets[0] : assets[1]}>
			{children}
		</AnimatedSplashScreen>
	)
}

export default AnimatedAppLoader
