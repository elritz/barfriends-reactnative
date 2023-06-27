import { Center, Heading, Text } from '@components/core'
import { SafeAreaView, ScrollView } from 'react-native'

export default () => {
	return (
		<SafeAreaView>
			<ScrollView>
				<Center>
					<Heading>No Network connection!!</Heading>
					<Heading>Pull to refresh</Heading>
				</Center>
			</ScrollView>
		</SafeAreaView>
	)
}
