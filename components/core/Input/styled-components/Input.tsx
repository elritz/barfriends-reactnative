// @ts-nocheck
import { styled } from '../../styled'
import { TextInput } from 'react-native'

export default styled(
	TextInput,
	{
		flex: 1,
    _light:{
      color: '$textLight900',
    },
		_dark: {
			color: '$textDark900',
		},
		_web: {
			cursor: 'text',
			':disabled': {
				cursor: 'not-allowed',
			},
		},
	},
	{ ancestorStyle: ['_input'], resolveProps: ['placeholderTextColor'] },
	{
		propertyTokenMap: {
			placeholderTextColor: 'colors',
		},
	},
)
