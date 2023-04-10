import { ComingArea, useUpvoteH6ComingAreaMutation } from '@graphql/generated'
import { HStack, IconButton, Text } from 'native-base'
import CountryFlag from 'react-native-country-flag'

type Prop = {
	item: ComingArea
}
export default function ComingAreaItem({ item }: Prop) {
	const [upvoteH6ComingAreaMutation, { data, loading, error }] = useUpvoteH6ComingAreaMutation({})
	return (
		<HStack mx={2}>
			<HStack alignItems={'center'} flex={1} space={2}>
				<CountryFlag isoCode={item.Area?.Country.isoCode} size={15} />
				<Text fontSize={'md'}>
					{item.Area?.Country.name}, {item.Area?.State.isoCode}, {item.Area?.City.name}
				</Text>
			</HStack>
			<Text>{item.timesRequested}</Text>
			<IconButton />
		</HStack>
	)
}
