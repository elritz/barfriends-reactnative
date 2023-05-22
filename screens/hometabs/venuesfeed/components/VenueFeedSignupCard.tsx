import CardPleaseSignup from '@components/molecules/asks/signuplogin'
import { uniqueId } from 'lodash'
import { AnimatePresence, MotiView } from 'moti'
import { Box } from 'native-base'

export default function VenueFeedSignupCard() {
	return (
		<Box
			_dark={{ bg: 'dark.100' }}
			_light={{ bg: 'light.100' }}
			px={5}
			pb={15}
			pt={25}
			mx={2}
			borderRadius={'xl'}
		>
			<CardPleaseSignup signupTextId={1} />
		</Box>
	)
}
