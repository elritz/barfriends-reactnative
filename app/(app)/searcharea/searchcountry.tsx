import { Form } from './_layout'
import { Box, Text } from '@components/core'
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { CountryResponseObject, useGetAllCountriesQuery } from '@graphql/generated'
import { FlashList } from '@shopify/flash-list'
import { useRouter, useSearchParams } from 'expo-router'
import { filter } from 'lodash'
import { Button, Skeleton } from 'native-base'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function SearchCountryTextScreen() {
	const { bottom, top } = useSafeAreaInsets()
	const router = useRouter()
	const params = useSearchParams()
	const [countries, setCountries] = useState<CountryResponseObject[]>([])
	const [pagination, setPagination] = useState<number>()

	const { watch, setValue } = useFormContext<Form>()

	const { data, loading, error } = useGetAllCountriesQuery({
		onCompleted: data => {
			if (data.getAllCountries) {
				setCountries(data?.getAllCountries)
				setPagination(data.getAllCountries.length / 4)
			}
		},
	})

	const filterList = text => {
		if (!params?.searchtext?.length && data?.getAllCountries.length) {
			if (data.getAllCountries) {
				setCountries(data.getAllCountries)
			}
		}

		const filteredCountriesData = filter(data?.getAllCountries, item => {
			return contains(item, text.toLowerCase())
		})
		setCountries(filteredCountriesData)
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
			if (data?.getAllCountries) {
				setCountries(data.getAllCountries)
			}
		}
	}, [params.searchtext])

	useEffect(() => {
		if (params.searchtext) {
			filterList(params.searchtext)
		} else {
			if (data?.getAllCountries) {
				setCountries(data.getAllCountries)
			}
		}
	}, [params.searchtext])

	if (loading) {
		return (
			<Box flex={1} mx={'$3'} sx={{ pt: top + SEARCH_BAR_HEIGHT + 20 }}>
				{[...Array(20)].map((item, index) => {
					return (
						<Skeleton
							key={index}
							h='50'
							rounded='md'
							my={1}
							startColor='coolGray.100'
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
			data={countries}
			contentInset={{
				top: top + SEARCH_BAR_HEIGHT + 20,
				bottom: bottom,
			}}
			keyExtractor={(item, index) => 'key' + index}
			estimatedItemSize={50}
			keyboardDismissMode={'on-drag'}
			ItemSeparatorComponent={() => {
				return <Box my={'$1'} />
			}}
			renderItem={({ index, item }) => {
				return (
					<Button
						key={index}
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
							bg: watch('country.name') === item.name ? 'primary.500' : 'light.50',
						}}
						_dark={{
							bg: watch('country.name') === item.name ? 'primary.500' : 'dark.50',
						}}
						rounded={'md'}
						onPress={() => {
							setValue('country', {
								name: item.name,
								isoCode: item.isoCode,
								coords: {
									latitude: Number(item.latitude),
									longitude: Number(item.longitude),
								},
							})
							router.push({
								pathname: '(app)/searcharea/searchcountrystate',
								params: {
									countryIsoCode: item.isoCode,
								},
							})
						}}
					>
						<Text
							mt={'$0.5'}
							textAlign={'center'}
							fontWeight={'$medium'}
							fontSize={'$lg'}
							numberOfLines={1}
							ellipsizeMode={'tail'}
						>
							{item.flag}
							{` `}
							{item.name}
						</Text>
					</Button>
				)
			}}
		/>
	)
}
