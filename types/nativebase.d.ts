import { nativeBaseTheme } from '@constants/theme/default/nativebase'

// 2. Get the type of the CustomTheme
type CustomThemeType = typeof nativeBaseTheme

// 3. Extend the internal NativeBase Theme
declare module '@gluestack-style/react' {
	interface ICustomConfig extends Config {}
}
