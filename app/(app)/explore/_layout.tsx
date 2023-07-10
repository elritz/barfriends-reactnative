import { Box, VStack } from '@components/core'
import SearchInputDisabled from '@components/molecules/search/commoninput/SearchInputDisabled'
import SearchTextScreenInput from '@components/molecules/search/searchtext/SearchTextScreenInput'
import SearchTopTabStackInput from '@components/molecules/search/searchtoptabs/SearchTopTabStackInput'
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { Stack, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function _layout() {
	const router = useRouter()
	const insets = useSafeAreaInsets()
	const HEADER_HEIGHT = SEARCH_BAR_HEIGHT + 15
	const h = insets.top + HEADER_HEIGHT

	return (
		<Stack
			initialRouteName='index'
			screenOptions={{
				headerShown: true,
				animation: 'fade',
			}}
		>
			<Stack.Screen
				options={{
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
								<SearchInputDisabled
									onPress={() =>
										router.push({
											pathname: '(app)/explore/searchtext',
											params: {
												searchtext: '',
											},
										})
									}
								/>
							</VStack>
						)
					},
				}}
				name={'index'}
			/>
			<Stack.Screen
				name={'searchtext'}
				options={{
					animation: 'fade',
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
								<SearchTextScreenInput />
							</VStack>
						)
					},
				}}
			/>
			<Stack.Screen
				name={'searchresults'}
				options={{
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
								<SearchTopTabStackInput />
							</VStack>
						)
					},
				}}
			/>
		</Stack>
	)
}
