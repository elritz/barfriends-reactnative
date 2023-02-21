import { useReactiveVar } from '@apollo/client'
import { ThemeReactiveVar } from '@reactive'
import { ColorSchemeName, useColorScheme } from 'react-native'

const useThemeColorScheme = (): ColorSchemeName => {
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const deviceColorScheme = useColorScheme()

	if (rThemeVar.localStorageColorScheme === 'system') {
		return deviceColorScheme
	}
	return rThemeVar.localStorageColorScheme
}

export default useThemeColorScheme
