import TabBarIcon from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { FontAwesome5 } from '@expo/vector-icons'
import { Icon } from 'native-base'

const MapTab = (props: TabProps) => {
	return (
		<TabBarIcon
			color={props.color}
			icon={
				<Icon
					style={{
						zIndex: 100,
						justifyContent: 'center',
					}}
					name='map-marker-alt'
					size={28}
					as={FontAwesome5}
					color={props.color}
				/>
			}
		/>
	)
}

export default MapTab
