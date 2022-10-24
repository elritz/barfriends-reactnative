import * as React from 'react'
import { StyleProp, TextStyle } from 'react-native'
import { Text, TextProps } from '@rneui/themed'
import styled from 'styled-components/native'

const TextStyled = styled(Text)(props => ({
	fontSize: 20,
	letterSpacing: -0.50,
	fontWeight: 800,
}))

type Props = {
	style?: StyleProp<TextStyle>
	children: React.ReactNode
}

const RNEHeading600 = (props: Props & TextProps) => (
	<TextStyled {...props}>{props.children}</TextStyled>
)

export default RNEHeading600
