import { VenueScreenRouteProp } from '../../Venue'
import { useReactiveVar } from '@apollo/client'
import { useCurrentVenueQuery } from '@graphql/generated'
import { useRoute } from '@react-navigation/native'
import { SearchAreaReactiveVar } from '@reactive'
import { Badge, useColorMode, useTheme } from 'native-base'
import { Box, Button, HStack, Text, VStack } from 'native-base'
import { useContext, useState } from 'react'
import { ThemeContext } from 'styled-components/native'

type DetailTitleProps = {
	title: string
}

const DetailTitle = (props: DetailTitleProps) => {
	return (
		<Text fontSize={'md'} fontWeight={'extrabold'} py={2}>
			{props.title}
		</Text>
	)
}

export default function Details(props) {
	const colorMode = useColorMode()
	const themeContext = useContext(ThemeContext)
	const theme = useTheme()
	const [showMore, setShowMore] = useState(false)

	const route = useRoute<VenueScreenRouteProp>()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)

	const { data, loading, error } = useCurrentVenueQuery({
		skip: !route.params.profileId,
		fetchPolicy: 'cache-first',
		variables: {
			where: {
				id: {
					equals: route.params.profileId,
				},
			},
			currentLocationCoords: {
				latitude: rSearchAreaVar.useCurrentLocation ? rSearchAreaVar.searchArea.coords.latitude : 0,
				longitude: rSearchAreaVar.useCurrentLocation ? rSearchAreaVar.searchArea.coords.longitude : 0,
			},
		},
		onError(error) {
			console.log('error :>> ', error)
		},
	})

	if (loading || !data) return null

	return (
		<VStack
			space={3}
			_light={{
				bg: 'light.50',
			}}
			_dark={{
				bg: 'dark.50',
			}}
			flex={1}
			py={4}
			px={3}
			mt={5}
			mx={2}
			borderRadius={'xl'}
		>
			<Box>
				<DetailTitle title={'Address'} />
				<Text fontSize={'xl'} fontWeight={'medium'}>
					{data?.currentVenue?.Venue?.Location?.Address?.formattedAddress}
				</Text>
			</Box>
			<Box>
				<DetailTitle title={'Type'} />
				<HStack flexWrap={'wrap'} justifyContent={'flex-start'}>
					{data.currentVenue?.DetailInformation?.Tags.map((item, index) => {
						return (
							<Badge
								key={index}
								mx={1}
								my={2}
								px={3}
								py={2}
								colorScheme={colorMode.colorMode === 'light' ? 'dark' : 'light'}
								_text={{
									fontSize: 'lg',
								}}
								rounded={'lg'}
							>
								{`${item.emoji} ${item.name}`}
							</Badge>
						)
					})}
				</HStack>
			</Box>
			<Box>
				<DetailTitle title={'Capacity'} />
				<Text fontSize={'xl'} fontWeight={'medium'}>
					{data?.currentVenue?.DetailInformation?.capacity}
				</Text>
			</Box>
			<Box flex={1}>
				<DetailTitle title={'Description'} />
				{data?.currentVenue?.DetailInformation?.description ? (
					<Box>
						{!showMore ? (
							<Text fontSize={'lg'} numberOfLines={4} isTruncated={true}>
								{data.currentVenue.DetailInformation?.description}
							</Text>
						) : (
							<Text fontSize={'lg'}>{data.currentVenue.DetailInformation?.description}</Text>
						)}
						<Button mt={2} onPress={() => setShowMore(!showMore)} variant={'ghost'}>
							{showMore ? 'Show Less' : 'Show More'}
						</Button>
					</Box>
				) : (
					<Box>
						<Text h={'auto'} fontSize={'lg'} isTruncated={!showMore}>
							No description available
						</Text>
					</Box>
				)}
			</Box>
		</VStack>
	)
}
