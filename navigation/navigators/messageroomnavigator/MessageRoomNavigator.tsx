import { Entypo, Ionicons } from '@expo/vector-icons'
import MessageRoomAniamted from '@navigation/screens/messageroom/messageroom/MessageRoomAniamted'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { MessageRoomNavigatorParamList } from '@types'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { Box, Heading, HStack, Icon, IconButton, Image } from 'native-base'
import { useContext } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeContext } from 'styled-components/native'

// TODO: FN(Create messaging settings for Blocking etc...)
// TODO: UX(Setup Navigator with settingsstack)

const ScreenStack = createStackNavigator<MessageRoomNavigatorParamList>()

function MessageRoomNavigator() {
	const name = 'Christian Firmi'
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const insets = useSafeAreaInsets()
	const colorScheme = useThemeColorScheme()
	return (
		<ScreenStack.Navigator
			screenOptions={{
				headerShown: true,
			}}
		>
			<ScreenStack.Screen
				name='MessagingRoomScreen'
				component={MessageRoomAniamted}
				options={{
					headerShown: true,
					headerTransparent: true,
					headerStyle: {
						backgroundColor: 'transparent',
					},
					header: () => {
						return (
							<View
								style={{
									paddingTop: insets.top,
									left: 0,
									right: 0,
									flexDirection: 'column-reverse',
								}}
							>
								{Platform.OS === 'ios' ? (
									<BlurView style={StyleSheet.absoluteFill} tint={colorScheme} intensity={80} />
								) : (
									<View
										style={[
											StyleSheet.absoluteFill,
											{ backgroundColor: themeContext.palette.primary.background.default },
										]}
									/>
								)}
								<HStack h={50} maxW={'100%'} justifyContent={'space-between'} alignItems={'center'}>
									<HStack justifyContent={'flex-start'} maxW={'90%'} space={1} alignItems={'center'}>
										<Icon
											as={Ionicons}
											name='md-chevron-back-outline'
											size={'4xl'}
											onPress={() => navigation.goBack()}
										/>
										<Image
											h={35}
											w={35}
											rounded={'md'}
											source={{
												uri: 'https://images.unsplash.com/photo-1665623328945-35acef28302a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
											}}
											alt={'PI'}
										/>
										<Box flex={1} mr={5}>
											<Heading
												allowFontScaling
												ellipsizeMode='tail'
												fontSize={'lg'}
												numberOfLines={1}
												width={'auto'}
												minimumFontScale={1}
											>
												{name}
											</Heading>
										</Box>
									</HStack>
									<Box w={'10%'}>
										<IconButton
											onPress={() => console.log('TODO: Settings still need to be done')}
											my={2}
											mr={2}
											icon={<Icon as={Entypo} name={'dots-three-vertical'} size={23} />}
										/>
									</Box>
								</HStack>
							</View>
						)
					},
				}}
			/>
		</ScreenStack.Navigator>
	)
}

export default MessageRoomNavigator
