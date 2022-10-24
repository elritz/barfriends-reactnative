import { Button, ButtonProps } from '@rneui/themed'
import { useContext } from 'react'
import * as React from 'react'
import { ThemeContext } from 'styled-components/native'

const RNEButtonPrimary = (props: ButtonProps) => {
	const themeContext = useContext(ThemeContext)
	return (
		<Button
			buttonStyle={{
				backgroundColor: themeContext.palette.bfscompany.primary,
				borderRadius: 10,
			}}
			{...props}
		/>
	)
}

export default RNEButtonPrimary
