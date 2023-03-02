import GoBack from '../GoBack'
import { Ionicons } from '@expo/vector-icons'
import { Icon } from 'native-base'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

interface ChevronGoBackArrowProps {
	margin?: string
}

const ChevronBackArrow = ({ margin }: ChevronGoBackArrowProps) => {
	return (
		<GoBack width={`${wp(10)}px`}>
			<Icon as={Ionicons} name='md-chevron-back-outline' size={'2xl'} />
		</GoBack>
	)
}

export default ChevronBackArrow
