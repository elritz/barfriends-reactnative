// export default STORYBOOK_START ? require('./storybook').default : require('./src/index').default
// import * as Sentry from 'sentry-expo'
import { DEVELOPMENT_FOREGROUND_LOCATION_TASK_NAME } from '@constants/TaskManagerConstants'
import * as SplashScreen from 'expo-splash-screen'
import 'expo-splash-screen'
import * as TaskManager from 'expo-task-manager'
import { LogBox } from 'react-native'

const STORYBOOK_START = false

LogBox.ignoreLogs([
	"No native splash screen registered for given view controller. Call 'SplashScreen.show' for given view controller first.",
])

// TaskManager.defineTask(DEVELOPMENT_FOREGROUND_LOCATION_TASK_NAME, ({ data, error }: any) => {
// 	console.log('🚀 -----------------------------------------------🚀')
// 	console.log('🚀 ~ file: DevelopmentScreen.tsx:62 ~ data', data)
// 	console.log('🚀 -----------------------------------------------🚀')

// 	if (error) {
// 		// check `error.message` for more details.
// 		return
// 	}
// 	if (data) {
// 		// console.log('🚀 ~ file: index.tsx ~ line 59 ~ TaskManager.defineTask ~ data', data)
// 		// Extract location coordinates from data
// 		// const { locations }: any = data
// 		const location = data.locations[0]
// 		if (location) {
// 			console.log('Location in foreground', JSON.stringify(location.coords, null, 4))
// 			return
// 		}
// 	}
// })

SplashScreen.preventAutoHideAsync().catch(() => {
	/* reloading the app might trigger some race conditions, ignore them */
})

export default require('./src/index').default
// export default Sentry.Native.wrap(require('./src/index').default)
