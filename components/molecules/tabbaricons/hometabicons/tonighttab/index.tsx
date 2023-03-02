import TabBarIcon from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { FontAwesome5 } from '@expo/vector-icons'
import { Box, Icon } from 'native-base'

const TonightTab = (props: TabProps) => {
	return (
		<>
			<TabBarIcon
				color={props.color}
				icon={
					<Icon
						style={{
							justifyContent: 'center',
							zIndex: 100,
						}}
						name='play'
						size={'23px'}
						as={FontAwesome5}
						color={props.color}
					/>
				}
			/>
			<Box
				// position={'absolute'}
				// bottom={-3}
				bg={false ? 'red.500' : 'transparent'}
				h={'4.25px'}
				w={'4.25px'}
				borderRadius={'full'}
			/>
		</>
	)
}

export default TonightTab
