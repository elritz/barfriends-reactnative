import { VStack } from '@components/core'
import { Skeleton } from 'native-base'

export default function TermsLoadingState() {
	return (
		<VStack my={'$5'} space={'lg'} rounded={'$md'} px={'$2'}>
			<Skeleton
				rounded='xl'
				h='10'
				w={'3/4'}
				speed={0.95}
				_light={{
					startColor: 'coolGray.100',
					endColor: 'coolGray.300',
				}}
				_dark={{
					startColor: 'dark.200',
					endColor: 'dark.300',
				}}
			/>
			{[...Array(4)].map(item => {
				return <Skeleton.Text key={item} rounded='xl' />
			})}
		</VStack>
	)
}
