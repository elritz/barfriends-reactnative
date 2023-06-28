import { Form } from './_layout'
import { useReactiveVar } from '@apollo/client'
import { Box, HStack, Heading, Pressable, Text, VStack } from '@components/core'
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import { CityResponseObject, useGetAllCitiesByStateQuery } from '@graphql/generated'
import { LocalStoragePreferenceSearchAreaType2 } from '@preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SearchAreaReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import { useRouter, useSearchParams } from 'expo-router'
import { filter, uniqueId } from 'lodash'
import { Skeleton } from 'native-base'
import { memo, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

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

	const [popularCities, setPopularCities] = useState<CityResponseObject[] | undefined | null>([])
	const [allCities, setAllCities] = useState<CityResponseObject[] | undefined | null>([])
	const [searchCities, setSearchCities] = useState<CityState>()

	const formContext = useFormContext<Form>()
	const { watch, getValues, setValue, handleSubmit } = formContext

	const { data, loading, error } = useGetAllCitiesByStateQuery({
		skip: !params.countryIsoCode || !params.stateIsoCode,
		variables: {
			countryIsoCode: String(params.countryIsoCode),
			stateIsoCode: String(params.stateIsoCode),
		},
		onError: error => {},
		onCompleted: data => {
			if (data.getAllCitiesByState) {
				setPopularCities(data.getAllCitiesByState.popularCities)
				setAllCities(data.getAllCitiesByState.allCities)
			}
		},
	})

	const filterList = text => {
		if (!params?.searchtext?.length && data?.getAllCitiesByState?.allCities?.length) {
			if (data.getAllCitiesByState) {
				setSearchCities({
					title: ``,
					cities: [],
				})
			}
		}

		const filteredAllCitiesData = filter(data?.getAllCitiesByState.allCities, item => {
			return contains(item, text.toLowerCase())
		})
		setSearchCities({
			title: `"${text.toLowerCase()}"`,
			cities: [...filteredAllCitiesData],
		})
	}

	const contains = (item, query) => {
		if (item.name.toLowerCase().includes(query)) {
			return true
		}
		return false
	}

	useEffect(() => {
		if (params.searchtext && params.searchtext.length) {
			filterList(params.searchtext)
		} else {
			if (data?.getAllCitiesByState) {
				setSearchCities({
					title: ``,
					cities: [],
				})
			}
		}
	}, [params.searchtext])

	if (loading || !allCities) {
		return (
			<Box bg={'transparent'} mx={'$3'} flex={1}>
				<FlashList
					data={[...Array(20)]}
					estimatedItemSize={50}
					scrollEnabled={false}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item, index) => {
						return uniqueId().toString()
					}}
					renderItem={({ index, item }) => {
						return (
							<Skeleton
								h='50'
								rounded='md'
								my={1}
								speed={0.95}
								_light={{
									startColor: 'coolGray.100',
									endColor: 'coolGray.300',
								}}
								_dark={{
									startColor: 'dark.200',
									endColor: 'dark.300',
								}}
							/>
						)
					}}
				/>
			</Box>
		)
	}

	function CityItem({ index, item }) {
		const _pressItem = async item => {
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

			await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, JSON.stringify(newSearchAreaValue))
			SearchAreaReactiveVar({
				...newSearchAreaValue,
			})
			router.push({
				pathname: '(app)/searcharea',
			})
		}

		return (
			<Pressable onPress={() => _pressItem(item)}>
				<Box
					sx={{
						h: 50,
						_light: {
							bg: watch('city.name') === item.name ? '$primary500' : '$light100',
						},
						_dark: {
							bg: watch('city.name') === item.name ? '$primary500' : '$dark50',
						},
					}}
					py={'$3'}
					px={'$3'}
					mx={'$3'}
					my={'$1'}
					rounded={'$md'}
				>
					<HStack justifyContent='space-between'>
						<Text fontWeight={'$medium'} fontSize={'$md'} numberOfLines={1} ellipsizeMode={'tail'}>
							{item.name}
						</Text>
						<HStack space={'md'} alignItems={'center'}>
							{item.venuesInArea && item.venuesInArea > 1 ? (
								<VStack>
									<Text textAlign={'center'} fontWeight={'$light'} fontSize={'$md'} numberOfLines={1}>
										{item.venuesInArea}
									</Text>
									<Text textAlign={'center'} fontWeight={'$light'} fontSize={'$sm'} numberOfLines={1}>
										Venues
									</Text>
								</VStack>
							) : null}
						</HStack>
					</HStack>
				</Box>
			</Pressable>
		)
	}

	const MemoizedItem = memo(CityItem)

	if (searchCities && searchCities.title && searchCities.cities) {
		return (
			<Box flex={1}>
				<FlashList
					data={searchCities.cities}
					scrollEnabled={true}
					keyboardDismissMode='on-drag'
					estimatedItemSize={50}
					keyExtractor={(item, index) => {
						return uniqueId().toString()
					}}
					ListHeaderComponent={() => {
						return (
							<Box bg={'transparent'} mb={'$2'} mx={'$3'}>
								<Heading mx={'$3'} fontSize={'$2xl'}>
									{searchCities.title}
								</Heading>
							</Box>
						)
					}}
					renderItem={({ item, index }) => {
						return <MemoizedItem index={index} item={item} />
					}}
					ItemSeparatorComponent={() => {
						return <Box my={1} />
					}}
					contentInset={{
						top: top + SEARCH_BAR_HEIGHT + 20,
						bottom: bottom,
					}}
				/>
			</Box>
		)
	}

	return (
		<Box flex={1} px={'$3'}>
			<FlashList
				data={allCities}
				scrollEnabled={true}
				automaticallyAdjustContentInsets
				automaticallyAdjustKeyboardInsets
				automaticallyAdjustsScrollIndicatorInsets
				keyboardDismissMode='on-drag'
				estimatedItemSize={50}
				keyExtractor={(item, index) => {
					return item.name
				}}
				ListHeaderComponent={() => {
					return (
						<Box bg={'transparent'}>
							{popularCities && popularCities.length ? (
								<Box bg={'transparent'}>
									<Heading>Popular</Heading>
									{popularCities.map((item, index) => {
										return <MemoizedItem key={uniqueId()} index={index} item={item} />
									})}
								</Box>
							) : null}
							<Heading>All Cities</Heading>
						</Box>
					)
				}}
				renderItem={({ item, index }) => {
					return <MemoizedItem index={index} item={item} />
				}}
				ItemSeparatorComponent={() => {
					return <Box my={1} />
				}}
				contentInset={{
					top: top + SEARCH_BAR_HEIGHT,
					bottom: bottom,
				}}
			/>
		</Box>
	)
}
