import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Box, Heading, IconButton, Icon, Pressable } from 'native-base'

interface AddEmojiProps {}

const AddEmoji = ({}) => {
	const navigation = useNavigation()
	return (
		<Pressable
			onPress={() =>
				navigation.navigate('HomeTabNavigator', {
					screen: 'TonightStack',
					params: {
						screen: 'SelectEmojimoodScreen',
					},
				})
			}
		>
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
				<LinearGradient
					colors={[
						'#ff5100',
						'#ff9900',
						'#c3ff00',
						'#83ff17',
						'#1eff00',
						'#83ff17',
						'#32ff7d',
						'#4cfff0',
						'#36bfff',
						'#369eff',
						'#3665ff',
						'#3665ff',
						'#e836ff',
						'#d736ff',
						'#ff36f2',
						'#ff36bf',
						'#ff36c3',
						'#ff3665',
						'#ff363d',
						'#ff3636',
					]}
					start={{ x: 0.0, y: 1.0 }}
					end={{ x: 1.0, y: 1.0 }}
					style={{
						width: 56,
						height: 56,
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: 9,
					}}
				>
					<IconButton
						disabled={true}
						variant={'solid'}
						borderRadius={'lg'}
						bg={'#47d0a7'}
						icon={<Icon size={30} color={'darkBlue.800'} as={MaterialIcons} name='emoji-emotions' />}
						height={51}
						width={51}
					/>
				</LinearGradient>
				<Heading
					mt={3}
					w={'100%'}
					textAlign={'center'}
					fontSize={'lg'}
					fontWeight={'bold'}
					style={{ textTransform: 'uppercase' }}
				>
					Add an
				</Heading>
				<Heading
					w={'100%'}
					textAlign={'center'}
					fontSize={'lg'}
					fontWeight={'bold'}
					style={{ textTransform: 'uppercase' }}
				>
					emojimood
				</Heading>
			</Box>
		</Pressable>
	)
}

export default AddEmoji
// style = {{ height: 200, width: width / 2, backgroundColor: 'blue', padding: 10 }}
