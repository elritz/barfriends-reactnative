import { useReactiveVar } from '@apollo/client'
import { Feather } from '@expo/vector-icons'
import { StateResponseObject, useGetAllStatesByCountryQuery } from '@graphql/generated'
import { Form, HorizontalStateItemProps } from '@navigation/stacks/searchareastack/SearchAreaStack'
import { RouteProp, StackActions, useNavigation, useRoute } from '@react-navigation/native'
import { SearchAreaReactiveVar, SearchReactiveVar } from '@reactive'
import { filter } from 'lodash'
import { Button, Text, Icon, Center } from 'native-base'
import { useContext, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SearchAreaStackParamList } from 'src/types/app'

export type SearchCountryStatesTextScreenRouteProp = RouteProp<
	SearchAreaStackParamList,
	'SearchCountryStatesTextScreen'
>

export default function SearchAreaCountryStates() {
	const { bottom } = useSafeAreaInsets()
	const navigation = useNavigation()
	const route = useRoute<SearchCountryStatesTextScreenRouteProp>()
	const [countryStates, setCountryStates] = useState<Array<StateResponseObject>>([])
	const [pagination, setPagination] = useState<number>()
	const formContext = useFormContext<Form>()

	const { watch, getValues, setValue } = formContext

	const { data, loading, error } = useGetAllStatesByCountryQuery({
		skip: !route.params.country,
		variables: {
			countryIsoCode: route.params.country,
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
		if (!watch('searchtext').length && data?.getAllStatesByCountry.length) {
			setCountryStates(data.getAllStatesByCountry)
		}

		const filteredData = filter(data.getAllStatesByCountry, state => {
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
		if (watch('searchtext')) {
			filterList(watch('searchtext'))
		}
	}, [watch('searchtext')])

	if (!route.params.country) {
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
							setValue('searchtext', '')
							setValue('state', {
								name: item.name,
								isoCode: item.isoCode,
								coords: {
									latitude: Number(item.latitude),
									longitude: Number(item.longitude),
								},
							})
							navigation.dispatch(StackActions.pop())
							navigation.navigate('ModalNavigator', {
								screen: 'SearchAreaModalStack',
								params: {
									screen: 'SearchStateCitiesTextScreen',
									params: {
										country: item.countryCode,
										state: item.isoCode,
									},
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
