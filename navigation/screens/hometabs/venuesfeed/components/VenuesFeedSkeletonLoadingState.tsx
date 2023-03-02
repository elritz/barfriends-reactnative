import SkeletonVenuesHomeScreen from './SkeletonVenuesHomeScreen'
import { useReactiveVar } from '@apollo/client'
import { useDimensions } from '@react-native-community/hooks'
import { SearchAreaReactiveVar } from '@reactive'
import { VStack, Center, Skeleton } from 'native-base'

export default function VenueFeedSkeletonLoadingState() {
	const {
		window: { width, height },
	} = useDimensions()
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
					h='150'
					w={loadingSkelHeight}
				/>
				<SkeletonVenuesHomeScreen />
			</VStack>
		</Center>
	)
}
