import * as colors from '../../../colors'
import { lightCompanyColors, bfsCompanyColors } from '../../index'
import state from '../state'

const palette = {
	...state,
	bfscompany: {
		...bfsCompanyColors,
	},
	company: {
		...lightCompanyColors,
	},
	background: {
		paper: colors.grey[50],
	},
	button: {
		background: {
			primary: colors.orange.A700,
			secondary: colors.blue.A400,
		},
		color: {
			primary: colors.common.white,
			secondary: colors.common.white,
			tertiary: {
				primary: lightCompanyColors.primary,
				secondary: lightCompanyColors.secondary,
			},
		},
	},
	primary: {
		background: colors.grey[300],
		color: {
			primary: colors.grey[800],
			secondary: colors.grey[400],
		},
	},
	secondary: {
		background: colors.grey[50],
		color: {
			primary: colors.grey[800],
			secondary: colors.grey[400],
			tertiary: colors.grey[50],
		},
	},
	tertiary: {
		background: colors.grey[300],
		color: {
			primary: colors.grey[300],
			secondary: colors.grey[300],
			tertiary: colors.grey[300],
		},
	},
	quaternary: {
		background: colors.grey[800],
		color: {
			primary: colors.grey[50],
			secondary: colors.grey[300],
		},
	},
}

export default palette
