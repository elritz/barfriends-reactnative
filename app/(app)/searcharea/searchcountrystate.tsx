import { Form } from './_layout'
import { Box, Center, HStack, Pressable, Text, VStack } from '@components/core'
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { StateResponseObject, useGetAllStatesByCountryQuery } from '@graphql/generated'
import { FlashList } from '@shopify/flash-list'
import { useRouter, useSearchParams } from 'expo-router'
import { filter } from 'lodash'
import { Skeleton } from 'native-base'
import { memo, useEffect, useState } from 'react'
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
				<Text fontSize={'$lg'}> No country provided</Text>
			</Center>
		)
	}

	if (loading) {
		return (
			<Box
				flex={1}
				mx={'$3'}
				sx={{
					pt: top + SEARCH_BAR_HEIGHT + 20,
				}}
			>
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

	function CityItem({ index, item }) {
		const _pressItem = async item => {
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
			renderItem={({ item, index }) => {
				return <MemoizedItem index={index} item={item} />
			}}
		/>
	)
}
