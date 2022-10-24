import { useContext } from 'react'
import * as React from 'react'

import { Button, ButtonProps } from '@rneui/base'
import { ThemeContext } from 'styled-components/native'

const RNEButtonPrimary = (props: ButtonProps) => {
	const theme = useContext(ThemeContext)
	return (
		<Button
			buttonStyle={{
				backgroundColor: theme.palette.primary.background,
			}}
			titleStyle={{
				color: theme.palette.primary.color.primary,
			}}
			{...props}
		/>
	)
}

export default RNEButtonPrimary
