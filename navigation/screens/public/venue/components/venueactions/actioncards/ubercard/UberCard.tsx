import { useReactiveVar } from '@apollo/client'
import { UBER_CLIENT_ID_KEY } from '@env'
import { useCurrentVenueQuery } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import * as Linking from 'expo-linking'
import { useSearchParams } from 'expo-router'
import { Box, Button, Heading, VStack } from 'native-base'
import { useCallback } from 'react'
import { Alert } from 'react-native'

export default function UberCard() {
	const params = useSearchParams()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const {
		data: PData,
		loading: PLoading,
		error: PError,
	} = useCurrentVenueQuery({
		skip: !params.profileId || !rAuthorizationVar,
		fetchPolicy: 'cache-only',
		variables: {
			where: {
				id: { equals: String(params.profileid) },
			},
		},
	})

	if (PLoading) return null

	const url = `https://m.uber.com/ul/?client_id=${UBER_CLIENT_ID_KEY}&action=setPickup&pickup[my_location]&pickup[nickname]=MyLocation&pickup[formatted_address]=1455%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103&dropoff[latitude]=${PData?.profile?.Venue?.Location?.Geometry?.latitude}&dropoff[longitude]=${PData?.profile?.Venue?.Location?.Geometry?.longitude}&dropoff[nickname]=Coit%20Tower&dropoff[formatted_address]=1%20Telegraph%20Hill%20Blvd%2C%20San%20Francisco%2C%20CA%2094133&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d`

	const OpenURLButton = ({ url }) => {
		const handlePress = useCallback(async () => {
			const supported = await Linking.canOpenURL(url)

			if (supported) {
				await Linking.openURL(url)
			} else {
				Alert.alert(`Couldn't open the Uber! Do you have it installed?`)
			}
		}, [url])

		return (
			<Button bg={'black'} onPress={handlePress}>
				Open Uber
			</Button>
		)
	}

	return (
		<Box>
			<VStack space={3}>
				<Heading textTransform={'uppercase'} lineHeight={'xs'} fontSize={'md'} fontWeight={'black'}>
					GET HERE FAST.
				</Heading>
				<OpenURLButton url={url} />
			</VStack>
		</Box>
	)
}
