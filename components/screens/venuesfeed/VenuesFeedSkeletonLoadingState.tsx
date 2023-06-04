import SkeletonVenuesHomeScreen from './SkeletonVenuesHomeScreen'
import { useReactiveVar } from '@apollo/client'
import { SearchAreaReactiveVar } from '@reactive'
import { VStack, Center, Skeleton } from 'native-base'
import { useWindowDimensions } from 'react-native'

export default function VenueFeedSkeletonLoadingState() {
	const { width, height } = useWindowDimensions()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)

	const loadingSkelHeight = width - 20

	return (
		<Center>
			<VStack space={2}>
				{/* <Skeleton
					speed={0.25}
					rounded='xl'
					_dark={{
						startColor: 'secondary.900',
						endColor: 'secondary.800',
					}}
					_light={{
						startColor: 'light.100',
						endColor: 'light.200',
					}}
					h='280'
					w={loadingSkelHeight}
				/> */}
				<Skeleton
					rounded='xl'
					h='150'
					w={loadingSkelHeight}
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
				<SkeletonVenuesHomeScreen />
			</VStack>
		</Center>
	)
}
