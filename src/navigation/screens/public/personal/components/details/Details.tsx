import { Profile } from '@graphql/generated'
import { Heading, VStack, Text, Box, Button } from 'native-base'
import React, { useState } from 'react'

type Props = {
	item: Profile
}

export default function Details({ item }: Props) {
	const [showMore, setShowMore] = useState(false)

	return (
		<VStack flex={1} mx={2} space={1}>
			<Heading lineHeight={'xs'}>{item.IdentifiableInformation?.fullname}</Heading>
			<Text lineHeight={'xs'} fontWeight={'bold'} fontSize={'md'}>
				@{item.IdentifiableInformation?.username}
			</Text>
			<Box flex={1}>
				{item?.DetailInformation?.description?.length ? (
					<Box>
						{!showMore ? (
							<Text fontSize={'lg'} numberOfLines={2} isTruncated={true}>
								{item.DetailInformation?.description}
							</Text>
						) : (
							<Text fontSize={'lg'}>{item.DetailInformation?.description}</Text>
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
