import TabBarIcon from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { Entypo } from '@expo/vector-icons'
import { Icon } from 'native-base'

const HomeTab = (props: TabProps) => {
	return (
		<TabBarIcon
			color={props.color}
			icon={
				<Icon
					style={{
						zIndex: 100,
						justifyContent: 'center',
					}}
					name='home'
					size={25}
					as={Entypo}
					color={props.color}
				/>
			}
		/>
	)
}

export default HomeTab
