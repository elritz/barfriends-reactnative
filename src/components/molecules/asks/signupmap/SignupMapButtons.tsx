import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { Button } from '@rneui/base'
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import styled from 'styled-components/native'
import switchLogoutProfile from '@util/hooks/auth/switchLogoutProfile'
import RNEButtonPrimary from '@components/atoms/buttons/rnebutton/barfriends/RNEButtonPrimary'

interface OuterViewProps {
	tabBarHeight: number
}

const SignupMapButtons = () => {
	const navigation = useNavigation()
	const tabBarHeight = useBottomTabBarHeight()

	const onSubmit = async () => {
		const { success } = await switchLogoutProfile({ logout: true, profile: {} })
		if (success) {
			navigation.reset({
				index: 0,
				routes: [{ name: 'HomeTabNavigator' }],
			})
		}
	}

	const BottomNavigationHeight = tabBarHeight + 20
	return (
		<OuterView tabBarHeight={BottomNavigationHeight}>
			<TitleText>Sign up</TitleText>
			<RNEButtonPrimary
				disabled={false}
				onPress={() => onSubmit()}
				title='Logout Token'
				buttonStyle={{
					backgroundColor: 'blue',
				}}
				// height={`${hp(5.5)}px`}
				width={`${wp(40)}px`}

			/>
		</OuterView>
	)
}

export default SignupMapButtons

const OuterView = styled.SafeAreaView<OuterViewProps>`
	background: ${props => props.theme.palette.quaternary.background};
	position: absolute;
	display: flex;
	width: 100%;
`

const TitleText = styled.Text`
	color: ${props => props.theme.palette.primary.color.primary};
	margin: 15px 0px;
	font-size: 24px;
`
