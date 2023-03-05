import { IColor } from '@ctypes/app'
import { MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { Icon } from 'native-base'

export default function _layout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name={'privacy'}
				options={{
					tabBarIcon: ({ color }: IColor) => (
						<Icon color={color} name={'privacy-tip'} as={MaterialIcons} size={'lg'} />
					),
					tabBarLabelStyle: {
						fontSize: 13,
						fontWeight: '600',
					},
				}}
			/>
			<Tabs.Screen
				name={'services'}
				options={{
					tabBarIcon: ({ color }: IColor) => (
						<Icon color={color} name={'room-service'} as={MaterialIcons} size={'lg'} />
					),
					tabBarLabelStyle: {
						fontSize: 13,
						fontWeight: '600',
					},
				}}
			/>
		</Tabs>
	)
}
