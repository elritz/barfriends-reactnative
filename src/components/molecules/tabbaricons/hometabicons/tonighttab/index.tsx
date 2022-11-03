import TabBarIcon from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { FontAwesome5 } from '@expo/vector-icons'
import { Icon } from 'native-base'

const TonightTab = (props: TabProps) => {
	return (
		<TabBarIcon
			color={props.color}
			icon={
				<Icon
					style={{
						justifyContent: 'center',
						zIndex: 100,
					}}
					name='play'
					size={23}
					as={FontAwesome5}
					color={props.color}
				/>
			}
		/>
	)
}

export default TonightTab
