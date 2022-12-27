import { Personal, Profile } from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { Center, Text, Image, Pressable } from 'native-base'
import React from 'react'
import { View, useWindowDimensions } from 'react-native'

// TODO: UX() Item need to be updated for messageboard route
// TODO: UX() Item need to be updated for Personal data, loading, error

type PersonalAtVenueProps = {
	item: Profile // Personal
}

const PersonalAtVenue = ({ item }: PersonalAtVenueProps) => {
	const { width } = useWindowDimensions()
	const navigation = useNavigation()
	const numColumns = 2 // 2.5 if numColumns from flatlist is 3
	const height = width * (1.25 / numColumns)

	return (
		<Pressable
			maxW={'1/2'}
			flexGrow={1}
			mx={1}
			alignSelf={''}
			onPress={() => {
				console.log('navigate to personal page')
				// navigation.navigate('PublicNavigator', {
				// 	screen: 'PersonalStack',
				// 	params: {
				// 		screen: 'PublicPersonalScreen',
				// 	},
				// })
			}}
		>
			<Image
				source={{ uri: item.avatar }}
				alt={'User image'}
				borderRadius={'xl'}
				style={{
					width: '100%',
					height,
					borderWidth: 3,
					borderColor: 'white',
				}}
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
	)
}

export default PersonalAtVenue
