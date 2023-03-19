import UberButton from './UberButton'
import { useSearchParams } from 'expo-router'
import { Box, Heading, VStack } from 'native-base'

export default function UberCard() {
	const params = useSearchParams()
	return (
		<Box>
			<VStack space={3}>
				<Heading textTransform={'uppercase'} lineHeight={'xs'} fontSize={'md'} fontWeight={'black'}>
					GET HERE FAST.
				</Heading>
				<UberButton params={params} />
			</VStack>
		</Box>
	)
}
