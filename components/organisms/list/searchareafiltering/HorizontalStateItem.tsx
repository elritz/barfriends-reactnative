import { HorizontalStateItemProps } from '@app/(app)/searcharea/_layout'
import { Feather } from '@expo/vector-icons'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Icon, HStack, Text, useTheme } from 'native-base'
import { useFormContext } from 'react-hook-form'
import { ListRenderItemInfo } from 'react-native'

const HorizontalStateItem = ({ index, item }: ListRenderItemInfo<HorizontalStateItemProps>) => {
	const theme = useTheme()
	const colorScheme = useThemeColorScheme()
	const formContext = useFormContext()
	const { watch } = formContext

	return (
		<HStack
			key={index}
			bg={ colorScheme === 'light' ? theme.colors.light[100]:theme.colors.dark[100]}
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
