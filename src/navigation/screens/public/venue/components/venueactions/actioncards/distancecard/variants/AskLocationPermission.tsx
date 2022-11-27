import { useNavigation } from '@react-navigation/native'
import { Heading, Button, Box } from 'native-base'
import React from 'react'

export default function LocationPermission() {
	const navigiation = useNavigation()

	return (
		<Box flexDirection={'column'} justifyContent={'space-around'} height={'100%'}>
			<Heading fontSize={'md'} textTransform={'uppercase'} fontWeight={'black'} lineHeight={'xs'}>
				Use the join venue feature!
			</Heading>
			<Button
				rounded={'full'}
				onPress={() =>
					navigiation.navigate('PermissionNavigator', {
						screen: 'ForegroundLocationPermissionScreen',
					})
				}
			>
				Continue
			</Button>
		</Box>
	)
}
