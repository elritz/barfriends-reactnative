import { Form } from './_layout'
import { useReactiveVar } from '@apollo/client'
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import { Feather } from '@expo/vector-icons'
import { CityResponseObject, useGetAllCitiesByStateQuery } from '@graphql/generated'
import { LocalStoragePreferenceSearchAreaType2 } from '@preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SearchAreaReactiveVar } from '@reactive'
import { useRouter, useSearchParams } from 'expo-router'
import { filter } from 'lodash'
import { Button, Text, Icon, Center } from 'native-base'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// TODO: FN(When done save this data to the backend as recent SearchAreas)

export default function SearchAreaStateCities() {
	const router = useRouter()
	const params = useSearchParams()
	const { top, bottom } = useSafeAreaInsets()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const [stateCities, setStateCities] = useState<CityResponseObject[]>([])
	const [pagination, setPagination] = useState<number>(10)
	const formContext = useFormContext<Form>()

	const { watch, getValues, setValue, handleSubmit } = formContext

	const { data, loading, error } = useGetAllCitiesByStateQuery({
		skip: !params.countryIsoCode || !params.state,
		variables: {
			countryIsoCode: String(params.countryIsoCode),
			stateIsoCode: String(params.state),
		},
		onCompleted: data => {
			setStateCities(data.getAllCitiesByState)
			if (data.getAllCitiesByState.length > 100) {
				setPagination(data.getAllCitiesByState.length / 4)
			} else {
				setPagination(data.getAllCitiesByState.length)
			}
		},
	})

	const filterList = text => {
		if (!params?.searchtext.length && data?.getAllCitiesByState.length) {
			if (data.getAllCitiesByState) {
				setStateCities(data.getAllCitiesByState)
			}
		}

		const filteredData = filter(data?.getAllCitiesByState, state => {
			return contains(state, text.toLowerCase())
		})
		setStateCities(filteredData)
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
		}
	}, [params.searchtext])

	if (!data || loading) {
		return (
			<>
				<Text>loading.....</Text>
			</>
		)
	}

	return (
		<FlatList
			data={stateCities.slice(0, pagination)}
			style={{ flex: 1 }}
			contentInset={{
				top: top + SEARCH_BAR_HEIGHT + 20,
				bottom: bottom,
			}}
			onEndReached={() => setPagination(pagination + data.getAllCitiesByState.length / 3)}
			keyboardDismissMode={'on-drag'}
			renderItem={({ index, item }) => {
				return (
					<Button
						_stack={{
							paddingY: 0,
							paddingX: 2,
							marginY: 1,
							marginX: 3,
							w: '100%',
							justifyContent: 'space-between',
						}}
						mx={3}
						my={1}
						_light={{
							bg: 'light.200',
						}}
						_dark={{
							bg: 'dark.100',
						}}
						rounded={'full'}
						endIcon={
							watch('city.name') === item.name ? (
								<Icon color={'primary.500'} size={'lg'} as={Feather} name={'check'} />
							) : undefined
						}
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
							mt={-0.5}
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
			}}
		/>
	)
}
