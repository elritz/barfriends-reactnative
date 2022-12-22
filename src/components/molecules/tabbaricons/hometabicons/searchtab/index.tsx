import TabBarIcon, { TabBarIconProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { Ionicons } from '@expo/vector-icons'
import { Box, Icon } from 'native-base'

const SearchTab = (props: TabBarIconProps) => {
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
						name='search'
						size={'28px'}
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

export default SearchTab
