import AnimatedSplashScreen from './AnimatedSplashScreen'
import { useReactiveVar } from '@apollo/client'
import { ThemeReactiveVar } from '@reactive'
import { useAssets } from 'expo-asset'
import { useColorScheme } from 'react-native'

function AnimatedAppLoader({ children }) {
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const deviceColorScheme = useColorScheme()

	const [assets, error] = useAssets([
		require('../../../assets/images/splash/splash.light.png'),
		require('../../../assets/images/splash/splash.dark.png'),
	])

	if (!assets) return null

	return (
		<AnimatedSplashScreen
			image={
				rThemeVar.colorScheme === 'system'
					? deviceColorScheme === 'light'
						? assets[0]
						: assets[1]
					: rThemeVar.colorScheme === 'light'
					? assets[0]
					: assets[1]
			}
		>
			{children}
		</AnimatedSplashScreen>
	)
}

export default AnimatedAppLoader
