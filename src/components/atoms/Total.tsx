import RNEHeading600 from '@components/atoms/typography/RNETypography/heading/RNEHeading600'
import { Card } from '@rneui/base'
import { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'

type Props = {
	total: number
	primary?: boolean
}

const CardStyled = styled(Card)(props => ({
	// background: props.theme.palette.company.secondary,
}))

const Total = (props: Props) => {
	const theme = useContext(ThemeContext)
	return (
		<CardStyled
			containerStyle={{
				backgroundColor: props.primary
					? theme.palette.company.primary
					: theme.palette.company.secondary,
				height: 30,
				width: 30,
				borderRadius: 7,
				padding: 0,
				margin: 0,
				marginHorizontal: 5,
				alignItems: 'center',
				justifyContent: 'center',
				borderColor: 'transparent',
			}}
		>
			<RNEHeading600 style={{ fontSize: 14, color: 'white' }}>{props.total}</RNEHeading600>
		</CardStyled>
	)
}

export default Total
{
	/* <Text>{props.totalType}</Text> */
}
