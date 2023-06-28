import { useReactiveVar } from '@apollo/client'
import { Heading, VStack, Pressable, HStack } from '@components/core'
import { FontAwesome5 } from '@expo/vector-icons'
import { SearchAreaReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { Icon, Text } from 'native-base'

export default function SearchAreaHeader({ typename }) {
	const router = useRouter()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)

	const _press = () => {
		router.push({
			pathname: '(app)/searcharea',
		})
	}

	return (
		<Pressable onPress={() => _press()}>
			<HStack
				py={'$4'}
				my={'$4'}
				px={'$2'}
				rounded={'$lg'}
				sx={{
					':pressed': {
						_dark: {
							bg: '#00000040',
						},
						_light: {
							bg: '#A1A1A140',
						},
					},
				}}
				flex={1}
				alignItems={'flex-end'}
				justifyContent={'center'}
			>
				<VStack flex={1} space={'md'}>
					<HStack alignItems={'center'} justifyContent={'space-between'} space={'md'}>
						<HStack alignItems={'center'} space={'md'}>
							<Heading fontWeight={'$black'} fontSize={'$3xl'}>
								{rSearchAreaVar.searchArea.city.name}
							</Heading>
							{rSearchAreaVar?.useCurrentLocation && (
								<Icon
									size={'sm'}
									as={FontAwesome5}
									rounded={'full'}
									name={'location-arrow'}
									_light={{
										color: 'blue.500',
									}}
									_dark={{
										color: 'blue.500',
									}}
								/>
							)}
						</HStack>
						<Icon as={FontAwesome5} size={'lg'} name='chevron-up' mb={1} />
					</HStack>
					{typename === 'ComingAreaResponse' && (
						<Text fontSize={'lg'} textAlign={'center'}>
							No venues, hamma the notification bell and we will let you know when it gets added. Upvoting
							is huge, it lets us know where to go!
						</Text>
					)}
				</VStack>
			</HStack>
		</Pressable>
	)
}
