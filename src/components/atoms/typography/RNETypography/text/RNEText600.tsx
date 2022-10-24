import * as React from 'react'
import { StyleProp, TextStyle } from 'react-native'
import { Text, TextProps } from '@rneui/themed'
import styled from 'styled-components/native'

type Props = {
	style?: StyleProp<TextStyle>
	children: React.ReactNode
}

const RNEText600 = (props: Props & TextProps) => {

	const TextStyled = styled(Text)(props => ({
		fontSize: 20,
		letterSpacing: -0.50,
		fontWeight: 500,
	}))

	return (
		<TextStyled {...props}>{props.children}</TextStyled>
	)
}
export default RNEText600
