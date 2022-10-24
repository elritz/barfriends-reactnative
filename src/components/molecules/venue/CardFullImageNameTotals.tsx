import RNEHeading600 from '@components/atoms/typography/RNETypography/heading/RNEHeading600'
import { Card } from '@rneui/base'
import { BlurView } from 'expo-blur'
import { useColorScheme } from 'react-native'

export default function CardFullImageNameTotals({ item, index, height, width }) {
	const colorScheme = useColorScheme()
	return (
		<Card
			key={index}
			style={{
				elevation: 4,
				height,
				width,
				borderRadius: 10,
				overflow: 'hidden',
			}}
		>
			<Card.Cover
				style={{ height: '100%', width: '100%' }}
				resizeMode='cover'
				source={{ uri: 'https://picsum.photos/700' }}
			/>
			<BlurView
				style={{ position: 'absolute', bottom: 0, width: '100%' }}
				tint={colorScheme === 'dark' ? 'dark' : 'light'}
				intensity={100}
			>
				<RNEHeading600
					numberOfLines={2}
					style={{
						width: '80%',
						marginVertical: 5,
						marginHorizontal: 10,
					}}
				>
					{item.title}
				</RNEHeading600>
			</BlurView>
		</Card>
	)
}
