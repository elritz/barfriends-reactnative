import TabBarIcon from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { Entypo } from '@expo/vector-icons'
import { Icon } from 'native-base'

const DevelopmentTab = (props: TabProps) => {
	console.log('🚀 ~ file: index.tsx ~ line 10 ~ DevelopmentTab ~ props.color', props.color)
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
					size={25}
					as={Entypo}
					color={props.color}
				/>
			}
		/>
	)
}

export default DevelopmentTab
