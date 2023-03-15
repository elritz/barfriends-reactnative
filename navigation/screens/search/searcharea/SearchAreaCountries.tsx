import { useReactiveVar } from '@apollo/client'
import { Feather } from '@expo/vector-icons'
import { useGetAllCountriesQuery } from '@graphql/generated'
import { Form, HorizontalCountryItemProps } from '@navigation/stacks/searcharea/SearchAreaStack'
import { StackActions, useNavigation } from '@react-navigation/native'
import { SearchAreaReactiveVar } from '@reactive'
import { filter } from 'lodash'
import { Button, Icon, Text } from 'native-base'
import { SetStateAction, useContext, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FlatList, Pressable, ListRenderItemInfo } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function SearchAreaCountries() {
	const { bottom } = useSafeAreaInsets()
	const navigation = useNavigation()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const [countries, setCountries] = useState<HorizontalCountryItemProps[]>([])
	const [pagination, setPagination] = useState<number>()

	const formContext = useFormContext<Form>()
	const { watch, setValue } = formContext

	const { data, loading, error } = useGetAllCountriesQuery({
		onCompleted: data => {
			if (data.getAllCountries) {
				setCountries(data.getAllCountries)
				setPagination(data.getAllCountries.length / 4)
			}
		},
	})

	const filterList = text => {
		if (!watch('searchtext').length && data?.getAllCountries.length) {
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
		if (watch('searchtext')) {
			filterList(watch('searchtext'))
		}
	}, [watch('searchtext')])

	if (loading) {
		return <Text>Loading......</Text>
	}

	return (
		<FlatList
			data={countries.slice(0, pagination)}
			contentInset={{
				bottom: bottom,
			}}
			onEndReached={() => setPagination(pagination + data.getAllCountries.length / 2)}
			onEndReachedThreshold={150}
			keyboardDismissMode={'on-drag'}
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
						my={1}
						_light={{
							bg: 'light.200',
						}}
						_dark={{
							bg: 'dark.100',
						}}
						rounded={'full'}
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
							setValue('searchtext', '')
							navigation.dispatch(StackActions.pop())
							navigation.navigate('modal', {
								screen: 'SearchAreaModalStack',
								params: {
									screen: 'SearchCountryStatesTextScreen',
									params: {
										country: item.isoCode,
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
