import Details from '../details/Details'
import { useReactiveVar } from '@apollo/client'
import RelationshipModal from '@components/molecules/modals/relationshipmodal/RelationshipModal'
import SignupModal from '@components/molecules/modals/signupmodal/SignupModal'
import { Ionicons } from '@expo/vector-icons'
import { Profile, useGetRelationshipFriendRequestStatusQuery } from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { HStack, useDisclose, IconButton, Icon, VStack, Box, Button, Text } from 'native-base'
import { useState } from 'react'

type Props = {
	profile: Profile
}

export default function Actions({ profile }: Props) {
	const navigation = useNavigation()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [showMore, setShowMore] = useState(false)
	const {
		isOpen: isOpenSignupModal,
		onOpen: onOpenSignupModal,
		onClose: onCloseSignupModal,
	} = useDisclose()

	const isGuest = rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === 'GUEST'

	const {
		data: GRFRSData,
		loading: GRFRSLoading,
		error: GRFRSError,
	} = useGetRelationshipFriendRequestStatusQuery({
		skip: !profile.id,
		fetchPolicy: 'network-only',
		variables: {
			profileId: String(profile.id),
		},
	})

	if (GRFRSLoading || !GRFRSData) return null

	return (
		<VStack
			_light={{
				bg: 'light.50',
			}}
			_dark={{
				bg: 'dark.50',
			}}
			borderRadius={'xl'}
			flex={1}
			py={3}
			px={2}
			space={2}
		>
			<HStack alignItems={'flex-start'}>
				{/* <RelationshipModal isOpen={isOpenRelationshipModal} onClose={onCloseRelaationshipModal} /> */}
				<SignupModal isOpen={isOpenSignupModal} onClose={onCloseSignupModal} />

				<Details profile={profile} />
				<IconButton
					alignSelf={'center'}
					icon={
						<Icon
							style={{
								zIndex: 100,
								justifyContent: 'center',
							}}
							name='chatbubble-ellipses'
							size={'28px'}
							as={Ionicons}
							_light={{
								color: 'light.900',
							}}
							_dark={{
								color: 'dark.900',
							}}
						/>
					}
					borderRadius={'md'}
					colorScheme={'primary'}
					onPress={() => {
						isGuest
							? onOpenSignupModal()
							: navigation.navigate('MessageRoomNavigator', {
									screen: 'MessagingRoomScreen',
									params: {
										messageroomId: '',
									},
							  })
					}}
				/>
			</HStack>

			<Box flex={1}>
				{profile?.DetailInformation?.description?.length ? (
					<Box>
						{!showMore ? (
							<Text fontSize={'lg'} numberOfLines={2} isTruncated={true}>
								{profile.DetailInformation?.description}
							</Text>
						) : (
							<Text fontSize={'lg'}>{profile.DetailInformation?.description}</Text>
						)}
						<Button my={2} onPress={() => setShowMore(!showMore)} variant={'ghost'}>
							{showMore ? 'Show Less' : 'Show More'}
						</Button>
					</Box>
				) : (
					<Box my={2}>
						<Text h={'auto'} fontSize={'lg'} isTruncated={!showMore}>
							No description available
						</Text>
					</Box>
				)}
			</Box>
		</VStack>
	)
}
