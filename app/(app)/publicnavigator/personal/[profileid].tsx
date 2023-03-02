import { useSearchParams } from 'expo-router'
import { View, Text } from 'react-native'

export default () => {
	const params = useSearchParams()

	console.log('🚀 ~ file: [profileid].tsx:7 ~ params:', params)

	return (
		<View>
			<Text>{params.profileId}</Text>
		</View>
	)
}
