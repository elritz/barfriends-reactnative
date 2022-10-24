import TabBarIcon, { TabBarIconProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { Icon } from '@rneui/base'

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
					type='ionicons'
					color={props.color}
				/>
			}
		/>
	)
}

export default SearchTab
