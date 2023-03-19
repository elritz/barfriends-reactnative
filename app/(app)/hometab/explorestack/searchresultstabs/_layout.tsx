import SearchTopTabStackInput from '@components/molecules/search/searchtoptabs/SearchTopTabStackInput'
import {
	TOP_SEARCH_INPUT_HEIGHT,
	TOP_TAB_BAR_HEIGHT,
	TOP_SEARCH_INPUT_PADDING_BOTTOM,
} from '@constants/Layout'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { Stack, Tabs, useRouter, useSearchParams } from 'expo-router'
import { Box, VStack } from 'native-base'
import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function _layout() {
	const colorScheme = useThemeColorScheme()
	const router = useRouter()
	const params = useSearchParams()
	const insets = useSafeAreaInsets()

	return (
		<Tabs
			initialRouteName='index'
			screenListeners={{}}
			screenOptions={{
				headerShown: true,
				tabBarItemStyle: {
					height: 40,
				},
				tabBarStyle: {
					position: 'absolute',
					top: insets.top + TOP_SEARCH_INPUT_HEIGHT,
					height: TOP_TAB_BAR_HEIGHT,
					backgroundColor: 'blue',
					paddingTop: 5,
				},
				tabBarIconStyle: {
					height: 20,
				},
				headerTransparent: true,
				header: () => {
					return (
						<Box
							style={{
								flexDirection: 'column-reverse',
							}}
							safeAreaTop
							height={insets.top + TOP_SEARCH_INPUT_HEIGHT}
							pb={`${TOP_SEARCH_INPUT_PADDING_BOTTOM}px`}
						>
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
						</Box>
					)
				},
			}}
		>
			<Tabs.Screen
				name={'accounts'}
				initialParams={{
					searchText: params?.searchText,
				}}
			/>
			<Tabs.Screen
				name={'venues'}
				initialParams={{
					searchText: params?.searchText,
				}}
			/>
			<Tabs.Screen
				name={'top'}
				initialParams={{
					searchText: params?.searchText,
				}}
			/>
		</Tabs>
	)
}
