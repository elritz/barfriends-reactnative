import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { StateResponseObject, useGetAllStatesByCountryQuery } from '@graphql/generated'
import { FlashList } from '@shopify/flash-list'
import { Form } from 'app/(app)/searcharea/_layout'
import { useRouter, useSearchParams } from 'expo-router'
import { filter } from 'lodash'
import { Button, Text, Center, Box, Skeleton } from 'native-base'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
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
		if (!params?.searchtext?.length && data?.getAllStatesByCountry.length) {
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

	if (loading) {
		return (
			<Box flex={1} mx={3} pt={top + SEARCH_BAR_HEIGHT + 20}>
				{[...Array(20)].map((item, index) => {
					return (
						<Skeleton
							key={index}
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
				})}
			</Box>
		)
	}

	return (
		<FlashList
			data={countryStates}
			keyboardDismissMode={'on-drag'}
			keyExtractor={(item, index) => 'key' + index}
			contentInset={{
				top: top + SEARCH_BAR_HEIGHT + 20,
				bottom: bottom,
			}}
			ItemSeparatorComponent={() => {
				return <Box my={1} />
			}}
			estimatedItemSize={50}
			renderItem={({ index, item }) => {
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
						_light={{
							bg: watch('state.name') === item.isoCode ? 'primary.500' : 'light.50',
						}}
						_dark={{
							bg: watch('state.name') === item.isoCode ? 'primary.500' : 'dark.50',
						}}
						rounded={'md'}
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
									stateIsoCode: item.isoCode,
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
