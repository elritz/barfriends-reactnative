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
				headerShown: true,
				headerTransparent: true,
				gestureDirection: 'horizontal',
				header: () => {
					return (
						<VStack height={HOME_TAB_TOP_NAIGATION_HEIGHT} justifyContent={'flex-end'} pb={2}>
							{Platform.OS === 'ios' ? (
								<BlurView style={StyleSheet.absoluteFill} tint={colorScheme} intensity={80} />
							) : (
								<Box
									_light={{ bg: 'light.50' }}
									_dark={{ bg: 'dark.50' }}
									style={[StyleSheet.absoluteFill]}
								/>
							)}
							<VenueFeedSearchInput />
						</VStack>
					)
				},
			}}
		>
			<Stack.Screen name={'index'} />
		</Stack>
	)
}
