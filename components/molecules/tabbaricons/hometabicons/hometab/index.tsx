import TabBarIcon from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { Box } from '@components/core'
import { Entypo } from '@expo/vector-icons'

const HomeTab = (props: TabProps) => {
	return (
		<>
			<TabBarIcon
				color={props.color}
				icon={
					<Entypo
						style={{
							zIndex: 100,
							justifyContent: 'center',
						}}
						size={26}
						name='home'
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
				position={'absolute'}
				bottom={-3}
				rounded={'$full'}
			/>
		</>
	)
}

export default HomeTab
