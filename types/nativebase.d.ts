import { nativeBaseTheme } from '@constants/theme/themes/default/nativebase'
import { extendTheme } from 'native-base'

// 2. Get the type of the CustomTheme
type CustomThemeType = typeof nativeBaseTheme

// 3. Extend the internal NativeBase Theme
declare module 'native-base' {
	interface ICustomTheme extends CustomThemeType {}
}
