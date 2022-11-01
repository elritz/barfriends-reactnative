import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Heading, Button, Icon } from 'native-base'
import { View } from 'react-native'

export const EmptyStateFriendsList = () => {
	const navigation = useNavigation()

	return (
		<View style={{ width: '100%', alignItems: 'center' }}>
			<Heading fontSize={'xl'} fontWeight={'bold'}>
				No Barfriends
			</Heading>
			<Heading fontSize={'2xl'} style={{ textTransform: 'uppercase', textAlign: 'center' }}>
				Find Your Friends
			</Heading>
			<Button
				onPress={() => {
					navigation.navigate('HomeTabNavigator', {
						screen: 'ExploreStack',
						params: {
							screen: 'SearchTextScreen',
						},
					})
				}}
				rightIcon={<Icon as={Ionicons} name='search' size={20} />}
				_text={{
					fontWeight: '800',
				}}
				w={'85%'}
				my={3}
				borderRadius={'lg'}
			>
				Search
			</Button>
		</View>
	)
}
