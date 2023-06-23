import { styled } from '../../styled'
import { View } from 'react-native'

export default styled(
	View,
	{
		_dark: { bg: '$dark.100' },
		_light: { bg: '$light.400' },
	},
	{
		descendantStyle: ['_text'],
	},
)
