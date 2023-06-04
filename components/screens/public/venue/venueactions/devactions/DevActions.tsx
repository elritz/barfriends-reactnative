import JoinCard from './joincard/JoinCard'
import LeaveCard from './leavecard/LeaveCard'
import TotalCard from './totalcard/TotalCard'
import { Text, Heading, HStack, VStack, Box, Pressable } from 'native-base'
import { useState } from 'react'

export default function DevActions() {
	const [showDevMode, setShowDevMode] = useState(false)

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
					<HStack space={2}  pt={2} pb={2} mx={3} justifyContent={'space-around'}>
						<TotalCard />
						<JoinCard />
						<LeaveCard />
					</HStack>
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
