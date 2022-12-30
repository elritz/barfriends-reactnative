import { Profile } from '@graphql/generated'
import { capitalizeFirstLetter } from '@util/@fn/capitalizeFirstLetter'
import { Heading, VStack, Text, Box, Button } from 'native-base'
import React, { useState } from 'react'

type Props = {
	profile: Profile
}

export default function Details({ profile: item }: Props) {
	const [showMore, setShowMore] = useState(false)

	return (
		<VStack flex={1} space={1} mt={3}>
			<Heading fontSize={'lg'} lineHeight={'xs'}>
				{capitalizeFirstLetter(item?.IdentifiableInformation?.fullname)}
			</Heading>
			<Text lineHeight={'xs'} fontWeight={'bold'} fontSize={'sm'}>
				@{item?.IdentifiableInformation?.username}
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
						<Button my={2} onPress={() => setShowMore(!showMore)} variant={'ghost'}>
							{showMore ? 'Show Less' : 'Show More'}
						</Button>
					</Box>
				) : (
					<Box my={2}>
						<Text h={'auto'} fontSize={'lg'} isTruncated={!showMore}>
							No description available
						</Text>
					</Box>
				)}
			</Box>
		</VStack>
	)
}
