import { useReactiveVar } from '@apollo/client'
import { Button, HStack, Pressable, Text } from '@components/core'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import * as Haptics from 'expo-haptics'
import { Stack, useRouter } from 'expo-router'

export default function _layout() {
	const router = useRouter()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)

	return (
		<Stack
			screenOptions={{
				gestureEnabled: false,
				headerStyle: {
					backgroundColor:
						rTheme.localStorageColorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light50
							: rTheme.theme?.gluestack.tokens.colors.dark50,
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
									<HStack ml={'$2'} space={'md'} alignItems={'center'}>
										<Text
											fontWeight={'$medium'}
											fontSize={'$2xl'}
											sx={{
												maxWidth: 165,
											}}
											ellipsizeMode={'tail'}
										>
											{rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.username}
										</Text>
										<Ionicons
											name={'chevron-down'}
											size={23}
											color={
												rTheme.localStorageColorScheme === 'light'
													? rTheme.theme?.gluestack.tokens.colors.light900
													: rTheme.theme?.gluestack.tokens.colors.dark900
											}
											style={{
												position: 'absolute',
												top: -2,
												right: -15,
											}}
										/>
									</HStack>
								</Pressable>
							)}
						</>
					)
				},
				headerRight: () => (
					<Button
						variant='link'
						onPress={() =>
							router.push({
								pathname: '(app)/settings',
							})
						}
					>
						<MaterialCommunityIcons
							name={'dots-horizontal'}
							size={30}
							color={
								rTheme.colorScheme === 'light'
									? rTheme.theme?.gluestack.tokens.colors.light900
									: rTheme.theme?.gluestack.tokens.colors.dark900
							}
						/>
					</Button>
				),
				headerShown: true,
			}}
		>
			<Stack.Screen name={'UserProfileScreen'} />
		</Stack>
	)
}
