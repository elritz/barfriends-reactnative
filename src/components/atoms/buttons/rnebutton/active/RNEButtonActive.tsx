import { Button, ButtonProps } from '@rneui/themed'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components/native'

const RNEButtonActive = (props: ButtonProps) => {
	const theme = useContext(ThemeContext)
	return (
		<Button
			buttonStyle={{
				backgroundColor: theme.palette.active.background.primary,
			}}
			{...props}
		/>
	)
}

export default RNEButtonActive
