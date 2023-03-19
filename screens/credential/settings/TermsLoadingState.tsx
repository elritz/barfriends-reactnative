import { Skeleton, VStack } from 'native-base'

export default function TermsLoadingState() {
	return (
		<VStack my={5} space={8} rounded='md' px={2}>
			<Skeleton rounded='xl' h='10' w={'3/4'} />
			{[...Array(4)].map(item => {
				return <Skeleton.Text key={item} rounded='xl' />
			})}
		</VStack>
	)
}
