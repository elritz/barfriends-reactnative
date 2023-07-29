import { useReactiveVar } from '@apollo/client'
import TabBarIcon, { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { MaterialIcons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'

const NotificationTab = (props: TabProps) => {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	return (
		<TabBarIcon
			icon={
				<MaterialIcons
					style={{
						zIndex: 100,
						justifyContent: 'center',
					}}
					name='notifications'
					size={28}
					color={
						!props.focused ? (rTheme.deviceColorScheme === 'dark' ? 'white' : 'black') : props.color
					}
				/>
			}
		/>
	)
}

export default NotificationTab
