import { VStack } from '@components/core'
import SearchInput from '@components/molecules/search/searchinput/SearchInput'
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { Stack, useSegments } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const insets = useSafeAreaInsets()
	const HEADER_HEIGHT = SEARCH_BAR_HEIGHT + 15
	const h = insets.top + HEADER_HEIGHT
	const segments = useSegments()


	return (
		<Stack
			initialRouteName='hometab'
			screenOptions={{
				headerShown: segments.includes('messagestack') || segments.includes('venuefeed'),
				// headerShown: segments.some(i => {
				// 	if (i === 'messagestack' || i === 'venuefeed') {
				// 		return true
				// 	}
				// 	return false
				// }),
				header: () => {
					return (
						<VStack
							justifyContent={'flex-end'}
							sx={{
								pt: insets.top,
								h,
								_light: { bg: '$light100' },
								_dark: { bg: '$dark50' },
							}}
							pb={'$2'}
						>
							<SearchInput />
						</VStack>
					)
				},
			}}
		>
			<Stack.Screen
				name={'hometab'}
				options={{
					animation: 'fade',
				}}
			/>
			<Stack.Screen
				name={'explore'}
				options={{
					animation: 'fade',
				}}
			/>
			<Stack.Screen name={'modal'} />
			<Stack.Screen name={'public'} />
			<Stack.Screen
				name={'searcharea'}
				options={{
					animation: 'fade',
				}}
			/>
			<Stack.Screen name={'permission'} options={{ presentation: 'modal' }} />
			<Stack.Screen name={'settings'} options={{ presentation: 'fullScreenModal' }} />
		</Stack>
	)
}
