import TabBarIcon, { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { MaterialIcons } from '@expo/vector-icons'

const NotificationTab = (props: TabProps) => (
	<TabBarIcon
		color={props.color}
		icon={
			<MaterialIcons
				style={{
					zIndex: 100,
					justifyContent: 'center',
				}}
				name='notifications'
				size={28}
				color={props.color}
			/>
		}
	/>
)

export default NotificationTab
