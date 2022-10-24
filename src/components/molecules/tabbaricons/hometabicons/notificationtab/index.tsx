import TabBarIcon, { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { Icon } from '@rneui/base'

const NotificationTab = (props: TabProps) => (
	<TabBarIcon
		color={props.color}
		icon={
			<Icon
				style={{
					zIndex: 100,
					justifyContent: 'center',
				}}
				name='notifications'
				size={33}
				type='material'
				color={props.color}
			/>
		}
	/>
)

export default NotificationTab
