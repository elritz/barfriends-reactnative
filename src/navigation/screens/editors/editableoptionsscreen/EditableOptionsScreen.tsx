import { useReactiveVar } from '@apollo/client'
import { useProfileQuery } from '@graphql/generated'
import { useNavigation } from '@react-navigation/core'
import { AuthorizationReactiveVar } from '@reactive'
import { Badge, Box, Heading, Text, VStack } from 'native-base'
import { useContext } from 'react'
import { ScrollView, Pressable } from 'react-native'
import { ThemeContext } from 'styled-components/native'

interface EditableOptionsScreenProps {}
const interests = ['🐶 Dog lover', '🍻 Drinking', '🎤 Singing', '🔥 Athletics', '🏓 Ping pong']

const EditableOptionsScreen = ({}: EditableOptionsScreenProps) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const rIdentifiableInformation = rAuthorizationVar?.DeviceProfile?.Profile.IdentifiableInformation
	const date = new Date(
		rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.birthday,
	).toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' })

	const { data, loading, error } = useProfileQuery({
		variables: {
			where: {
				id: {
					equals: rAuthorizationVar?.DeviceProfile?.Profile.id,
				},
			},
		},
	})

	if (loading) return null

	const RoundedListItem = ({ children, ...props }) => (
		<Pressable onPress={props.onPress}>
			<Box
				_light={{
					bg: 'light.100',
				}}
				_dark={{
					bg: 'dark.200',
				}}
				my={2}
				px={2}
				py={3}
				borderRadius={'lg'}
				alignItems={'flex-start'}
				flexDirection={'column'}
			>
				{props.title && (
					<Heading fontSize={'md'} pb={3}>
						{props.title}
					</Heading>
				)}
				{children}
			</Box>
		</Pressable>
	)

	return (
		<ScrollView
			style={{
				marginVertical: 20,
				marginHorizontal: 10,
			}}
			scrollToOverflowEnabled
			showsVerticalScrollIndicator={false}
			contentInsetAdjustmentBehavior='scrollableAxes'
		>
			<RoundedListItem
				onPress={() => {
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'NamesScreen',
					})
				}}
				title='Full name'
			>
				<Text fontSize={'xl'}>{rIdentifiableInformation?.fullname}</Text>
				{rIdentifiableInformation?.nickname && (
					<>
						<Text fontSize={'xl'} py={2}>
							Nick name
						</Text>
						<Text fontSize={'xl'}>{rIdentifiableInformation.nickname}</Text>
					</>
				)}
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'UsernameScreen',
					})
				}
				title='Username'
			>
				<Text fontSize={'xl'}>{rIdentifiableInformation?.username}</Text>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'EmojimoodScreen',
					})
				}
				title='Emojimood'
			>
				{rAuthorizationVar?.DeviceProfile?.Profile.tonightStory ? (
					<Heading fontSize={'sm'}>
						{rAuthorizationVar.DeviceProfile.Profile.tonightStory[0].emojimood.emoji}{' '}
						{rAuthorizationVar.DeviceProfile.Profile.tonightStory[0].emojimood.emojiname}
					</Heading>
				) : (
					<Text fontSize={'xl'}>Add your emojimood tonight</Text>
				)}
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'BirthdayScreen',
					})
				}
				title='Birthday 🥳'
			>
				<Text fontSize={'xl'}>{date}</Text>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'DescriptionScreen',
					})
				}
				title='About me'
			>
				<Text fontSize={'xl'} numberOfLines={4} ellipsizeMode='tail'>
					{!rAuthorizationVar?.DeviceProfile?.Profile?.DetailInformation?.description
						? 'Add description'
						: rAuthorizationVar.DeviceProfile.Profile.DetailInformation.description}
				</Text>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'InterestScreen',
					})
				}
				title={'My interests'}
			>
				<Box>
					<Pressable
						onPress={() =>
							navigation.navigate('ProfileEditorNavigator', {
								screen: 'InterestScreen',
							})
						}
					>
						<VStack flexDir={'row'} flexWrap={'wrap'}>
							{interests.map((interest, index) => (
								<Badge
									key={interest}
									borderRadius={'lg'}
									bg={'primary.500'}
									_text={{
										fontWeight: '400',
										fontSize: 'md',
										color: 'text.100',
									}}
									px={2}
									py={1}
									m={2}
								>
									{interest}
								</Badge>
							))}
						</VStack>
					</Pressable>
				</Box>
			</RoundedListItem>
			<Heading fontSize={'lg'} py={2}>
				MY BASIC INFO
			</Heading>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'GenderScreen',
					})
				}
				title={`I am a ...`}
			>
				<Text fontSize={'xl'}>
					{rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.gender ||
						'Set your gender'}
				</Text>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'LookingForScreen',
					})
				}
				title={`I'm looking for a ...`}
			>
				<Text fontSize={'xl'} numberOfLines={1}>
					{rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.lookfor ||
						'Set the vibes your looking for'}
				</Text>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'StatusScreen',
					})
				}
				title={`Relationship status`}
			>
				<Text fontSize={'xl'}>Are you in a relationship</Text>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'HometownScreen',
					})
				}
				title={`Add your hometown`}
			>
				<Text fontSize={'xl'}>add your hometown</Text>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'CurentPlaceScreen',
					})
				}
				title={'Add your city'}
			>
				<Text fontSize={'xl'}>Rep your city</Text>
			</RoundedListItem>
		</ScrollView>
	)
}

export default EditableOptionsScreen
