import { Heading, VStack, Text, Box, Button } from 'native-base'
import React, { useState } from 'react'

export default function Details() {
	const [showMore, setShowMore] = useState(false)
	const [description, setDescription] = useState(
		'Well hellpo i need some rand testkwebfmqwe f,nqweb rn,qwbe rn,qwbe r,nbq ',
	)

	return (
		<VStack flex={1} mx={2} space={1}>
			<Heading>First Last name</Heading>
			<Text fontSize={'md'}>@username</Text>
			<Box flex={1}>
				{description.length ? (
					<Box>
						{!showMore ? (
							<Text fontSize={'lg'} numberOfLines={2} isTruncated={true}>
								{description}
							</Text>
						) : (
							<Text fontSize={'lg'}>{description}</Text>
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
