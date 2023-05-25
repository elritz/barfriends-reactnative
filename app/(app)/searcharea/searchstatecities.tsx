import { Form } from './_layout'
import { useReactiveVar } from '@apollo/client'
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import { CityResponseObject, useGetAllCitiesByStateQuery } from '@graphql/generated'
import { LocalStoragePreferenceSearchAreaType2 } from '@preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SearchAreaReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import { useRouter, useSearchParams } from 'expo-router'
import { filter } from 'lodash'
import { Text, Box, HStack, Button, Skeleton, Heading, VStack } from 'native-base'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// TODO: FN(When done save this data to the backend as recent SearchAreas)

type CityState = {
	title: string
	cities: CityResponseObject[] | undefined | null
}

export default function SearchAreaStateCities() {
	const router = useRouter()
	const params = useSearchParams()
	const { top, bottom } = useSafeAreaInsets()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const [stateCities, setStateCities] = useState<CityState[]>()
	const formContext = useFormContext<Form>()

	const { watch, getValues, setValue, handleSubmit } = formContext

	const { data, loading, error } = useGetAllCitiesByStateQuery({
		skip: !params.countryIsoCode || !params.stateIsoCode,
		variables: {
			countryIsoCode: String(params.countryIsoCode),
			stateIsoCode: String(params.stateIsoCode),
		},
		onCompleted: data => {
			if (data.getAllCitiesByState) {
				setStateCities([
					{
						title: 'Popular',
						cities: data.getAllCitiesByState.popularCities,
					},
					{
						title: 'All Cities',
						cities: data.getAllCitiesByState.allCities,
					},
				])
			}
		},
	})

	const filterList = text => {
		if (!params?.searchtext?.length && data?.getAllCitiesByState?.allCities?.length) {
			if (data.getAllCitiesByState) {
				setStateCities([
					{
						title: 'Popular',
						cities: data.getAllCitiesByState.popularCities,
					},
					{
						title: 'All Cities',
						cities: data.getAllCitiesByState.allCities,
					},
				])
			}
		}

		const filteredAllCitiesData = filter(data?.getAllCitiesByState.allCities, item => {
			return contains(item, text.toLowerCase())
		})

		setStateCities([
			{
				title: `"${text.toLowerCase()}"`,
				cities: [...filteredAllCitiesData],
			},
		])
	}

	const contains = (item, query) => {
		if (item.name.toLowerCase().includes(query)) {
			return true
		}
		return false
	}

	useEffect(() => {
		if (params.searchtext) {
			filterList(params.searchtext)
		} else {
			if (data?.getAllCitiesByState) {
				setStateCities([
					{
						title: 'Popular',
						cities: data.getAllCitiesByState.popularCities,
					},
					{
						title: 'All Cities',
						cities: data.getAllCitiesByState.allCities,
					},
				])
			}
		}
	}, [params.searchtext])

	if (loading && !!stateCities?.length) {
		return (
			<Box flex={1} mx={3} pt={top + SEARCH_BAR_HEIGHT + 20}>
				{[...Array(20)].map(item => {
					return <Skeleton h='50' rounded='md' my={1} startColor='coolGray.100' />
				})}
			</Box>
		)
	}

	return (
		<FlashList
			data={stateCities}
			keyboardDismissMode='on-drag'
			keyExtractor={(item, index) => {
				return 'key' + index + item.title
			}}
			renderItem={({ index, item }) => {
				return (
					<Box>
						{item.cities && item.cities.length > 0 ? (
							<Box my={1}>
								<Heading mx={3}>{item.title}</Heading>
								{item.cities?.map(item => {
									return (
										<Button
											_stack={{
												paddingY: 0,
												paddingX: 2,
												marginX: 3,
												w: '100%',
												justifyContent: 'space-between',
											}}
											h={'50px'}
											py={3}
											px={1}
											mx={3}
											my={1}
											_light={{
												bg: watch('city.name') === item.name ? 'primary.500' : 'light.100',
											}}
											_dark={{
												bg: watch('city.name') === item.name ? 'primary.500' : 'dark.50',
											}}
											rounded={'md'}
											rightIcon={
												<HStack space={3} alignItems={'center'}>
													{item.venuesInArea && item.venuesInArea > 1 ? (
														<VStack>
															<Text textAlign={'center'} fontWeight={'light'} fontSize={'md'} numberOfLines={1}>
																{item.venuesInArea}
															</Text>
															<Text textAlign={'center'} fontWeight={'light'} fontSize={'sm'} numberOfLines={1}>
																Venues
															</Text>
														</VStack>
													) : null}
												</HStack>
											}
											textAlign={'left'}
											onPress={async () => {
												setValue('city', {
													name: item.name,
													isoCode: '',
													coords: {
														latitude: Number(item.latitude),
														longitude: Number(item.longitude),
													},
												})
												const { country, state, city } = getValues()
												const newSearchAreaValue: LocalStoragePreferenceSearchAreaType2 = {
													...rSearchAreaVar,
													useCurrentLocation: false,
													searchArea: {
														country,
														state,
														city,
														coords: {
															latitude: city.coords.latitude,
															longitude: city.coords.longitude,
														},
													},
												}

												await AsyncStorage.setItem(
													LOCAL_STORAGE_SEARCH_AREA,
													JSON.stringify(newSearchAreaValue),
												)
												SearchAreaReactiveVar({
													...newSearchAreaValue,
												})
												router.push({
													pathname: '(app)/searcharea',
												})
											}}
										>
											<Text fontWeight={'medium'} fontSize={'md'} numberOfLines={1} ellipsizeMode={'tail'}>
												{item.name}
											</Text>
										</Button>
									)
								})}
							</Box>
						) : null}
					</Box>
				)
			}}
			estimatedItemSize={200}
			ItemSeparatorComponent={() => {
				return <Box my={1} />
			}}
			contentInset={{
				top: top + SEARCH_BAR_HEIGHT + 20,
				bottom: bottom,
			}}
		/>
	)
}
