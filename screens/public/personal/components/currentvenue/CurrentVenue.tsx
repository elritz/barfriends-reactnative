import { Box, Button, Heading, VStack } from 'native-base'

export default function CurrentVenue() {
	return (
		<VStack
			space={1}
			_light={{
				bg: 'light.50',
			}}
			_dark={{
				bg: 'light.800',
			}}
			borderRadius={'xl'}
			flex={1}
			p={3}
		>
			<VStack space={2} mb={2}>
				<Box h={16} w={16} bg={'red.200'} borderRadius={'md'} />
				<Heading
					numberOfLines={2}
					fontSize={'lg'}
					fontWeight={'black'}
					allowFontScaling
					ellipsizeMode={'clip'}
				>
					Current Venue relazziuf long namewlke;jbqwe qwem
				</Heading>
			</VStack>
			<Button variant={'ghost'} size={'lg'}>
				View
			</Button>
		</VStack>
	)
}
