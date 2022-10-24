import UserSearchInput from './usersearchinput/UserSearchInput'
import { useReactiveVar } from '@apollo/client'
import RNEHeading1000 from '@components/atoms/typography/RNETypography/heading/RNEHeading1000'
import { AuthorizationReactiveVar } from '@reactive'
import { Text } from '@rneui/themed'
import { useContext } from 'react'
import { ScrollView, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled, { ThemeContext } from 'styled-components/native'

interface StatusScreenProps {}

const StatusScreen = ({}: StatusScreenProps) => {
	const insets = useSafeAreaInsets()
	const themeContext = useContext(ThemeContext)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	// list of 30 items
	const list = [
		{
			id: 1,
			name: 'John Doe',
			status: 'online',
		},
		{
			id: 2,
			name: 'Jane Doe',
			status: 'offline',
		},
	]

	return (
		<OuterView>
			<UserSearchInput />
			<KeyboardAwareScrollView
				keyboardDismissMode='interactive'
				keyboardShouldPersistTaps={'always'}
				extraScrollHeight={100}
				style={{ height: '100%' }}
			>
				{list.map(item => {
					return <Text>{item.name}</Text>
				})}
			</KeyboardAwareScrollView>
		</OuterView>
	)
}

export default StatusScreen

const OuterView = styled.View`
	flex-direction: column;
`
