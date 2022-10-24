import * as colors from '../../../colors'

const state = {
	active: {
		background: {
			primary: colors.orange.A700,
		},
		color: {
			primary: colors.orange.A700,
		},
	},
	contrast: {
		background: {
			primary: colors.common.black,
			secondary: colors.common.white,
		},
		color: {
			primary: colors.common.white,
			secondary: colors.common.black,
		},
	},
	success: {
		background: {
			primary: colors.green[100],
			secondary: colors.green.A400,
		},
		color: {
			primary: colors.green.A400,
			secondary: colors.common.black,
		},
	},
	highlight: {
		background: {
			primary: colors.orange.A700,
			secondary: '#257CFF',
		},
		color: {
			primary: colors.grey[50],
			secondary: colors.grey[900],
			tertiary: colors.orange.A700,
		},
	},
	error: {
		background: colors.red[500],
		color: {
			primary: colors.grey[50],
			secondary: colors.grey[900],
			tertiary: colors.red[500],
		},
	},
	warning: {
		background: colors.yellow[400],
		color: {
			primary: colors.yellow[500],
			secondary: colors.grey[900],
		},
	},
	disabled: {
		background: colors.grey[500],
		color: {
			primary: colors.grey[700],
			secondary: colors.grey[200],
		},
	},
}

export default state
