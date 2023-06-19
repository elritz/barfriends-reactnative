// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data
import JoinVenue from '@components/atoms/buttons/joinvenue/JoinVenue'
import { Heading } from '@components/core'
import { VStack } from 'native-base'

export default function JoinCard() {
	return (
		<VStack alignItems={'center'} justifyContent={'space-around'} space={3}>
			<Heading fontSize={'$md'} fontWeight={'$black'} textAlign={'center'} textTransform={'uppercase'}>
				You've{'\n'}arrived!{'\n'}
				<Heading color={'green.500'} fontWeight={'$black'}>
					join now
				</Heading>
			</Heading>
			<JoinVenue />
		</VStack>
	)
}
