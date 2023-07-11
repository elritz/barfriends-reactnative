import { useReactiveVar } from '@apollo/client'
import { Box, Icon, Input, Pressable, SearchIcon } from '@components/core'
import { Ionicons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'

type Props = {
	onPress: () => void
}

const SearchInputDisabled = (props: Props) => {
	const rTheme = useReactiveVar(ThemeReactiveVar)

	return (
		<Box bg='$transparent' position={'relative'} flex={1}>
			<Pressable
				position={'absolute'}
				top={'$0'}
				bottom={'$0'}
				left={'$0'}
				right={'$0'}
				zIndex={10}
				onPressIn={props.onPress}
			></Pressable>
			<Input
				mx={'$3'}
				variant='rounded'
				isDisabled
				bg={
					rTheme.colorScheme === 'light'
						? rTheme.theme?.gluestack.tokens.colors.light100
						: rTheme.theme?.gluestack.tokens.colors.dark100
				}
			>
				<Input.Icon ml={'$2'}>
					<Ionicons
						_light={{ color: '$light600' }}
						_dark={{ color: '$dark900' }}
						color={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light600
								: rTheme.theme?.gluestack.tokens.colors.dark800
						}
						name='ios-search'
						size={23}
					/>
				</Input.Icon>
				<Input.Input
					alignSelf={'center'}
					placeholder={'Search'}
					returnKeyType='search'
					underlineColorAndroid='transparent'
					keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
				/>
			</Input>
		</Box>
	)
}

export default SearchInputDisabled
