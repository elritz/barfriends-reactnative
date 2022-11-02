import { useReactiveVar } from '@apollo/client'
import { useProfileQuery } from '@graphql/generated'
import { useNavigation } from '@react-navigation/core'
import { AuthorizationReactiveVar } from '@reactive'
import { Badge, Box, Heading, VStack } from 'native-base'
import { useContext } from 'react'
import { ScrollView, Pressable } from 'react-native'
import { ThemeContext } from 'styled-components/native'

interface EditableOptionsScreenProps {}
const interests = ['🐶 Dog lover', '🍻 Drinking', '🎤 Singing', '🔥 Athletics', '🏓 Ping pong']

const EditableOptionsScreen = ({}: EditableOptionsScreenProps) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const rIdentifiableInformation = rAuthorizationVar.DeviceProfile.Profile.IdentifiableInformation
	const date = new Date(
		rAuthorizationVar.DeviceProfile.Profile.IdentifiableInformation.birthday,
	).toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' })

	const { data, loading, error } = useProfileQuery({
		variables: {
			where: {
				id: rAuthorizationVar.DeviceProfile.Profile.id,
			},
		},
	})

	if (loading) return null

	const RoundedListItem = ({ children, ...props }) => (
		<Box
			{...props}
			style={{
				borderRadius: 15,
				marginVertical: 10,
				backgroundColor: themeContext.palette.secondary.background,
				width: '100%',
				flexDirection: 'column',
				alignItems: 'flex-start',
			}}
		>
			<Heading size={'md'} pb={3}>
				{props.title}
			</Heading>
			{children}
		</Box>
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
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'NamesScreen',
					})
				}
				title='Full name'
			>
				<Heading>{rIdentifiableInformation.fullname}</Heading>
				{rIdentifiableInformation.nickname && (
					<>
						<Heading py={2}>Nick name</Heading>
						<Heading>{rIdentifiableInformation.nickname}</Heading>
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
				<Heading>{rIdentifiableInformation.username}</Heading>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'EmojimoodScreen',
					})
				}
				title='Emojimood'
			>
				{rAuthorizationVar.DeviceProfile.Profile.Story.length ? (
					<Heading>
						{rAuthorizationVar.DeviceProfile.Profile.Story[0].emojimood.emoji}{' '}
						{rAuthorizationVar.DeviceProfile.Profile.Story[0].emojimood.emojiname}
					</Heading>
				) : (
					<Heading>Add your emojimood tonight</Heading>
				)}
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'BirthdayScreen',
					})
				}
				title='🥳 Birthday'
			>
				<Heading>{date}</Heading>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'DescriptionScreen',
					})
				}
				title='About me'
			>
				<Heading numberOfLines={4} ellipsizeMode='tail'>
					{!rAuthorizationVar.DeviceProfile.Profile.DetailInformation.description
						? 'Add description'
						: rAuthorizationVar.DeviceProfile.Profile.DetailInformation.description}
				</Heading>
			</RoundedListItem>
			<Heading fontSize={'lg'} py={2}>
				MY INTERESTS
			</Heading>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'InterestScreen',
					})
				}
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
									_text={{
										backgroundColor: themeContext.palette.company.primary,
										color: themeContext.palette.company.secondary,
										fontWeight: '600',
									}}
									px={8}
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
				<Heading>
					{rAuthorizationVar.DeviceProfile.Profile.IdentifiableInformation.gender || 'Set your gender'}
				</Heading>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'LookingForScreen',
					})
				}
				title={`I'm looking for a ...`}
			>
				<Heading numberOfLines={1}>
					{rAuthorizationVar.DeviceProfile.Profile.IdentifiableInformation.lookfor ||
						'Set the vibes your looking for'}
				</Heading>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'StatusScreen',
					})
				}
				title={`Relationship status`}
			>
				<Heading>Are you in a relationship</Heading>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'HometownScreen',
					})
				}
				title={`Add your hometown`}
			>
				<Heading>add your hometown</Heading>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'CurentPlaceScreen',
					})
				}
				title={'Add your city'}
			>
				<Heading>Rep your city</Heading>
			</RoundedListItem>
		</ScrollView>
	)
}

export default EditableOptionsScreen
