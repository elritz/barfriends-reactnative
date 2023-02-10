import { Feather } from '@expo/vector-icons'
import { HorizontalStateItemProps } from '@navigation/stacks/searcharea/SearchAreaStack'
import { Icon, HStack, Text } from 'native-base'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { ListRenderItemInfo } from 'react-native'
import { ThemeContext } from 'styled-components/native'

const HorizontalStateItem = ({ index, item }: ListRenderItemInfo<HorizontalStateItemProps>) => {
	const themeContext = useContext(ThemeContext)
	const formContext = useFormContext()
	const { watch } = formContext

	return (
		<HStack
			key={index}
			style={{
				backgroundColor: themeContext.palette.secondary.background.default,
			}}
			py={4}
			px={4}
			my={1}
			mx={3}
			justifyContent={'space-between'}
			rounded={'full'}
		>
			<Text
				mt={-0.5}
				textAlign={'center'}
				fontWeight={'medium'}
				fontSize={'lg'}
				numberOfLines={1}
				ellipsizeMode={'tail'}
			>
				{item.name}
			</Text>
			{watch('state') === item.name ? (
				<Icon color={'blueGray.700'} size={'lg'} as={Feather} name={'check'} />
			) : null}
		</HStack>
	)
}

export default HorizontalStateItem
