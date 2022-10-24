import { Personal } from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { Center, Text, Image, Pressable } from 'native-base'
import React from 'react'
import { View, useWindowDimensions } from 'react-native'

// TODO: UX() Item need to be updated for messageboard route
// TODO: UX() Item need to be updated for Personal data, loading, error

type PersonalAtVenueProps = {
	item: any // Personal
}

const PersonalAtVenue = ({ item }: PersonalAtVenueProps) => {
	const { width } = useWindowDimensions()
	const navigation = useNavigation()
	// const numColumns = 2.5 // if numColumns from flatlist is 3
	const numColumns = 2
	const height = width * (1.25 / numColumns)

	return (
		// <Center>
		<Pressable
			maxW={'1/2'}
			flexGrow={1}
			mx={1}
			alignSelf={''}
			onPress={() => {
				console.log('item ==========>', item)
				navigation.navigate('PublicNavigator', {
					screen: 'PersonalStack',
					params: {
						screen: 'PublicPersonalScreen',
					},
				})
			}}
		>
			<Image
				borderRadius={'xl'}
				alt={'User image'}
				style={{
					width: '100%',
					height,
					borderWidth: 3,
					borderColor: 'white',
				}}
				source={{ uri: item.avatar }}
			/>
			<View
				style={{
					width: '100%',
					justifyContent: 'flex-start',
				}}
			>
				<Text fontSize={'xs'}>{item.name}</Text>
			</View>
		</Pressable>
		// </Center>
	)
}

export default PersonalAtVenue
