import { Button, Heading, Text, VStack } from 'native-base'

export default function VenuesFeedVenuesEmptyState() {
	return (
		<VStack h={'260px'} alignItems={'center'} justifyContent={'center'} space={3}>
			<Heading fontSize={'2xl'} textAlign={'center'}>
				Sorry about this!!
			</Heading>
			<Text fontSize={'md'} textAlign={'center'} mx={3}>
				I added this area to the list, possibly within the next few hours or days I'll have venues in
				your area. Get notified for when venues get added to this area.
			</Text>
			<Button>Get Notified</Button>
		</VStack>
	)
}
