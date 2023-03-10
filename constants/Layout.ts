import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')

export default {
	window: {
		width,
		height,
	},
	isSmallDevice: width < 375,
}

export const TOP_TAB_BAR_HEIGHT: number = 50
export const TOP_SEARCH_INPUT_HEIGHT: number = 50
export const TOP_SEARCH_INPUT_PADDING_BOTTOM: number = 8
