import { TOP_SEARCH_INPUT_HEIGHT, TOP_TAB_BAR_HEIGHT } from '@constants/Layout'
import { Box, ScrollView } from 'native-base'
import React from 'react'
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function accounts() {
	const insets = useSafeAreaInsets()
	return (
		<ScrollView
			contentInset={{
				top: insets.top + TOP_TAB_BAR_HEIGHT + TOP_SEARCH_INPUT_HEIGHT,
			}}
		>
			<Box height={'100%'} flex={1} bg={'yellow.600'} justifyContent={'center'} alignItems={'center'}>
				<Text>accounts</Text>
			</Box>
		</ScrollView>
	)
}
