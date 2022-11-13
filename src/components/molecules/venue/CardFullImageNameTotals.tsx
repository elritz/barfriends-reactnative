import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { AspectRatio, Box, Center, Heading, Image } from 'native-base'

export default function CardFullImageNameTotals({ item, index, height, width }) {
	const colorScheme = useThemeColorScheme()
	return (
		<Box key={index} alignItems='center'>
			<Box
				maxW='80'
				rounded='lg'
				overflow='hidden'
				borderColor='coolGray.200'
				borderWidth='1'
				_dark={{
					borderColor: 'coolGray.600',
					backgroundColor: 'gray.700',
				}}
				_web={{
					shadow: 2,
					borderWidth: 0,
				}}
				_light={{
					backgroundColor: 'gray.50',
				}}
			>
				<Box>
					<AspectRatio w='100%' ratio={16 / 9}>
						<Image
							source={{
								uri: 'https://picsum.photos/700',
							}}
							alt='image'
							borderRadius={'lg'}
						/>
					</AspectRatio>
				</Box>
				<BlurView
					style={{ position: 'absolute', bottom: 0, width: '100%' }}
					tint={colorScheme}
					intensity={100}
				>
					<Heading numberOfLines={2} w={'85%'} my={2} mx={3}>
						{item.title}
					</Heading>
				</BlurView>
			</Box>
		</Box>
	)
}
