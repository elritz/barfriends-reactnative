import HorizontalCountryItem from './HorizontalCountryItem'
import LocationPermissionItem from './LocationPermissionItem'
import { useReactiveVar } from '@apollo/client'
import { LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import { Feather } from '@expo/vector-icons'
import GenerateCountryData from '@helpers/generate/placeholder/GenerateCountryData'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SearchAreaReactiveVar } from '@reactive'
import { Box, Heading, Text, HStack, Button, Center } from 'native-base'
import { Icon } from 'native-base'
import { FlatList } from 'react-native'

// TODO: FN(Flatlist with data of recent SearchArea with onPress to switch to it)
// TODO: FN(Use hometown location, Use current town location)

const data = GenerateCountryData()

const scrollViewMarginX = '3'

const SearchAreaFilltering = () => {
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)

	const searchAreaDistances = [
		{ kRing: 1, distance: 30 },
		{ kRing: 2, distance: 60 },
		{ kRing: 3, distance: 80 },
	]

	const handleSearchAreaKRing = async item => {
		SearchAreaReactiveVar({
			...rSearchAreaVar,
			kRing: item.kRing,
			distance: item.distance,
		})
		await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, JSON.stringify(rSearchAreaVar))
	}

	const ListheaderComponent = () => {
		return (
			<Box mb={4}>
				<Heading size={'lg'}>Recent Searches</Heading>
				<Box mt={4}>
					<LocationPermissionItem />
				</Box>
			</Box>
		)
	}
	console.log('🚀 ~ file: SearchAreaFilltering.tsx ~ line 87 ~ SearchAreaFilltering ~ data', data)

	return (
		<Box mx={scrollViewMarginX}>
			<Box my={3}>
				<Heading size={'lg'}>Distance</Heading>
				<Text fontSize={'lg'}>Up to&nbsp;{rSearchAreaVar.distance}&nbsp;km away</Text>
				<HStack my={2} space={3}>
					{searchAreaDistances.map((item, index) => {
						return (
							<Button
								key={index}
								variant={rSearchAreaVar.kRing === item.kRing ? 'solid' : 'outline'}
								colorScheme={rSearchAreaVar.kRing === item.kRing ? 'primary' : 'white'}
								_text={{
									_dark: {
										color: rSearchAreaVar.kRing === item.kRing ? 'white' : 'red.200',
									},
									_light: {
										color: rSearchAreaVar.kRing === item.kRing ? 'white' : 'coolGray.900',
									},
									fontWeight: rSearchAreaVar.kRing === item.kRing ? 'medium' : 'medium',
								}}
								style={{
									borderColor: rSearchAreaVar.kRing === item.kRing ? '#ff700000' : '#ff7000',
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
				<ListheaderComponent />
			</Box>
			<Button
				_stack={{
					paddingY: 0,
					paddingX: 2,
					marginY: 1,
					marginX: 2,
					w: '100%',
					justifyContent: 'space-between',
				}}
				my={1}
				_light={{
					bg: 'light.200',
				}}
				_dark={{
					bg: 'dark.100',
				}}
				rounded={'full'}
				endIcon={<Icon color={'primary.500'} size={'lg'} as={Feather} name={'check'} />}
			>
				<Text
					mt={-0.5}
					textAlign={'center'}
					fontWeight={'medium'}
					fontSize={'lg'}
					numberOfLines={1}
					ellipsizeMode={'tail'}
				>
					{rSearchAreaVar.country}, {rSearchAreaVar.state}, {rSearchAreaVar.city}
				</Text>
			</Button>
			{/* <Center>
				<Text fontSize={'lg'}>No Recent Searched areas</Text>
			</Center> */}
			{/* <FlatList
				showsVerticalScrollIndicator={false}
				// ListHeaderComponent={ListheaderComponent}
				// ListFooterComponent={}
				data={data}
				renderItem={props => <HorizontalCountryItem {...props} />}
			/> */}
		</Box>
	)
}

export default SearchAreaFilltering
