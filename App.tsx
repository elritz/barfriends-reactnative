import * as SplashScreen from 'expo-splash-screen'

const STORYBOOK_START = false
// export default STORYBOOK_START ? require('./storybook').default : require('./src/index').default

export default require('./src/index').default
