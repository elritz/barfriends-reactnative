import { Center, VStack, Skeleton, HStack } from 'native-base'
import React from 'react'
import { View, Text, Dimensions } from 'react-native'

export default function SkeletonVenuesHomeScreen() {
	const { width, height } = Dimensions.get('window')

	const loadingSkelWidth = width / 2.15
	const loadingSkelHeight = width - 20

	return (
		<Center>
			<VStack space={'2'}>
				{[...Array(6)].map((item, index) => {
					return (
						<HStack key={index} space={2} overflow='hidden'>
							{[...Array(2)].map((item, index) => {
								return (
									<Skeleton
										key={index}
										speed={0.25}
										rounded='xl'
										startColor='secondary.900'
										endColor={'secondary.800'}
										h='280'
										w={loadingSkelWidth}
									/>
								)
							})}
						</HStack>
					)
				})}
			</VStack>
		</Center>
	)
}
