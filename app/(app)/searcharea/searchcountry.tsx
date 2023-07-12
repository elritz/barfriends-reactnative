import { Form } from './_layout'
import { useReactiveVar } from '@apollo/client'
import { Box, Button, Text } from '@components/core'
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { CountryResponseObject, useGetAllCountriesQuery } from '@graphql/generated'
import { ThemeReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { filter } from 'lodash'
import { Skeleton } from 'moti/skeleton'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function SearchCountryTextScreen() {
	const { bottom, top } = useSafeAreaInsets()
	const router = useRouter()
	const params = useLocalSearchParams()
	const rTheme = useReactiveVar(ThemeReactiveVar)
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
							height={80}
							width={'100%'}
							radius={15}
							colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
							colors={
								rTheme.colorScheme === 'light'
									? [
											String(rTheme.theme?.gluestack.tokens.colors.light100),
											String(rTheme.theme?.gluestack.tokens.colors.light300),
									  ]
									: [
											String(rTheme.theme?.gluestack.tokens.colors.dark100),
											String(rTheme.theme?.gluestack.tokens.colors.dark300),
									  ]
							}
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
						w={'$full'}
						sx={{
							py: 0,
							px: 2,
							mx: 3,
							justifyContent: 'space-between',
							h: 50,
							_light: {
								bg: watch('country.name') === item.name ? '$primary500' : '$light50',
							},
							_dark: {
								bg: watch('country.name') === item.name ? '$primary500' : '$dark50',
							},
						}}
						rounded={'$md'}
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
						<Button.Text
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
						</Button.Text>
					</Button>
				)
			}}
		/>
	)
}
