import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Heading, Button, Icon, Text } from 'native-base'
import { View } from 'react-native'

export const EmptyStateFriendsList = () => {
	const navigation = useNavigation()

	return (
		<View style={{ width: '100%', alignItems: 'center' }}>
			<Text fontSize={'md'} fontWeight={'bold'}>
				You have no barfriends
			</Text>
			<Heading fontSize={'2xl'} style={{ textAlign: 'center' }}>
				Use search to find your friends
			</Heading>
			<Button
				onPress={() => {
					navigation.navigate('HomeTabNavigator', {
						screen: 'ExploreStack',
						params: {
							screen: 'SearchTextScreen',
							params: {
								searchText: '',
							},
						},
					})
				}}
				rightIcon={<Icon as={Ionicons} name='search' size={'md'} />}
				w={'85%'}
				my={3}
				borderRadius={'lg'}
			>
				Search
			</Button>
		</View>
	)
}
