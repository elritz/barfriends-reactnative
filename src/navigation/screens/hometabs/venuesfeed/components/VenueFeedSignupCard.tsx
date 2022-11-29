import CardPleaseSignup from '@components/molecules/asks/signuplogin/SignupLogin'
import { uniqueId } from 'lodash'
import { AnimatePresence, MotiView } from 'moti'
import { Box } from 'native-base'

export default function VenueFeedSignupCard() {
	return (
		<AnimatePresence key={uniqueId()}>
			<MotiView
				from={{
					opacity: 0,
					scale: 1,
				}}
				animate={{
					opacity: 1,
					scale: 1,
				}}
				exit={{
					opacity: 0,
					scale: 0.9,
				}}
			>
				<Box
					_dark={{ backgroundColor: 'dark.100' }}
					_light={{ backgroundColor: 'light.100' }}
					px={5}
					pb={15}
					pt={35}
					mx={2}
					borderRadius={13}
				>
					<CardPleaseSignup signupTextId={1} />
				</Box>
			</MotiView>
		</AnimatePresence>
	)
}
