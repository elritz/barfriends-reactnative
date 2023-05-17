import { Form } from './_layout'
import { useReactiveVar } from '@apollo/client'
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import { Feather } from '@expo/vector-icons'
import { CityResponseObject, useGetAllCitiesByStateQuery } from '@graphql/generated'
import { LocalStoragePreferenceSearchAreaType2 } from '@preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SearchAreaReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import { useRouter, useSearchParams } from 'expo-router'
import { filter } from 'lodash'
import { Text, Icon, Box, HStack, Button, Skeleton, Heading } from 'native-base'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// TODO: FN(When done save this data to the backend as recent SearchAreas)

export default function SearchAreaStateCities() {
	const router = useRouter()
	const params = useSearchParams()
	const { top, bottom } = useSafeAreaInsets()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const [stateCities, setStateCities] = useState<(string | CityResponseObject)[]>()
	const formContext = useFormContext<Form>()

	const { watch, getValues, setValue, handleSubmit } = formContext

	const { data, loading, error } = useGetAllCitiesByStateQuery({
		skip: !params.countryIsoCode || !params.stateIsoCode,
		variables: {
			countryIsoCode: String(params.countryIsoCode),
			stateIsoCode: String(params.stateIsoCode),
		},
		onCompleted: data => {
			setStateCities([
				'Popular',
				...data.getAllCitiesByState.popularCities,
				'All Cities',
				...data.getAllCitiesByState.allCities,
			])
		},
	})

	const filterList = text => {
		if (!params?.searchtext?.length && data?.getAllCitiesByState?.allCities?.length) {
			if (data.getAllCitiesByState) {
				setStateCities([
					'Popular',
					...[data.getAllCitiesByState.popularCities],
					'All Cities',
					...[data.getAllCitiesByState.allCities],
				])
			}
		}

		const filteredAllCitiesData = filter(data?.getAllCitiesByState.allCities, state => {
			return contains(state, text.toLowerCase())
		})
		setStateCities([filteredAllCitiesData])
	}

	const contains = (state, query) => {
		if (state.name.toLowerCase().includes(query)) {
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
					'Popular',
					...[data.getAllCitiesByState.popularCities],
					'All Cities',
					...[data.getAllCitiesByState.allCities],
				])
			}
		}
	}, [params.searchtext])

	if (loading) {
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
			renderItem={({ index, item }) => {
				if (typeof item === 'string') {
					// Rendering header
					return <Heading mx={3}>{item}</Heading>
				} else {
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
							px={4}
							// my={1}
							mx={3}
							_light={{
								bg: 'light.200',
							}}
							_dark={{
								bg: 'dark.100',
							}}
							rounded={'md'}
							rightIcon={
								<HStack space={3}>
									<Text textAlign={'center'} fontWeight={'light'} fontSize={'lg'} numberOfLines={1}>
										{item.venuesInArea}
									</Text>
									{watch('city.name') === item.name && (
										<Icon color={'primary.500'} size={'lg'} as={Feather} name={'check'} />
									)}
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
								setValue('done', true)
								const { country, state, city } = getValues()
								const newSearchAreaValue: LocalStoragePreferenceSearchAreaType2 = {
									...rSearchAreaVar,
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

								await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, JSON.stringify(newSearchAreaValue))
								// Setting Static SearchArea (Use city as Coord lat,lng)
								SearchAreaReactiveVar({
									...newSearchAreaValue,
								})
								router.push({
									pathname: '(app)/searcharea',
								})
							}}
						>
							<Text
								textAlign={'center'}
								fontWeight={'medium'}
								fontSize={'lg'}
								numberOfLines={1}
								ellipsizeMode={'tail'}
							>
								{item.name}
							</Text>
						</Button>
					)
				}
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
