import StyledLayout from './layout'
import StyledPallete from './palette/dark'

const StyledTheme = {
	theme: 'dark',
	palette: {
		...StyledPallete,
	},
} as const

export default StyledTheme
