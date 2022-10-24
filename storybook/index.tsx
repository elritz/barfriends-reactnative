// if you use expo remove this line
import { withKnobs } from '@storybook/addon-knobs'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { addDecorator, addParameters, configure, getStorybookUI } from '@storybook/react-native'
import './rn-addons'

// enables knobs for all stories
addDecorator(withKnobs)
addParameters({
	viewport: {
		viewports: INITIAL_VIEWPORTS,
		defaultViewport: 'iphone5',
	},
	options: {
		addonPanelInRight: true,
	},
})

configure(() => {
	require('./stories/index')
}, module)

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
	asyncStorage:
		require('@react-native-async-storage/async-storage').default ||
		require('react-native').AsyncStorage ||
		null,
	// port: 7007, host: 'localhost'
})
// const StorybookUIRoot = getStorybookUI({ port: 7007, host: 'localhost' });

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you should remove this line.
// AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default StorybookUIRoot
