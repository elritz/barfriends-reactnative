import TabBarIcon from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { FontAwesome5 } from '@expo/vector-icons'

const MapTab = (props: TabProps) => {
	return (
		<TabBarIcon
			color={props.color}
			icon={
				<FontAwesome5
					style={{
						zIndex: 100,
						justifyContent: 'center',
					}}
					name='map-marker-alt'
					size={26}
					color={props.color}
				/>
			}
		/>
	)
}

export default MapTab
