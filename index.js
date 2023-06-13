import 'expo-router/entry';
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync().catch(() => {
	/* reloading the app might trigger some race conditions, ignore them */
})