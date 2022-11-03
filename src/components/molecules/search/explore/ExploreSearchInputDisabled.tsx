import { Ionicons } from '@expo/vector-icons'
import { Icon, Input, useTheme } from 'native-base'

type Props = {
	onPress: () => void
}

const ExploreSearchInputDisabled = (props: Props) => {
	return (
		<Input
			variant={'filled'}
			rounded={'lg'}
			mx={2}
			py={4}
			placeholder='Search'
			value={''}
			_input={{
				fontSize: 'lg',
			}}
			focusable={false}
			isReadOnly
			onFocus={props.onPress}
			returnKeyType='search'
			underlineColorAndroid='transparent'
			leftElement={<Icon as={Ionicons} name='ios-search' size={'lg'} ml={2} />}
			onPressIn={props.onPress}
		/>
	)
}

export default ExploreSearchInputDisabled
