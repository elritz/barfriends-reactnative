import LogoTransparent from '@assets/images/company/LogoTransparent'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { Ionicons } from '@expo/vector-icons'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Stack, useRouter } from 'expo-router'
import { HStack, Icon, IconButton } from 'native-base'
import React from 'react'

export default () => {
	const colorScheme = useThemeColorScheme()
	const router = useRouter()
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: 'transparent',
				},
				headerShown: false,
				// headerTitle: () => <NavigationDragIcon />,
				// headerLeft: () => null,
				// headerTransparent: true,
			}}
		>
			<Stack.Screen
				name={'DeviceManager'}
				options={{
					headerShown: true,
					headerTitle: () => <LogoTransparent height={30} width={192} />,
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
			<Stack.Screen
				name={'Emojimood'}
				options={{
					headerTransparent: true,
					headerShown: true,
					title: '',
					headerLeft: () => (
						<HStack justifyContent={'flex-start'} maxW={'90%'} space={1} alignItems={'center'} ml={2}>
							<IconButton
								bg={colorScheme === 'light' ? 'light.50' : 'dark.50'}
								rounded={'full'}
								size={'xs'}
								onPress={() => router.back()}
								icon={<Icon as={Ionicons} name='md-chevron-back-outline' size={'xl'} />}
							/>
						</HStack>
					),
				}}
			/>
		</Stack>
	)
}
