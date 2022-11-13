import { useReactiveVar } from '@apollo/client'
import { ThemeReactiveVar } from '@reactive'
import { useColorScheme } from 'react-native'

const useThemeColorScheme = () => {
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const deviceColorScheme = useColorScheme()

	if (rThemeVar.colorScheme === 'system') {
		return deviceColorScheme
	}
	return rThemeVar.colorScheme
}

export default useThemeColorScheme
