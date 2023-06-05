import { useReactiveVar } from '@apollo/client'
import { MaterialIcons } from '@expo/vector-icons'
import { AuthorizationReactiveVar } from '@reactive'
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
					bg: 'dark.100',
				}}
				px={5}
			>
				<Box
					flex={1}
					h={200}
					justifyContent={'center'}
					alignItems={'center'}
					_light={{
						bg: 'light.100',
					}}
					_dark={{
						bg: rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.emojimood[0].colors[1]
							? rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.emojimood[0].colors[2]
							: 'dark.100',
					}}
					px={5}
				>
					<IconButton
						variant={'solid'}
						borderRadius={'md'}
						bg={'green.400'}
						icon={
							<Icon
								size={30}
								_light={{
									color: 'light.900',
								}}
								_dark={{
									color: 'dark.900',
								}}
								as={MaterialIcons}
								name='emoji-emotions'
							/>
						}
						height={57}
						width={57}
						alignSelf={'center'}
					/>

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
			</Box>
		</Pressable>
	)
}

export default AddEmoji
