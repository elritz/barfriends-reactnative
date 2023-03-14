import { useReactiveVar } from '@apollo/client'
import { UBER_CLIENT_ID_KEY } from '@env'
import { useCurrentVenueQuery } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { Button } from 'native-base'
import React, { useCallback } from 'react'
import { Alert, Linking } from 'react-native'

export default function UberButton({ params }) {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const {
		data: PData,
		loading: PLoading,
		error: PError,
	} = useCurrentVenueQuery({
		skip: !params.profileid || !rAuthorizationVar,
		fetchPolicy: 'cache-only',
		variables: {
			where: {
				id: { equals: String(params.profileid) },
			},
		},
	})

	const urlUberWithVenue = `https://m.uber.com/ul/?client_id=${UBER_CLIENT_ID_KEY}&action=setPickup&pickup[my_location]&pickup[nickname]=MyLocation&pickup[formatted_address]=1455%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103&dropoff[latitude]=${PData?.currentVenue?.Venue?.Location?.Geometry?.latitude}&dropoff[longitude]=${PData?.currentVenue?.Venue?.Location?.Geometry?.longitude}&dropoff[nickname]=Coit%20Tower&dropoff[formatted_address]=1%20Telegraph%20Hill%20Blvd%2C%20San%20Francisco%2C%20CA%2094133&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d`
	const urlUber = `https://m.uber.com/ul/?client_id=${UBER_CLIENT_ID_KEY}&action=setPickup&pickup[my_location]&pickup[nickname]=MyLocation&pickup[formatted_address]=1455%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103&&dropoff[formatted_address]=1%20Telegraph%20Hill%20Blvd%2C%20San%20Francisco%2C%20CA%2094133&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d`

	const handleUberWithVenuePress = useCallback(async () => {
		const supported = await Linking.canOpenURL(urlUberWithVenue)

		if (supported) {
			await Linking.openURL(urlUberWithVenue)
		} else {
			Alert.alert(`Couldn't open the Uber! Do you have it installed?`)
		}
	}, [urlUberWithVenue])

	const handleUberNoVenuePress = useCallback(async () => {
		const supported = await Linking.canOpenURL(urlUber)

		if (supported) {
			await Linking.openURL(urlUber)
		} else {
			Alert.alert(`Couldn't open the Uber! Do you have it installed?`)
		}
	}, [urlUber])

	return (
		<Button
			bg={'black'}
			onPress={() => {
				!params.profileid ||
				(!PData?.currentVenue?.Venue?.Location?.Geometry?.latitude &&
					!PData?.currentVenue?.Venue?.Location?.Geometry?.latitude)
					? handleUberNoVenuePress()
					: handleUberWithVenuePress()
			}}
		>
			{PLoading ? 'loading' : 'Open Uber'}
		</Button>
	)
}
