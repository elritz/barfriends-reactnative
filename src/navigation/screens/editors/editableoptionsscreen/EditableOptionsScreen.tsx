import { useReactiveVar } from '@apollo/client'
import { useProfileQuery } from '@graphql/generated'
import { useNavigation } from '@react-navigation/core'
import { AuthorizationReactiveVar } from '@reactive'
import { Chip, ListItem } from '@rneui/themed'
import { Heading, VStack } from 'native-base'
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
		<ListItem
			{...props}
			containerStyle={{
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
		</ListItem>
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
				<ListItem.Title>{rIdentifiableInformation.fullname}</ListItem.Title>
				{rIdentifiableInformation.nickname && (
					<>
						<Heading py={2}>Nick name</Heading>
						<ListItem.Title>{rIdentifiableInformation.nickname}</ListItem.Title>
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
				<ListItem.Title>{rIdentifiableInformation.username}</ListItem.Title>
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
					<ListItem.Title>
						{rAuthorizationVar.DeviceProfile.Profile.Story[0].emojimood.emoji}{' '}
						{rAuthorizationVar.DeviceProfile.Profile.Story[0].emojimood.emojiname}
					</ListItem.Title>
				) : (
					<ListItem.Title>Add your emojimood tonight</ListItem.Title>
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
				<ListItem.Title>{date}</ListItem.Title>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'DescriptionScreen',
					})
				}
				title='About me'
			>
				<ListItem.Title numberOfLines={4} ellipsizeMode='tail'>
					{!rAuthorizationVar.DeviceProfile.Profile.DetailInformation.description
						? 'Add description'
						: rAuthorizationVar.DeviceProfile.Profile.DetailInformation.description}
				</ListItem.Title>
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
				<ListItem.Content>
					<Pressable
						onPress={() =>
							navigation.navigate('ProfileEditorNavigator', {
								screen: 'InterestScreen',
							})
						}
					>
						<VStack flexDir={'row'} flexWrap={'wrap'}>
							{interests.map((interest, index) => (
								<Chip
									key={interest}
									disabled
									title={interest}
									disabledStyle={{
										backgroundColor: themeContext.palette.company.primary,
										paddingHorizontal: 8,
									}}
									disabledTitleStyle={{
										color: themeContext.palette.company.secondary,
										fontWeight: '600',
									}}
									containerStyle={{ margin: 2 }}
								/>
							))}
						</VStack>
					</Pressable>
				</ListItem.Content>
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
				<ListItem.Title>
					{rAuthorizationVar.DeviceProfile.Profile.IdentifiableInformation.gender || 'Set your gender'}
				</ListItem.Title>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'LookingForScreen',
					})
				}
				title={`I'm looking for a ...`}
			>
				<ListItem.Title numberOfLines={1}>
					{rAuthorizationVar.DeviceProfile.Profile.IdentifiableInformation.lookfor ||
						'Set the vibes your looking for'}
				</ListItem.Title>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'StatusScreen',
					})
				}
				title={`Relationship status`}
			>
				<ListItem.Title>Are you in a relationship</ListItem.Title>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'HometownScreen',
					})
				}
				title={`Add your hometown`}
			>
				<ListItem.Title>add your hometown</ListItem.Title>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('ProfileEditorNavigator', {
						screen: 'CurentPlaceScreen',
					})
				}
				title={'Add your city'}
			>
				<ListItem.Title>Rep your city</ListItem.Title>
			</RoundedListItem>
		</ScrollView>
	)
}

export default EditableOptionsScreen
