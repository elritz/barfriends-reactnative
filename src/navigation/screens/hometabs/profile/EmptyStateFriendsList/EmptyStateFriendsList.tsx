import RNEHeading600 from '@components/atoms/typography/RNETypography/heading/RNEHeading600'
import RNEHeading1000 from '@components/atoms/typography/RNETypography/heading/RNEHeading1000'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Button } from '@rneui/base'
import { Icon } from '@rneui/themed'
import { useContext } from 'react'
import { View } from 'react-native'
import { ThemeContext } from 'styled-components/native'

export const EmptyStateFriendsList = () => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()

	return (
		<View style={{ width: '100%', alignItems: 'center' }}>
			<RNEHeading600>No Barfriends</RNEHeading600>
			<RNEHeading1000 style={{ textTransform: 'uppercase', textAlign: 'center' }}>
				Find Your Friends
			</RNEHeading1000>
			<Button
				onPress={() => {
					navigation.navigate('HomeTabNavigator', {
						screen: 'ExploreStack',
						params: {
							screen: 'SearchTextScreen',
						},
					})
				}}
				icon={
					<Icon
						type='ionicon'
						name='search'
						size={20}
						color={themeContext.palette.highlight.color.primary}
					/>
				}
				title='Search'
				titleStyle={{
					fontWeight: '800',
				}}
				containerStyle={{
					width: '80%',
					marginVertical: 10,
					borderRadius: 10,
				}}
				buttonStyle={{
					backgroundColor: themeContext.palette.highlight.background.secondary,
				}}
			/>
		</View>
	)
}
