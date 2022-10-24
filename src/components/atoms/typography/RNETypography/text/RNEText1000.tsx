import * as React from 'react'
import { StyleProp, TextStyle } from 'react-native'
import { Text, TextProps } from '@rneui/themed'
import styled from 'styled-components/native'

const TextStyled = styled(Text)(props => ({
	fontSize: 40,
	letterSpacing: -0.2,
	fontWeight: 500,
}))

type Props = {
	style?: StyleProp<TextStyle>
	children: React.ReactNode
}
const RNEText1000 = (props: Props & TextProps) => (
	<TextStyled {...props}>{props.children}</TextStyled>
)

export default RNEText1000
