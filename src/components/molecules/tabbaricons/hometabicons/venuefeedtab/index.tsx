import TabBarIcon from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { Icon } from '@rneui/themed'

const VenueFeedTab = (props: TabProps) => {
	return (
		<TabBarIcon
			color={props.color}
			icon={
				<Icon
					style={{
						zIndex: 100,
						justifyContent: 'center',
					}}
					name='md-grid'
					size={27}
					type='ionicon'
					color={props.color}
				/>
			}
		/>
	)
}

export default VenueFeedTab
