import GoBack from '../GoBack'
import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

interface ChevronGoBackArrowProps {
	margin?: string
}

const ChevronBackArrow = ({ margin }: ChevronGoBackArrowProps) => {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const colorScheme = useThemeColorScheme()

	return (
		<GoBack height={parseInt(wp(10).toFixed(0))} width={parseInt(wp(10).toFixed(0))}>
			<Ionicons
				name='md-chevron-back-outline'
				size={35}
				color={
					colorScheme === 'light'
						? rTheme.theme?.gluestack.tokens.colors.light900
						: rTheme.theme?.gluestack.tokens.colors.dark900
				}
			/>
		</GoBack>
	)
}

export default ChevronBackArrow
