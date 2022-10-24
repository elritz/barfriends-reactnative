import { StyleProp, TextStyle } from 'react-native'
import { Text, TextProps } from '@rneui/themed'
import styled from 'styled-components/native'

const TextStyled = styled(Text)(props => ({
	fontSize: 12,
	fontWeight: 800,
	color: props.theme.palette.primary.color.primary,
}))

type Props = {
	style?: StyleProp<TextStyle>
	children: React.ReactNode
}

const RNEHeading300 = (props: Props & TextProps) => (
	<TextStyled {...props}>{props.children}</TextStyled>
)

export default RNEHeading300
