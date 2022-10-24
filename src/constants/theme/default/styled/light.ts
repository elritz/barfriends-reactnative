import StyledLayout from '../styled/layout'
import StyledPallete from '../styled/palette/light'

const StyledTheme = {
	theme: 'light',
	palette: {
		...StyledPallete,
	},
} as const

export default StyledTheme
