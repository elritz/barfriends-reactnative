import StyledPallete from './palette/light'

const StyledTheme = {
	theme: 'light',
	palette: {
		...StyledPallete,
	},
} as const

export default StyledTheme
