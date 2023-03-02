import NavigationDragIcon from '@components/atoms/icons/navigationdragicon/NavigationDragIcon'
import { Stack } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'

export default () => {
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: 'transparent',
				},
				headerTitle: () => <NavigationDragIcon />,
				headerLeft: () => null,
			}}
		>
			<Stack.Screen name={'DeviceManagerModal'} />
		</Stack>
	)
}
