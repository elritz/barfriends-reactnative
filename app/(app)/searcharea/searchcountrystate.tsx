import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { SearchAreaStackParamList } from '@ctypes/app'
import { Feather } from '@expo/vector-icons'
import { StateResponseObject, useGetAllStatesByCountryQuery } from '@graphql/generated'
import { RouteProp } from '@react-navigation/native'
import { Form } from 'app/(app)/searcharea/_layout'
import { useRouter, useSearchParams } from 'expo-router'
import { filter } from 'lodash'
import { Button, Text, Icon, Center } from 'native-base'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function SearchAreaCountryStates() {
	const { top, bottom } = useSafeAreaInsets()
	const router = useRouter()
	const params = useSearchParams()

	const [countryStates, setCountryStates] = useState<Array<StateResponseObject>>([])
	const [pagination, setPagination] = useState<number>()
	const formContext = useFormContext<Form>()

	const { watch, getValues, setValue } = formContext

	const { data, loading, error } = useGetAllStatesByCountryQuery({
		skip: !String(params.countryIsoCode),
		variables: {
			countryIsoCode: String(params.countryIsoCode),
		},
		onCompleted: data => {
			setCountryStates(data.getAllStatesByCountry)
			if (data.getAllStatesByCountry.length > 100) {
				setPagination(data.getAllStatesByCountry.length / 4)
			} else {
				setPagination(data.getAllStatesByCountry.length)
			}
		},
	})

	const filterList = text => {
		if (!params?.searchtext.length && data?.getAllStatesByCountry.length) {
			setCountryStates(data.getAllStatesByCountry)
		}

		const filteredData = filter(data?.getAllStatesByCountry, state => {
			return contains(state, text.toLowerCase())
		})
		setCountryStates(filteredData)
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

	if (!params.countryIsoCode) {
		return (
			<Center p={10}>
				<Text fontSize={'lg'}> No country provided</Text>
			</Center>
		)
	}
	if (!data || loading) {
		return (
			<>
				<Text>loading.....</Text>
			</>
		)
	}

	return (
		<FlatList
			data={countryStates.slice(0, pagination)}
			keyboardDismissMode={'on-drag'}
			style={{ flex: 1 }}
			contentInset={{
				top: top + SEARCH_BAR_HEIGHT + 20,
				bottom: bottom,
			}}
			onEndReached={() => setPagination(pagination + data.getAllStatesByCountry.length / 3)}
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
							watch('state.name') === item.name ? (
								<Icon color={'blueGray.700'} size={'lg'} as={Feather} name={'check'} />
							) : null
						}
						onPress={() => {
							setValue('state', {
								name: item.name,
								isoCode: item.isoCode,
								coords: {
									latitude: Number(item.latitude),
									longitude: Number(item.longitude),
								},
							})
							router.replace({
								pathname: '(app)/searcharea/searchstatecities',
								params: {
									countryIsoCode: item.countryCode,
									state: item.isoCode,
								},
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
