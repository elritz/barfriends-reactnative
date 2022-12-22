import TabBarIcon from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { Ionicons } from '@expo/vector-icons'
import { Box, Icon } from 'native-base'

const VenueFeedTab = (props: TabProps) => {
	return (
		<>
			<TabBarIcon
				color={props.color}
				icon={
					<Icon
						style={{
							zIndex: 100,
							justifyContent: 'center',
						}}
						name='md-grid'
						size={'26px'}
						as={Ionicons}
						color={props.color}
					/>
				}
			/>
			{false && (
				<Box
					position={'absolute'}
					bottom={-3}
					bg={'red.500'}
					h={'4.25px'}
					w={'4.25px'}
					borderRadius={'full'}
				/>
			)}
		</>
	)
}

export default VenueFeedTab
