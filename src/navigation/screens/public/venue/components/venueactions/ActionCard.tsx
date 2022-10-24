import { Box } from 'native-base'
import React, { useContext } from 'react'
import { useWindowDimensions } from 'react-native'
import { ThemeContext } from 'styled-components/native'
import styled from 'styled-components/native'

export default function ActionCard({ children, numColumns }) {
	const { width } = useWindowDimensions()
	const themeContext = useContext(ThemeContext)
	const itemPadding = (width / 33.33) * numColumns

	return (
		<OuterView
			width={width}
			numColumns={numColumns}
			_light={{
				bg: 'light.50',
			}}
			_dark={{
				bg: 'light.800',
			}}
			style={{
				width: (width - itemPadding) / numColumns,
				alignItems: 'center',
				height: 215,
				borderRadius: 20,
				marginVertical: 5,
			}}
		>
			{children}
		</OuterView>
	)
}

const OuterView = styled(Box)<{ width: number; numColumns: number }>(props => ({
	// background: props.theme.palette.background.paper,
	flexDirection: 'column',
	padding: 10,
	justifyContent: 'center',
	shadowRadius: 10,
	borderRadius: 16,
}))
