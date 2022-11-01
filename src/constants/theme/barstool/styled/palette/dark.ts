import * as colors from '../../../colors'
import { darkCompanyColors, bfsCompanyColors } from '../../index'
import state from '../state'

const palette = {
	...state,
	bfscompany: {
		...bfsCompanyColors,
	},
	company: {
		...darkCompanyColors,
	},
	background: {
		paper: colors.grey[900],
	},
	button: {
		background: {
			primary: darkCompanyColors.primary,
			secondary: colors.blue.A400,
		},
		color: {
			primary: colors.common.white,
			secondary: colors.common.white,
			tertiary: {
				primary: darkCompanyColors.primary,
				secondary: darkCompanyColors.tertiary,
			},
		},
	},
	primary: {
		background: '#111111',
		color: {
			primary: colors.grey[100],
			secondary: colors.grey[700],
		},
	},
	secondary: {
		background: colors.grey[800],
		color: {
			primary: colors.grey[100],
			secondary: colors.grey[200],
			tertiary: colors.grey[500],
		},
	},
	tertiary: {
		background: colors.grey[700],
		color: {
			primary: colors.grey[100],
			secondary: colors.grey[400],
		},
	},
	quaternary: {
		background: colors.grey[300],
		color: {
			primary: colors.grey[100],
			secondary: colors.grey[800],
		},
	},
}

export default palette
