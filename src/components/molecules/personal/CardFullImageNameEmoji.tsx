import { LinearGradient } from 'expo-linear-gradient'
import { Box, Heading, Image, Text } from 'native-base'

interface CardFullImageNameEmojiProps {
	item: {
		profilePicture: string
		name: string
		status?: string
	}
	cardWidth: number
}

export const CardFullImageNameEmoji = ({ item, cardWidth }: CardFullImageNameEmojiProps) => (
	<Box
		style={{
			backgroundColor: 'transparent',
			borderColor: 'transparent',
			margin: 0,
			padding: 2,
			height: 170,
			width: cardWidth,
		}}
	>
		<Image
			alt={'Profile image'}
			source={{ uri: item.profilePicture }}
			resizeMode='cover'
			style={{ height: 170, flexDirection: 'column-reverse' }}
			borderRadius={'lg'}
		/>
		<Box>
			<LinearGradient colors={['transparent', '#00000080']}>
				<Box style={{ padding: 2 }}>
					<Heading
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
					</Heading>
					<Text style={{ fontWeight: '800' }}>{item.status}</Text>
				</Box>
			</LinearGradient>
		</Box>
	</Box>
)
