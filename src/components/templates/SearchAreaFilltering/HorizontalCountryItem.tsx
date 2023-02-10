import { Feather } from '@expo/vector-icons'
import {
	HorizontalStateItemProps,
	HorizontalCountryItemProps,
} from '@navigation/stacks/searcharea/SearchAreaStack'
import { Icon, HStack, Text } from 'native-base'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { ListRenderItemInfo } from 'react-native'
import { ThemeContext } from 'styled-components/native'

const HorizontalCountryItem = ({ index, item }: ListRenderItemInfo<HorizontalCountryItemProps>) => {
	const themeContext = useContext(ThemeContext)
	const formContext = useFormContext()
	const { watch } = formContext

	return (
		<HStack
			key={index}
			style={{
				backgroundColor: themeContext.palette.secondary.background.default,
			}}
		>
			<Text
				mt={-0.5}
				textAlign={'center'}
				fontWeight={'medium'}
				fontSize={'lg'}
				numberOfLines={1}
				ellipsizeMode={'tail'}
			>
				{item.flag}
				{` `}
				{item.name}
			</Text>
			{watch('country') === item.name ? (
				<Icon color={'blueGray.700'} size={'lg'} as={Feather} name={'check'} />
			) : null}
		</HStack>
	)
}

export default HorizontalCountryItem
