import TabBarIcon from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { Icon } from '@rneui/base'

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
					size={25}
					type='font-awesome-5'
					color={props.color}
				/>
			}
		/>
	)
}

export default TonightTab
