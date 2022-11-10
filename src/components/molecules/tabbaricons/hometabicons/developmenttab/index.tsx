import TabBarIcon from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { Entypo } from '@expo/vector-icons'
import { Icon } from 'native-base'

const DevelopmentTab = (props: TabProps) => {
	return (
		<TabBarIcon
			color={props.color}
			icon={
				<Icon
					style={{
						zIndex: 100,
						justifyContent: 'center',
					}}
					name='code'
					size={'28px'}
					as={Entypo}
					color={props.color}
				/>
			}
		/>
	)
}

export default DevelopmentTab
