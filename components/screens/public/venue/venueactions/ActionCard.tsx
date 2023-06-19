import { uniqueId } from 'lodash'
import { Box } from 'native-base'
import { useWindowDimensions } from 'react-native'

type Props = {
	children: React.ReactNode
	numColumns: number
	bg?: string
	h?: number
}

export default function ActionCard({ children, numColumns, bg, h }: Props) {
	const { width } = useWindowDimensions()
	const itemPadding = (width / 33.33) * numColumns

	return (
		<Box
			key={uniqueId()}
			width={width}
			flexDir={'column'}
			padding={'10px'}
			justifyContent={'center'}
			shadow={5}
			_dark={{
				bg: bg || 'dark.100',
			}}
			_light={{
				bg: bg || 'light.200',
			}}
			style={{
				width: (width - itemPadding) / numColumns,
				alignItems: 'center',
			}}
			borderRadius={'lg'}
			h={h}
		>
			{children}
		</Box>
	)
}
