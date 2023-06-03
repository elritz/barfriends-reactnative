import { useReactiveVar } from '@apollo/client'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { AuthorizationReactiveVar } from '@reactive'
import * as Haptics from 'expo-haptics'
import { Stack, useRouter } from 'expo-router'
import { HStack, Icon, Pressable, useColorMode, useTheme, Text, IconButton } from 'native-base'

export default function _layout() {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const theme = useTheme()
	const colorScheme = useColorMode()
	const router = useRouter()

	return (
		<Stack
			screenOptions={{
				gestureEnabled: false,
				headerStyle: {
					backgroundColor:
						colorScheme.colorMode === 'light' ? theme.colors.light[50] : theme.colors.dark[50],
				},
				headerTitle: '',
				headerLeft: () => {
					return (
						<>
							{rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === 'GUEST' ? null : (
								<Pressable
									onPress={async () => {
										await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
										router.push('(app)/modal/DeviceManager')
									}}
								>
									<HStack ml={2} space={2} alignItems={'center'}>
										<Text fontWeight={'medium'} fontSize={'24px'} maxW={'165px'} ellipsizeMode={'tail'}>
											{rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.username}
										</Text>
										<Icon
											as={Ionicons}
											name={'chevron-down'}
											size={'23px'}
											position={'absolute'}
											top={2}
											right={-15}
										/>
									</HStack>
								</Pressable>
							)}
						</>
					)
				},
				headerRight: () => (
					<IconButton
						onPress={() =>
							router.push({
								pathname: '(app)/settings',
							})
						}
						_pressed={{
							bg: 'transparent',
						}}
						icon={<Icon as={MaterialCommunityIcons} name={'dots-horizontal'} size={30} />}
					/>
				),
				headerShown: true,
			}}
		>
			<Stack.Screen name={'UserProfileScreen'} />
		</Stack>
	)
}
