import { useReactiveVar } from '@apollo/client'
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { Feather } from '@expo/vector-icons'
import { useGetAllCountriesQuery } from '@graphql/generated'
import { SearchAreaReactiveVar } from '@reactive'
import { Form, HorizontalCountryItemProps } from 'app/(app)/searcharea/_layout'
import { useRouter, useSearchParams } from 'expo-router'
import { filter } from 'lodash'
import { Box, Button, Icon, Text } from 'native-base'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FlatList, ListRenderItemInfo } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function SearchCountryTextScreen() {
	const { bottom, top } = useSafeAreaInsets()
	const router = useRouter()
	const params = useSearchParams()
	const [countries, setCountries] = useState<HorizontalCountryItemProps[]>([])
	const [pagination, setPagination] = useState<number>()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)

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
		if (!params.searchtext.length && data?.getAllCountries.length) {
			setCountries(data.getAllCountries)
		}

		const filteredData = filter(data?.getAllCountries, country => {
			return contains(country, text.toLowerCase())
		})
		setCountries(filteredData)
	}

	const contains = (country, query) => {
		if (country.name.toLowerCase().includes(query)) {
			return true
		}
		return false
	}

	useEffect(() => {
		if (params.searchtext) {
			filterList(params.searchtext)
		}
	}, [params.searchtext])

	if (loading) {
		return <Text>Loading......</Text>
	}

	return (
		<FlatList
			data={countries.slice(0, pagination)}
			contentInset={{
				top: top + SEARCH_BAR_HEIGHT + 20,
				bottom: bottom,
			}}
			onEndReached={() => setPagination(pagination + data.getAllCountries.length / 2)}
			onEndReachedThreshold={150}
			keyboardDismissMode={'on-drag'}
			ItemSeparatorComponent={() => {
				return <Box my={1} />
			}}
			renderItem={({ index, item }: ListRenderItemInfo<HorizontalCountryItemProps>) => {
				return (
					<Button
						key={index}
						_stack={{
							paddingY: 0,
							paddingX: 2,
							marginY: 1,
							marginX: 3,
							w: '100%',
							justifyContent: 'space-between',
						}}
						mx={3}
						_light={{
							bg: 'light.200',
						}}
						_dark={{
							bg: 'dark.100',
						}}
						rounded={'xl'}
						endIcon={
							watch('country.name') === item.name ? (
								<Icon color={'secondary.600'} size={'lg'} as={Feather} name={'check'} />
							) : null
						}
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
							mt={-0.5}
							textAlign={'center'}
							fontWeight={'medium'}
							fontSize={'lg'}
							numberOfLines={1}
							ellipsizeMode={'tail'}
						>
							{item.flag}
							{` `}
							{item.name}
						</Text>
						{/* <HorizontalCountryItem index={index} separators={null} item={item} /> */}
					</Button>
				)
			}}
		/>
	)
}
