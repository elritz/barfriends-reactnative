import { Card, Heading } from 'native-base'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components/native'

type Props = {
	total: number
	primary?: boolean
}

const Total = (props: Props) => {
	const theme = useContext(ThemeContext)
	return (
		<Card
			style={{
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
			<Heading fontWeight={'black'} fontSize={14} color={'white'}>
				{props.total}
			</Heading>
		</Card>
	)
}

export default Total
{
	/* <Text>{props.totalType}</Text> */
}
