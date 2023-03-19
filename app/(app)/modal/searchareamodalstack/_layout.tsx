import { useReactiveVar } from '@apollo/client'
import { PlaceType } from '@preferences'
import { SearchAreaReactiveVar } from '@reactive'
import { Stack, useSearchParams } from 'expo-router'
import { Box, Input } from 'native-base'
import { useContext, useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export type HorizontalCityItemProps = {
	countryCode: string
	latitude: string
	longitude: string
	name: string
	stateCode: string
}
export type HorizontalStateItemProps = {
	countryCode: string
	isoCode: string
	latitude: string
	longitude: string
	name: string
}

export type HorizontalCountryItemProps = {
	currency: string
	flag?: string
	isoCode: string
	latitude: string
	longitude: string
	name: string
	phonecode: string
	timezones: Timezone[]
}

type Timezone = {
	abbreviation: string
	gmtOffset: string
	gmtOffsetName: string
	tzName: string
	zoneName: string
}

export type Form = {
	searchtext?: string
	country: PlaceType
	state: PlaceType
	city: PlaceType
	done: boolean
}

export default function _layout() {
	const params = useSearchParams()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)

	const searchBarTitle = useMemo(() => {
		switch (params.screen) {
			case 'SearchCountryTextScreen':
				return 'Search country'
			case 'SearchCountryStatesTextScreen':
				return 'Search state'
			case 'SearchStateCitiesTextScreen':
				return 'Search city'
		}
	}, [params])

	const methods = useForm<Form>({
		defaultValues: {
			searchtext: '',
			country: {
				name: '',
				isoCode: '',
				coords: {
					latitude: 0,
					longitude: 0,
				},
			},
			state: {
				name: '',
				isoCode: '',
				coords: {
					latitude: 0,
					longitude: 0,
				},
			},
			city: {
				name: '',
				isoCode: '',
				coords: {
					latitude: 0,
					longitude: 0,
				},
			},
			done: false,
		},
	})

	const getData = async () => {
		try {
			if (rSearchAreaVar != null) {
				methods.setValue('city', rSearchAreaVar.searchArea.city)
				methods.setValue('country', rSearchAreaVar.searchArea.country)
				methods.setValue('state', rSearchAreaVar.searchArea.state)
			} else {
				console.log('TODO =========>')
			}
		} catch (e) {
			// error reading value
		}
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<FormProvider {...methods}>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name={'index'} />
				<Stack.Screen
					options={{
						headerShown: true,
						header: () => {
							return (
								<Box bg={'red.500'}>
									<Input h={20} />
								</Box>
							)
						},
					}}
					name={'SearchCountryTextScreen'}
				/>
				<Stack.Screen name={'SearchCountryStatesTextScreen'} />
				<Stack.Screen name={'SearchStateCitiesTextScreen'} />
			</Stack>
		</FormProvider>
	)
}
