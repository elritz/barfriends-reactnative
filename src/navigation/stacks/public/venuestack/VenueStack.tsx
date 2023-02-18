import { Ionicons, Entypo } from '@expo/vector-icons'
import VenueScreen from '@navigation/screens/public/venue/Venue'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { VenueProfileStackParamList } from '@types'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { HStack, Icon, IconButton } from 'native-base'

const ScreenStack = createStackNavigator<VenueProfileStackParamList>()

function VenueStack() {
	const navigation = useNavigation()
	const colorScheme = useThemeColorScheme()
	return (
		<ScreenStack.Navigator
			screenOptions={{
				headerShown: true,
				headerTransparent: true,
				headerStyle: {
					backgroundColor: 'transparent',
				},
				headerLeft: () => (
					<HStack justifyContent={'flex-start'} maxW={'90%'} space={1} alignItems={'center'} ml={2}>
						<IconButton
							bg={colorScheme === 'light' ? 'light.50' : 'dark.50'}
							rounded={'full'}
							size={'xs'}
							onPress={() => navigation.goBack()}
							icon={<Icon as={Ionicons} name='md-chevron-back-outline' size={'xl'} />}
						/>
					</HStack>
				),
				headerRight: () => (
					<IconButton
						onPress={() => console.log('TODO: Settings still need to be done')}
						my={2}
						mr={2}
						icon={<Icon as={Entypo} name={'dots-three-vertical'} size={23} />}
					/>
				),
				headerTitle: '',
			}}
		>
			<ScreenStack.Screen
				name='PublicVenueScreen'
				component={VenueScreen}
				options={
					{
						// headerShown: false,
					}
				}
			/>
		</ScreenStack.Navigator>
	)
}

export default VenueStack
