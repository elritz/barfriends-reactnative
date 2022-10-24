import React from 'react'

import { LinearGradient } from 'expo-linear-gradient'
import { View } from 'react-native'
import { Card } from '@rneui/base'

import RNEText500 from '@components/atoms/typography/RNETypography/text/RNEText500'
import RNEText600 from '@components/atoms/typography/RNETypography/text/RNEText600'

interface CardFullImageNameEmojiProps {
	item: {
		profilePicture: string
		name: string
		status?: string
	}
	cardWidth: number
}

export const CardFullImageNameEmoji = ({
	item,
	cardWidth,
}: CardFullImageNameEmojiProps) => (
	<Card
		containerStyle={{
			backgroundColor: 'transparent',
			borderColor: 'transparent',
			margin: 0,
			padding: 2,
			height: 170,
			width: cardWidth,
		}}
	>
		<Card.Image
			source={{ uri: item.profilePicture }}
			resizeMode='cover'
			style={{ height: 170 }}
			containerStyle={{ borderRadius: 7 }}
			childrenContainerStyle={{
				flexDirection: 'column-reverse',
				height: '100%',
			}}
		>
			<View>
				<LinearGradient colors={['transparent', '#00000080']}>
					<View style={{ padding: 2 }}>
						<RNEText600
							style={{
								fontWeight: '800',
								color: 'white',
								shadowColor: 'black',
								shadowOffset: {
									width: 0,
									height: 3,
								},
								shadowOpacity: 0.27,
								shadowRadius: 4.65,
								elevation: 6,
							}}
						>
							{item.name}
						</RNEText600>
						<RNEText500 style={{ fontWeight: '800' }}>{item.status}</RNEText500>
					</View>
				</LinearGradient>
			</View>
		</Card.Image>
	</Card>
)
