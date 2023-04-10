import VenueFeedSearchInput from '@components/molecules/search/venuefeed/VenueFeedSearchInput'
import { Stack } from 'expo-router'
import { Box, VStack } from 'native-base'
import { StyleSheet } from 'react-native'

export default function _layout() {
	return (
		<Stack
			initialRouteName='index'
			screenOptions={{
				headerShown: false,
				header: () => {
					return (
						<VStack justifyContent={'flex-end'} safeAreaTop pb={2}>
							<Box
								_light={{ bg: 'light.50' }}
								_dark={{ bg: 'dark.50' }}
								style={[StyleSheet.absoluteFill]}
							/>
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
