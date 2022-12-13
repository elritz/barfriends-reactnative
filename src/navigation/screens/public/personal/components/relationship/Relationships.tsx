import { Relationship } from '@graphql/generated'
import { Box, Heading } from 'native-base'

type Props = {
	data: Relationship
}

export default function Relationships({ data }: Props) {
	console.log('🚀 ----------------------------------------------------------🚀')
	console.log('🚀 ~ file: Relationships.tsx:9 ~ Relationships ~ data', data)
	console.log('🚀 ----------------------------------------------------------🚀')

	return (
		<Box
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
			<Heading>Relationship</Heading>
		</Box>
	)
}
