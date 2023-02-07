import JoinCard from './joincard/JoinCard'
import LeaveCard from './leavecard/LeaveCard'
import TotalCard from './totalcard/TotalCard'
import { Text, Heading, HStack, VStack, Box } from 'native-base'

export default function DevActions() {
	return (
		<VStack space={4} justifyContent={'space-between'}>
			<Box>
				<Heading fontSize={'lg'} fontWeight={'800'} textAlign={'center'} textTransform={'uppercase'}>
					You are in {'\n'}
					<Heading color={'green.400'} fontWeight={'900'}>
						Dev Mode!
					</Heading>
				</Heading>
				<Text fontSize={'md'} mx={2} textAlign={'center'}>
					This section is for quick actions that we may need for testing! As developers!
				</Text>
			</Box>

			<HStack space={2} pb={2} mx={3} justifyContent={'space-around'}>
				<TotalCard />
				<JoinCard />
				<LeaveCard />
			</HStack>
		</VStack>
	)
}
