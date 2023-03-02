import TabBarIcon, { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { MaterialIcons } from '@expo/vector-icons'
import { Icon } from 'native-base'

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
				size={'28px'}
				as={MaterialIcons}
				color={props.color}
			/>
		}
	/>
)

export default NotificationTab
