import { useRemoveAllFromVenueDeveloperMutation } from '@graphql/generated'
import { Text, Heading, HStack, VStack, Box, Pressable, Button } from 'native-base'
import { useState } from 'react'

export default function DevActions() {
	const [showDevMode, setShowDevMode] = useState(false)

	const [removeAllFromVeneues, { data, loading, error }] = useRemoveAllFromVenueDeveloperMutation()

	return (
		<VStack space={4} justifyContent={'space-between'}>
			{showDevMode ? (
				<Box>
					<Pressable
						onPress={() => {
							setShowDevMode(!showDevMode)
						}}
					>
						<Box>
							<Heading fontSize={'lg'} fontWeight={'800'} textAlign={'center'} textTransform={'uppercase'}>
								You are in {'\n'}
								<Heading color={'green.400'} fontWeight={'900'}>
									Dev Mode!
								</Heading>
							</Heading>
							<Text fontSize={'md'} mx={2} textAlign={'center'}>
								This section is for quick actions that we may need for testing! As developers!
							</Text>
						</Box>
					</Pressable>
					<VStack>
						<HStack space={2} pt={2} pb={2} mx={3} justifyContent={'space-around'}>
							<Button
								isLoading={loading}
								isLoadingText='Removing patrons'
								onPress={() => removeAllFromVeneues()}
							>
								Remove everyone
							</Button>
						</HStack>
					</VStack>
				</Box>
			) : (
				<Pressable
					onPress={() => {
						setShowDevMode(!showDevMode)
					}}
				>
					<Text fontSize={'md'} mx={2} textAlign={'center'}>
						Show dev mode
					</Text>
				</Pressable>
			)}
		</VStack>
	)
}
