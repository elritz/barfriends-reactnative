import { useReactiveVar } from '@apollo/client'
import { Box, Button, HStack, Heading, Text, VStack } from '@components/core'
import LocationPermissionItemEmptyState from '@components/organisms/list/searchareafiltering/LocationPermissionItemEmptyState'
import SearchAreaLocationPermissionItem from '@components/organisms/list/searchareafiltering/SearchAreaLocationPermissionItem'
import { LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SearchAreaReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { ScrollView } from 'react-native'

export default () => {
	const router = useRouter()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)

	const searchAreaLocation = [
		{ name: 'Country', value: rSearchAreaVar?.searchArea.country.name },
		{ name: 'State', value: rSearchAreaVar?.searchArea.state.name },
		{ name: 'City', value: rSearchAreaVar?.searchArea.city.name },
	]

	const searchAreaDistances = [
		{ kRing: 1, distance: 30 },
		{ kRing: 2, distance: 60 },
		{ kRing: 3, distance: 80 },
	]

	const handleSearchAreaKRing = async item => {
		SearchAreaReactiveVar({
			...rSearchAreaVar,
			kRing: {
				distance: item.distance,
				value: item.kRing,
			},
		})
		await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, JSON.stringify(rSearchAreaVar))
	}

	const switchRouter = value => {
		switch (value) {
			case 'City':
				if (rSearchAreaVar?.searchArea.country.isoCode && rSearchAreaVar?.searchArea.state.isoCode) {
					router.push({
						pathname: '(app)/searcharea/searchstatecities',
						params: {
							countryIsoCode: rSearchAreaVar.searchArea.country.isoCode,
							stateIsoCode: rSearchAreaVar.searchArea.state.isoCode,
						},
					})
				}
				break
			case 'State':
				if (rSearchAreaVar?.searchArea.country.isoCode && rSearchAreaVar?.searchArea.state.isoCode) {
					router.push({
						pathname: '(app)/searcharea/searchcountrystate',
						params: {
							countryIsoCode: rSearchAreaVar.searchArea.country.isoCode,
						},
					})
				}
				break
			case 'Country':
				if (rSearchAreaVar?.searchArea.country.isoCode && rSearchAreaVar?.searchArea.state.isoCode) {
					router.push({
						pathname: '(app)/searcharea/searchcountry',
					})
				}
				break
			default:
				router.push({
					pathname: '(app)/searcharea/searchcountry',
				})
		}
	}

	return (
		<ScrollView
			style={{
				marginHorizontal: 4,
				flex: 1,
			}}
		>
			<VStack space={'md'} my={'$4'}>
				<Box>
					<Heading fontSize={'$lg'}>Distance</Heading>
					<Text fontSize={'$lg'}>Around&nbsp;{rSearchAreaVar.kRing.distance}&nbsp;km away</Text>
					<HStack space={'md'} justifyContent={'space-around'}>
						{searchAreaDistances.map((item, index) => {
							return (
								<Button
									key={index}
									variant={rSearchAreaVar?.kRing.value === item.kRing ? 'solid' : 'outline'}
									bg={rSearchAreaVar?.kRing.value === item.kRing ? '$primary500' : '$white'}
									style={{
										borderColor: rSearchAreaVar?.kRing.value === item.kRing ? '#ff700000' : '#ff7000',
										borderWidth: 1,
									}}
									onPress={() => handleSearchAreaKRing(item)}
									flex={1}
									height={50}
								>
									<Text
										sx={{
											_dark: {
												color: rSearchAreaVar?.kRing.value === item.kRing ? 'white' : 'red.200',
											},
											_light: {
												color: rSearchAreaVar?.kRing.value === item.kRing ? 'white' : 'coolGray.900',
											},
											fontWeight: rSearchAreaVar?.kRing.value === item.kRing ? 'medium' : 'medium',
										}}
									>
										{item.distance}
									</Text>
								</Button>
							)
						})}
					</HStack>
				</Box>
				<VStack space={'md'}>
					<HStack space={'md'}>
						{!rSearchAreaVar?.searchArea.country.name ||
						!rSearchAreaVar?.searchArea.state.name ||
						!rSearchAreaVar?.searchArea.city.name ? (
							<Box p={'$5'}>
								<Box
									alignItems={'center'}
									style={{
										width: '100%',
									}}
									my={'$2'}
								>
									<Heading>Find Venues Near</Heading>
									<Text fontSize={'$lg'}>Find your area and we will show you what we have for venues.</Text>
								</Box>
								<Button
									onPress={() => {
										router.push({
											pathname: '(app)/searcharea/searchcountry',
										})
									}}
								>
									<Text fontSize={'$lg'}>Search area</Text>
								</Button>
								<LocationPermissionItemEmptyState />
							</Box>
						) : (
							<VStack flex={1} space={'md'}>
								<Heading size={'lg'}>Search area</Heading>
								<Box sx={{ h: 55 }}>
									<Text fontSize={'$lg'} numberOfLines={2}>
										{rSearchAreaVar?.useCurrentLocation
											? 'You are currently using your devices location to show you venues nearby.'
											: 'Use your location to automatically set your area.'}
									</Text>
								</Box>

								<HStack space={'md'}>
									{searchAreaLocation.map((item, index) => {
										return (
											<Button
												key={index}
												bg={!rSearchAreaVar?.useCurrentLocation ? 'primary.500' : 'blue.400'}
												variant={'solid'}
												// isDisabled
												sx={{
													':disabled': {
														opacity: 1,
													},
												}}
												onPress={() => switchRouter(item.name)}
												flex={1}
												height={50}
											>
												<Text
													ellipsizeMode={'tail'}
													numberOfLines={1}
													sx={{
														_dark: {
															color: 'white',
														},
														_light: {
															color: 'white',
														},
														fontWeight: 'medium',
													}}
												>
													{item.value}
												</Text>
											</Button>
										)
									})}
								</HStack>
								<Box>
									<SearchAreaLocationPermissionItem />
								</Box>
							</VStack>
						)}
					</HStack>
				</VStack>
			</VStack>
		</ScrollView>
	)
}
