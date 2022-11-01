import StyledPallete from './palette/dark'

const StyledTheme = {
	theme: 'dark',
	palette: {
		...StyledPallete,
	},
} as const

export default StyledTheme
