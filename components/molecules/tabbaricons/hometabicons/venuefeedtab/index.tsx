import TabBarIcon from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { Box } from '@components/core'
import { Ionicons } from '@expo/vector-icons'

const VenueFeedTab = (props: TabProps) => {
	return (
		<>
			<TabBarIcon
				color={props.color}
				icon={
					<Ionicons
						style={{
							zIndex: 100,
							justifyContent: 'center',
						}}
						size={26}
						name='md-grid'
						color={props.color}
					/>
				}
			/>
			<Box
				bg={false ? '$red500' : 'transparent'}
				sx={{
					h: 4.25,
					w: 4.25,
				}}
				rounded={'$full'}
			/>
		</>
	)
}

export default VenueFeedTab
