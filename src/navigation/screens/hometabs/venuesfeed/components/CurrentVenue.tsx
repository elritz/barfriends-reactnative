import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { useCurrentVenueQuery } from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { MotiPressable, useMotiPressable } from 'moti/interactions'
import {
	Box,
	Button,
	Divider,
	HStack,
	Heading,
	Icon,
	IconButton,
	Image,
	Pressable,
	Text,
	useDisclose,
} from 'native-base'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Blurhash } from 'react-native-blurhash'

export default function CurrentVenue() {
	const navigation = useNavigation()
	const colorScheme = useThemeColorScheme()
	const [hideBlur, setHideBlur] = useState(false)
	const { isOpen, onClose, onOpen, onToggle } = useDisclose()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const { data, loading, error } = useCurrentVenueQuery({
		skip:
			!rAuthorizationVar?.DeviceProfile?.Profile?.Personal?.LiveOutPersonal?.joined[0]?.venueProfileId,
		variables: {
			where: {
				id: {
					equals:
						rAuthorizationVar?.DeviceProfile?.Profile?.Personal?.LiveOutPersonal?.joined[0]
							?.venueProfileId,
				},
			},
		},
		onCompleted: data => {
			console.log('data :>> ', data)
		},
	})

	const getTitleCase = str => {
		const titleCase = str
			.toLowerCase()
			.split(' ')
			.map(word => {
				return word.charAt(0).toUpperCase() + word.slice(1)
			})
			.join(' ')

		return titleCase
	}

	if (loading || !data) return null

	function leaveVenue() {
		onToggle()
	}

	return (
		<Box bg={'white'} borderRadius={'lg'} h={220} my={3} mx={2}>
			<Pressable
				onPress={() => {
					navigation.navigate('PublicNavigator', {
						screen: 'VenueStack',
						params: {
							screen: 'PublicVenueScreen',
							params: {
								profileId: String(data.profile?.id),
							},
						},
					})
				}}
			>
				<Box
					height={220}
					borderRadius={'lg'}
					style={{
						// backgroundColor: themeContext.palette.secondary.background.default,
						justifyContent: 'flex-end',
						overflow: 'hidden',
					}}
				>
					{!loading ? (
						<Image
							source={{ uri: data.profile?.photos[0]?.url }}
							resizeMode='cover'
							onLoadEnd={() => setHideBlur(true)}
							style={{
								...StyleSheet.absoluteFillObject,
								width: undefined,
								height: undefined,
							}}
							alt={'Profile Photo'}
						/>
					) : null}
					{!hideBlur && (
						<Blurhash
							blurhash={String(data.profile?.photos[0]?.blurhash)}
							style={{
								flex: 1,
							}}
						/>
					)}
					{/* <View
					style={{
						backgroundColor: themeContext.palette.background.paper,
						flexDirection: 'column',
						justifyContent: 'space-around',
						paddingVertical: 5,
					}}
				> */}
					<HStack
						_light={{
							bg: 'light.50',
						}}
						_dark={{
							bg: 'dark.50',
						}}
						style={{
							height: 75,
						}}
						p={2}
					>
						<Box
							// bg={'amber.400'}
							flex={1}
							alignSelf={'center'}
						>
							<Heading
								size={'sm'}
								fontWeight={'500'}
								textAlign={'left'}
								numberOfLines={2}
								alignSelf={'flex-start'}
								ellipsizeMode='tail'
							>
								{getTitleCase(data.profile?.IdentifiableInformation?.fullname)}sadlkasns asdasd
							</Heading>
						</Box>
						<Box
							// bg={'blue.400'}
							alignContent={'center'}
							justifyContent={'center'}
							px={2}
						>
							<Button.Group borderRadius={'lg'} isAttached colorScheme={'primary'}>
								<Button
									_light={{
										bg: 'light.50',
									}}
									_dark={{
										bg: 'dark.100',
									}}
									rounded={'lg'}
									_text={{
										color: 'error.500',
									}}
									leftIcon={<Icon color={'error.500'} as={Ionicons} name={'ios-exit'} size={'xl'} />}
									onPress={!isOpen ? () => onToggle() : () => leaveVenue()}
								>
									{isOpen ? `Leave` : ''}
								</Button>
								{isOpen && <Divider orientation='vertical' />}
								{isOpen && (
									<IconButton
										alignSelf={'center'}
										colorScheme={'gray'}
										_light={{
											bg: 'light.100',
										}}
										_dark={{
											bg: 'dark.100',
										}}
										rounded={'lg'}
										icon={<Icon as={Ionicons} name={'close'} size={'xl'} />}
										onPress={onToggle}
									/>
								)}
							</Button.Group>
						</Box>
					</HStack>
				</Box>
			</Pressable>
		</Box>
	)
}
