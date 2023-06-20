import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import DevelopmentTab from '@components/molecules/tabbaricons/hometabicons/developmenttab'
import { IColor } from '@ctypes/app'
import { ENVIRONMENT } from '@env'
import { Stack } from 'expo-router'
import { Box, Text } from 'native-base'

export default () => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name={'index'}
				options={{
					header: () => {
						return (
							<Box safeAreaTop>
								<Text
									adjustsFontSizeToFit
									fontSize={'$3xl'}
									textAlign={'center'}
									textTransform={'capitalize'}
									fontWeight={'black'}
								>
									{String.fromCharCode(60)}
									{ENVIRONMENT} {String.fromCharCode(47, 62)}
								</Text>
							</Box>
						)
					},
					headerShown: true,
				}}
			/>
			<Stack.Screen
				name={'permissionmodals'}
				options={{
					headerBackground: () => <></>,
					headerShown: true,
					title: 'Permissions',
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
			<Stack.Screen
				name={'preferences'}
				options={{
					headerBackground: () => <></>,
					headerShown: true,
					title: 'Preferences',
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
			<Stack.Screen
				name={'theme'}
				options={{
					headerBackground: () => <></>,
					headerShown: true,
					title: 'Themes',
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
		</Stack>
	)
}
