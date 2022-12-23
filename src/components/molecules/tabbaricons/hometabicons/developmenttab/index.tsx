import TabBarIcon from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { Entypo } from '@expo/vector-icons'
import { Box, Icon } from 'native-base'

const DevelopmentTab = (props: TabProps) => {
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
						name='code'
						size={'28px'}
						as={Entypo}
						color={props.color}
					/>
				}
			/>
			{<Box bg={false ? 'red.500' : 'transparent'} h={'4.25px'} w={'4.25px'} borderRadius={'full'} />}
		</>
	)
}

export default DevelopmentTab
