import { Heading } from '@components/core'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Card,  useTheme } from 'native-base'


type Props = {
	total: number
	primary?: boolean
}

const Total = (props: Props) => {
	const theme = useTheme()
	const colorScheme = useThemeColorScheme()
	return (
		<Card
			style={{
				backgroundColor: props.primary
					? theme.colors.primary[500]
					: colorScheme === 'light' ? theme.colors.light[900]:theme.colors.dark[900],,
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
			<Heading fontWeight={'$black'} fontSize={14} color={'white'}>
				{props.total}
			</Heading>
		</Card>
	)
}

export default Total
