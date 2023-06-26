import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { Box, Text } from '@components/core'
import { ENVIRONMENT } from '@env'
import { Stack } from 'expo-router'

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
							<Box bg={'transparent'}>
								<Text
									adjustsFontSizeToFit
									fontSize={'$3xl'}
									textAlign={'center'}
									textTransform={'capitalize'}
									fontWeight={'$black'}
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
