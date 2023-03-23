import SearchInputDisabled from '@components/molecules/search/commoninput/SearchInputDisabled'
import SearchTextScreenInput from '@components/molecules/search/searchtext/SearchTextScreenInput'
import SearchTopTabStackInput from '@components/molecules/search/searchtoptabs/SearchTopTabStackInput'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { Stack, useRouter } from 'expo-router'
import { Box, VStack } from 'native-base'
import { Platform, StyleSheet, View } from 'react-native'

export default function _layout() {
	const colorScheme = useThemeColorScheme()
	const router = useRouter()

	return (
		<Stack
			initialRouteName='index'
			screenOptions={{
				headerShown: true,
				headerTransparent: true,
				gestureDirection: 'horizontal',
			}}
		>
			<Stack.Screen
				options={{
					header: () => {
						return (
							<VStack justifyContent={'flex-end'} safeAreaTop pb={2}>
								<Box
									_light={{ bg: 'light.50' }}
									_dark={{ bg: 'dark.50' }}
									style={[StyleSheet.absoluteFill]}
								/>
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
				name={'index'}
			/>
			<Stack.Screen
				name={'searchtext'}
				options={{
					headerTransparent: true,
					animation: 'fade',
					header: () => {
						return (
							<VStack justifyContent={'flex-end'} safeAreaTop pb={2}>
								<Box
									_light={{ bg: 'light.50' }}
									_dark={{ bg: 'dark.50' }}
									style={[StyleSheet.absoluteFill]}
								/>

								<SearchTextScreenInput />
							</VStack>
						)
					},
				}}
			/>
			<Stack.Screen
				name={'searchresults'}
				options={{
					headerTransparent: true,
					headerShown: true,
					header: () => {
						return (
							<VStack safeAreaTop justifyContent={'flex-end'} pb={2}>
								{Platform.OS === 'ios' ? (
									<BlurView style={StyleSheet.absoluteFill} tint={colorScheme} intensity={80} />
								) : (
									<Box
										_light={{ bg: 'light.50' }}
										_dark={{ bg: 'dark.50' }}
										style={[StyleSheet.absoluteFill]}
									/>
								)}
								<SearchTopTabStackInput />
							</VStack>
						)
					},
				}}
			/>
		</Stack>
	)
}
