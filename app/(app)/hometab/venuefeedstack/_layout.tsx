import SearchInputDisabled from '@components/molecules/search/commoninput/SearchInputDisabled'
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { Stack, useRouter } from 'expo-router'
import { VStack } from 'native-base'
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
				header: () => {
					return (
						<VStack
							justifyContent={'flex-end'}
							h={h}
							pb={2}
							_light={{ bg: 'light.100' }}
							_dark={{ bg: 'dark.50' }}
						>
							<SearchInputDisabled
								onPress={() =>
									router.push({
										pathname: '(app)/hometab/explorestack/searchtext',
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
		>
			<Stack.Screen name={'index'} />
		</Stack>
	)
}
