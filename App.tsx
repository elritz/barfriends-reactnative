// export default STORYBOOK_START ? require('./storybook').default : require('./src/index').default
// import * as Sentry from 'sentry-expo'
import 'expo-router/entry'
import * as SplashScreen from 'expo-splash-screen'

// import { LogBox } from 'react-native'

// LogBox.ignoreLogs([
// 	"No native splash screen registered for given view controller. Call 'SplashScreen.show' for given view controller first.",
// ])
SplashScreen.preventAutoHideAsync()
	// .then(result => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
	.catch(console.warn)

// export default require('./src/index').default
// export default Sentry.Native.wrap(require('./src/index').default)
