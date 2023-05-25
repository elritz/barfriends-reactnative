import { Box } from 'native-base'
import { useWindowDimensions } from 'react-native'
import styled from 'styled-components/native'

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
		<OuterView
			width={width}
			numColumns={numColumns}
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
		</OuterView>
	)
}

const OuterView = styled(Box)<{ width: number; numColumns: number }>(props => ({
	flexDirection: 'column',
	padding: 10,
	justifyContent: 'center',
	shadowRadius: 10,
}))
