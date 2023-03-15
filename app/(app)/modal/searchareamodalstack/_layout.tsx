import { useReactiveVar } from '@apollo/client'
import ExploreSearchInputDisabled from '@components/molecules/search/explore/ExploreSearchInputDisabled'
import { Form } from '@navigation/stacks/searcharea/SearchAreaStack'
import { SearchAreaReactiveVar } from '@reactive'
import { Stack, useSearchParams } from 'expo-router'
import { Box, Input } from 'native-base'
import { useContext, useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export default function _layout() {
	const params = useSearchParams()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)

	const handleNavigationToNewSearchAreaForm = () => {
		// navigation.navigate('modal', {
		// 	screen: 'SearchAreaModalStack',
		// 	params: {
		// 		screen: 'SearchCountryTextScreen',
		// 		params: {
		// 			searchText: '',
		// 		},
		// 	},
		// })
	}

	const searchBarTitle = useMemo(() => {
		switch (params.screen) {
			case 'SearchCountryTextScreen':
				return 'Search country'
			case 'SearchCountryStatesTextScreen':
				return 'Search state'
			case 'SearchStateCitiesTextScreen':
				return 'Search city'
		}
	}, [params])

	const methods = useForm<Form>({
		defaultValues: {
			searchtext: '',
			country: {
				name: '',
				isoCode: '',
				coords: {
					latitude: 0,
					longitude: 0,
				},
			},
			state: {
				name: '',
				isoCode: '',
				coords: {
					latitude: 0,
					longitude: 0,
				},
			},
			city: {
				name: '',
				isoCode: '',
				coords: {
					latitude: 0,
					longitude: 0,
				},
			},
			done: false,
		},
	})

	const getData = async () => {
		try {
			if (rSearchAreaVar != null) {
				methods.setValue('city', rSearchAreaVar.searchArea.city)
				methods.setValue('country', rSearchAreaVar.searchArea.country)
				methods.setValue('state', rSearchAreaVar.searchArea.state)
			} else {
				console.log('TODO =========>')
			}
		} catch (e) {
			// error reading value
		}
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<FormProvider {...methods}>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name={'index'} />
				<Stack.Screen
					options={{
						headerShown: true,
						header: () => {
							return (
								<Box bg={'red.500'}>
									<Input h={20} />
								</Box>
							)
						},
					}}
					name={'SearchCountryTextScreen'}
				/>
				<Stack.Screen name={'SearchCountryStatesTextScreen'} />
				<Stack.Screen name={'SearchStateCitiesTextScreen'} />
			</Stack>
		</FormProvider>
	)
}
