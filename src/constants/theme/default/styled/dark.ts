import StyledLayout from '../styled/layout'
import StyledPallete from '../styled/palette/dark'

const StyledTheme = {
	theme: 'dark',
	palette: {
		...StyledPallete,
	},
} as const

export default StyledTheme
