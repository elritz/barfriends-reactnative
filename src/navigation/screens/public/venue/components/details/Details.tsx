import { useCurrentVenueQuery, useProfileQuery } from '@graphql/generated'
import { Badge } from 'native-base'
import { Box, Button, Container, HStack, Text, VStack } from 'native-base'
import { useContext, useState } from 'react'
import styled, { ThemeContext } from 'styled-components/native'

type Props = {
	profileId: string
}

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

export default function Details(props: Props) {
	const [showMore, setShowMore] = useState(false)
	const themeContext = useContext(ThemeContext)

	const { data, loading, error } = useCurrentVenueQuery({
		skip: !props.profileId,
		variables: {
			where: {
				id: {
					equals: props.profileId,
				},
			},
		},
		onCompleted: data => {},
	})

	if (loading || !data) return null

	return (
		<VStack
			space={3}
			bg={themeContext.palette.background.paper}
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
					157 Queen St N
				</Text>
			</Box>
			<Box>
				<DetailTitle title={'Type'} />
				<HStack flexWrap={'wrap'} justifyContent={'flex-start'}>
					{['country', 'dance', 'live-music', 'sports'].map(item => {
						return (
							<Badge
								key={item}
								mx={1}
								my={2}
								px={2}
								colorScheme='success'
								_text={{
									fontSize: 'lg',
								}}
								rounded={'full'}
							>
								{item}
							</Badge>
						)
					})}
				</HStack>
			</Box>
			<Box>
				<DetailTitle title={'Capacity'} />
				<Text fontSize={'xl'} fontWeight={'medium'}>
					256
				</Text>
			</Box>
			<Box flex={1}>
				<DetailTitle title={'Description'} />
				{data.profile.DetailInformation?.description ? (
					<Box>
						{!showMore ? (
							<Text fontSize={'lg'} numberOfLines={4} isTruncated={true}>
								{data.profile.DetailInformation?.description}
							</Text>
						) : (
							<Text fontSize={'lg'}>{data.profile.DetailInformation?.description}</Text>
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
