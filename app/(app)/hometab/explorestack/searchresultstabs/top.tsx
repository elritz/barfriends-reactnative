import { TOP_SEARCH_INPUT_HEIGHT, TOP_TAB_BAR_HEIGHT } from './_layout'
import { Box, ScrollView } from 'native-base'
import React from 'react'
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function accounts() {
	const insets = useSafeAreaInsets()
	return (
		<ScrollView
			flex={1}
			height={'100%'}
			contentInset={{
				top: insets.top + TOP_TAB_BAR_HEIGHT + TOP_SEARCH_INPUT_HEIGHT,
			}}
		>
			<Box flex={1} bg={'green.600'} justifyContent={'center'} alignItems={'center'}>
				<Text>top</Text>
			</Box>
		</ScrollView>
	)
}
