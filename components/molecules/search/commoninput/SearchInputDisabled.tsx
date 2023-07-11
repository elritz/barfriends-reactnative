import { useReactiveVar } from '@apollo/client'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { Box, HStack, Input, Pressable } from '@components/core'
import { Ionicons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'

type Props = {
	onPress: () => void
	placeholder?: string
	withBack?: boolean
}

const SearchInputDisabled = (props: Props) => {
	const rTheme = useReactiveVar(ThemeReactiveVar)

	return (
		<HStack position={'relative'} flex={1}>
			{props.withBack && <ChevronBackArrow />}
			<Input
				flex={1}
				variant='rounded'
				mr={'$2'}
				ml={!props.withBack ? '$2' : '$0'}
				focusable={false}
				isReadOnly
				bg={
					rTheme.colorScheme === 'light'
						? rTheme.theme?.gluestack.tokens.colors.light100
						: rTheme.theme?.gluestack.tokens.colors.dark100
				}
			>
				<Input.Icon ml={'$2'}>
					<Ionicons
						color={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light700
								: rTheme.theme?.gluestack.tokens.colors.dark900
						}
						name='ios-search'
						size={23}
					/>
				</Input.Icon>
				<Input.Input
					focusable={false}
					onPressIn={props.onPress}
					alignSelf={'center'}
					placeholder={props.placeholder || 'Search'}
					returnKeyType='search'
					underlineColorAndroid='transparent'
					keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
				/>
			</Input>
		</HStack>
	)
}

export default SearchInputDisabled
