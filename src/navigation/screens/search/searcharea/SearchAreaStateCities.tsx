import { useReactiveVar } from '@apollo/client'
import { LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import { Feather } from '@expo/vector-icons'
import { useGetAllCitiesByStateQuery } from '@graphql/generated'
import { HorizontalCityItemProps } from '@navigation/stacks/modals/searchareastack/SearchAreaStack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions, useNavigation } from '@react-navigation/native'
import { SearchAreaReactiveVar } from '@reactive'
import { filter } from 'lodash'
import { Button, Text, Icon, Center } from 'native-base'
import { useContext, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeContext } from 'styled-components/native'

// TODO: FN(When done save this data to the backend as recent SearchAreas)

export default function SearchAreaStateCities() {
	// const route = useRoute<RouteProp<SearchAreaStackParamList, 'SearchCountryTextScreen'>>()
	const { bottom } = useSafeAreaInsets()
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const [stateCities, setStateCities] = useState<Array<HorizontalCityItemProps>>([])
	const [pagination, setPagination] = useState<number>()
	const formContext = useFormContext()

	const { watch, getValues, setValue, handleSubmit } = formContext

	const { data, loading, error } = useGetAllCitiesByStateQuery({
		skip: !getValues('state') || !getValues('country'),
		variables: {
			country: getValues('country'),
			state: getValues('state'),
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
		if (!watch('searchtext').length && data.getAllCitiesByState.length) {
			setStateCities(data.getAllCitiesByState)
		}

		const filteredData = filter(data.getAllCitiesByState, state => {
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
		if (watch('searchtext')) {
			filterList(watch('searchtext'))
		}
	}, [watch('searchtext')])

	if (!getValues('state')) {
		return (
			<Center p={10}>
				<Text fontSize={'lg'}> No state provided</Text>
			</Center>
		)
	}
	if (!data || loading) return null

	const onSubmit = async (): Promise<void | null> => {
		setValue('searchtext', '')
		const newSearchAreaValue = JSON.stringify({ ...rSearchAreaVar, country: '', state: '', city: '' })
		await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, newSearchAreaValue)
		navigation.dispatch(StackActions.popToTop())
	}

	return (
		<FlatList
			data={stateCities.slice(0, pagination)}
			style={{ flex: 1 }}
			contentInset={{
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
							watch('city') === item.name ? (
								<Icon color={'primary.500'} size={'lg'} as={Feather} name={'check'} />
							) : null
						}
						onPress={async () => {
							setValue('city', item.name)
							setValue('latitude', item.latitude)
							setValue('longitude', item.longitude)
							setValue('distance', 30)
							setValue('done', true)
							const { country, state, city, latitude, longitude } = getValues()
							const newSearchAreaValue = JSON.stringify({
								...rSearchAreaVar,
								country,
								state,
								city,
								coords: {
									latitude,
									longitude,
								},
							})
							await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, newSearchAreaValue)
							SearchAreaReactiveVar({
								...rSearchAreaVar,
								country,
								state,
								city,
								coords: {
									latitude: Number(latitude),
									longitude: Number(longitude),
								},
								useCurrentLocation: false,
							})
							navigation.dispatch(StackActions.popToTop())
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
