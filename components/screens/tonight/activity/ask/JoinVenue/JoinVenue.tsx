import { FontAwesome5 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Box, Heading, Icon, IconButton } from 'native-base'
import { Pressable } from 'react-native'

const JoinVenue = ({}) => {
	const router = useRouter()

	return (
		<Box
			flex={1}
			h={200}
			justifyContent={'center'}
			alignItems={'center'}
			rounded='lg'
			overflow='hidden'
			_light={{
				bg: 'light.100',
			}}
			_dark={{
				bg: 'dark.100',
			}}
			px={5}
		>
			<Pressable
				onPress={() => {
					router.push({
						pathname: '(app)/hometab/explorestack',
					})
				}}
			>
				<IconButton
					variant={'solid'}
					borderRadius={'md'}
					bg={'blue.400'}
					icon={
						<Icon
							ml={2}
							size={30}
							as={FontAwesome5}
							name='map-marker-alt'
							_light={{
								color: 'light.900',
							}}
							_dark={{
								color: 'dark.900',
							}}
						/>
					}
					height={57}
					width={57}
					alignSelf={'center'}
				/>
			</Pressable>
			<Heading
				textAlign={'center'}
				mt={3}
				fontSize={'lg'}
				style={{ textTransform: 'uppercase' }}
				w={'100%'}
				fontWeight={'900'}
				textTransform={'uppercase'}
			>
				Find venues
			</Heading>
			<Heading textAlign={'center'} fontSize={'lg'} style={{ textTransform: 'uppercase' }}>
				near you
			</Heading>
		</Box>
	)
}

export default JoinVenue
