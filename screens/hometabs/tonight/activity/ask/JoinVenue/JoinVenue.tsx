import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import { Box, Heading, Icon, IconButton } from 'native-base'
import { Pressable, useWindowDimensions } from 'react-native'
import styled from 'styled-components/native'

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
				bg: 'light.50',
			}}
			_dark={{
				bg: 'dark.50',
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
					bg={'blue.500'}
					icon={<Icon ml={2} size={30} color={'darkBlue.800'} as={FontAwesome5} name='map-marker-alt' />}
					height={57}
					width={57}
					alignSelf={'center'}
					borderColor={'primary.500'}
					borderWidth={3}
				/>
				<Heading textAlign={'center'} mt={3} fontSize={'lg'} style={{ textTransform: 'uppercase' }}>
					Join a venue near you
				</Heading>
			</Pressable>
		</Box>
	)
}

export default JoinVenue
