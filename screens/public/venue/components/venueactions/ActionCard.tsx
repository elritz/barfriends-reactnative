import { Box } from 'native-base'
import React, { useContext } from 'react'
import { useWindowDimensions } from 'react-native'
import { ThemeContext } from 'styled-components/native'
import styled from 'styled-components/native'

type Props = {
	children: React.ReactNode
	numColumns: number
	bg?: string
}

export default function ActionCard({ children, numColumns, bg }: Props) {
	const { width } = useWindowDimensions()
	const themeContext = useContext(ThemeContext)
	const itemPadding = (width / 33.33) * numColumns

	return (
		<OuterView
			width={width}
			numColumns={numColumns}
			bg={bg || themeContext.palette.background.paper}
			style={{
				width: (width - itemPadding) / numColumns,
				alignItems: 'center',
				height: 190,
			}}
			borderRadius={'2xl'}
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
