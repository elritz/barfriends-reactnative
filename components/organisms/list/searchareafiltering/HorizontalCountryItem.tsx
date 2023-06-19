import { HorizontalCountryItemProps } from '@app/(app)/searcharea/_layout'
import { Feather } from '@expo/vector-icons'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Icon, HStack, Text, useTheme } from 'native-base'
import { useFormContext } from 'react-hook-form'
import { ListRenderItemInfo } from 'react-native'

const HorizontalCountryItem = ({ index, item }: ListRenderItemInfo<HorizontalCountryItemProps>) => {
	const theme = useTheme()
	const colorScheme = useThemeColorScheme()
	const formContext = useFormContext()
	const { watch } = formContext

	return (
		<HStack
			key={index}
			bg={colorScheme === 'light' ? theme.colors.light[100] : theme.colors.dark[100]}
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
