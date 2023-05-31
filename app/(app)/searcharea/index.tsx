import { useReactiveVar } from '@apollo/client'
import LocationPermissionItemEmptyState from '@components/organisms/list/searchareafiltering/LocationPermissionItemEmptyState'
import SearchAreaLocationPermissionItem from '@components/organisms/list/searchareafiltering/SearchAreaLocationPermissionItem'
import { LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SearchAreaReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { Box, Heading, Text, HStack, Button, ScrollView, VStack } from 'native-base'

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
		<ScrollView mx={2} flex={1}>
			<VStack space={4} my={4}>
				<Box>
					<Heading size={'lg'}>Distance</Heading>
					<Text fontSize={'lg'}>Around&nbsp;{rSearchAreaVar.kRing.distance}&nbsp;km away</Text>
					<HStack space={3} justifyContent={'space-around'}>
						{searchAreaDistances.map((item, index) => {
							return (
								<Button
									key={index}
									variant={rSearchAreaVar?.kRing.value === item.kRing ? 'solid' : 'outline'}
									colorScheme={rSearchAreaVar?.kRing.value === item.kRing ? 'primary' : 'white'}
									_text={{
										_dark: {
											color: rSearchAreaVar?.kRing.value === item.kRing ? 'white' : 'red.200',
										},
										_light: {
											color: rSearchAreaVar?.kRing.value === item.kRing ? 'white' : 'coolGray.900',
										},
										fontWeight: rSearchAreaVar?.kRing.value === item.kRing ? 'medium' : 'medium',
									}}
									style={{
										borderColor: rSearchAreaVar?.kRing.value === item.kRing ? '#ff700000' : '#ff7000',
										borderWidth: 1,
									}}
									onPress={() => handleSearchAreaKRing(item)}
									flex={1}
									height={50}
								>
									{item.distance}
								</Button>
							)
						})}
					</HStack>
				</Box>
				<VStack space={2}>
					<HStack space={3}>
						{!rSearchAreaVar?.searchArea.country.name ||
						!rSearchAreaVar?.searchArea.state.name ||
						!rSearchAreaVar?.searchArea.city.name ? (
							<Box
								p={5}
								borderRadius={'md'}
								_dark={{
									bg: 'dark.50',
								}}
							>
								<Box alignItems={'center'} w={'100%'} my={2}>
									<Heading>Find Venues Near</Heading>
									<Text fontSize={'lg'}>Find your area and we will show you what we have for venues.</Text>
								</Box>
								<Button
									onPress={() => {
										router.push({
											pathname: '(app)/searcharea/searchcountry',
										})
									}}
									_text={{
										fontSize: 'lg',
									}}
								>
									Search area
								</Button>
								<LocationPermissionItemEmptyState />
							</Box>
						) : (
							<VStack flex={1} space={2}>
								<Heading size={'lg'}>Search area</Heading>
				
								<HStack space={3}>
									{searchAreaLocation.map((item, index) => {
										return (
											<Button
												key={index}
												bg={!rSearchAreaVar?.useCurrentLocation ? 'primary.500' : 'blue.400'}
												variant={'solid'}
												_text={{
													ellipsizeMode: 'tail',
													numberOfLines: 1,
													_dark: {
														color: 'white',
													},
													_light: {
														color: 'white',
													},
													fontWeight: 'medium',
												}}
												// isDisabled
												_disabled={{
													opacity: 1,
												}}
												onPress={() => switchRouter(item.name)}
												flex={1}
												height={50}
											>
												{item.value}
											</Button>
										)
									})}
								</HStack>
								<Box mt={1}>
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
