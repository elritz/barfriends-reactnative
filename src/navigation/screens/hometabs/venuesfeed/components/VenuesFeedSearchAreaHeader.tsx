import { useReactiveVar } from '@apollo/client'
import { SearchAreaReactiveVar } from '@reactive'
import { VStack, Heading } from 'native-base'

export default function VenuesFeedSearchAreaHeader() {
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)

	if (!rSearchAreaVar?.city) return null

	return (
		<VStack alignItems={'flex-start'} mx={2} mb={3}>
			<Heading lineHeight={'xs'} fontSize={'md'} fontWeight={'bold'}>
				Nearby
			</Heading>
			<Heading mt={'-5px'} lineHeight={'xs'} size={'2xl'} fontWeight={'black'} numberOfLines={1}>
				{rSearchAreaVar?.city}
			</Heading>
		</VStack>
	)
}
