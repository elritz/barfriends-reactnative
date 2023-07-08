import TabBarIcon, { TabBarIconProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { Box } from '@components/core'
import { Ionicons } from '@expo/vector-icons'

const SearchTab = (props: TabBarIconProps) => {
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
						size={28}
						name='search'
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

export default SearchTab
