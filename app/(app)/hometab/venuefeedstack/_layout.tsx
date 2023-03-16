import VenueFeedSearchInput from '@components/molecules/search/venuefeed/VenueFeedSearchInput'
import { HOME_TAB_TOP_NAIGATION_HEIGHT } from '@constants/ReactNavigationConstants'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { Stack } from 'expo-router'
import { Box, VStack } from 'native-base'
import { Platform, StyleSheet, View } from 'react-native'

export default function _layout() {
	const colorScheme = useThemeColorScheme()

	return (
		<Stack
			initialRouteName='index'
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name={'index'} />
		</Stack>
	)
}
