import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Box, Heading, Icon, IconButton } from 'native-base'
import { Pressable, useWindowDimensions } from 'react-native'
import styled from 'styled-components/native'

const JoinVenue = ({}) => {
	const navigation = useNavigation()
	const { height, width } = useWindowDimensions()
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
				bg: 'light.800',
			}}
			px={10}
		>
			<Pressable
				onPress={() => {
					navigation.navigate('HomeTabNavigator', {
						screen: 'ExploreStack',
						params: {
							screen: 'ExploreScreen',
						},
					})
				}}
			>
				<IconButton
					variant={'solid'}
					borderRadius={'lg'}
					bg={'blue.500'}
					icon={<Icon ml={2} size={30} color={'darkBlue.800'} as={FontAwesome5} name='map-marker-alt' />}
					height={57}
					width={57}
					alignSelf={'center'}
					borderColor={'primary.500'}
					borderWidth={3}
				/>
				<Heading mt={3} fontSize={'lg'} style={{ textTransform: 'uppercase' }}>
					Join a venue near you
				</Heading>
			</Pressable>
		</Box>
	)
}

export default JoinVenue
