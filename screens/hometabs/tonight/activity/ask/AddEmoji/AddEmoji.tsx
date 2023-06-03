import { useReactiveVar } from '@apollo/client'
import { MaterialIcons } from '@expo/vector-icons'
import { AuthorizationReactiveVar } from '@reactive'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { Box, Heading, IconButton, Icon, Pressable } from 'native-base'

const AddEmoji = () => {
	const router = useRouter()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname: '(app)/modal/Emojimood',
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
					bg: 'light.100',
				}}
				_dark={{
					bg: rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.emojimood[0].colors[1]
						? rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.emojimood[0].colors[2]
						: 'dark.50',
				}}
				px={5}
			>
				{/* <ExpoLinearGradient
					colors={[
						String(rAuthorizationVar?.DeviceProfile?.Profile?.Story?.emojimood[0].colors[0]),
						String(rAuthorizationVar?.DeviceProfile?.Profile?.Story?.emojimood[0].colors[1]),
					]}
					start={{ x: 0.0, y: 1.0 }}
					end={{ x: 1.0, y: 1.0 }}
					style={{
						position: 'absolute',
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: 9,
					}}
				/> */}
				<ExpoLinearGradient
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
						borderRadius={'md'}
						bg={'#47d0a7'}
						icon={<Icon size={30} color={'darkBlue.800'} as={MaterialIcons} name='emoji-emotions' />}
						height={51}
						width={51}
					/>
				</ExpoLinearGradient>
				<Heading
					mt={3}
					w={'100%'}
					textAlign={'center'}
					fontSize={'lg'}
					style={{ textTransform: 'uppercase' }}
					fontWeight={'900'}
					textTransform={'uppercase'}
				>
					Add an
				</Heading>
				<Heading textAlign={'center'} fontSize={'lg'} style={{ textTransform: 'uppercase' }}>
					emojimood
				</Heading>
			</Box>
		</Pressable>
	)
}

export default AddEmoji
// style = {{ height: 200, width: width / 2, backgroundColor: 'blue', padding: 10 }}
