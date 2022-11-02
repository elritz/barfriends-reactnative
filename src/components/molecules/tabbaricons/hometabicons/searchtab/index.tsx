import TabBarIcon, { TabBarIconProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { Ionicons } from '@expo/vector-icons'
import { Icon } from 'native-base'

const SearchTab = (props: TabBarIconProps) => {
	return (
		<TabBarIcon
			color={props.color}
			icon={
				<Icon
					style={{
						zIndex: 100,
						justifyContent: 'center',
					}}
					name='search'
					size={35}
					as={Ionicons}
					color={props.color}
				/>
			}
		/>
	)
}

export default SearchTab
