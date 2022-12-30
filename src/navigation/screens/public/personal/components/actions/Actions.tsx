import Details from '../details/Details'
import { useReactiveVar } from '@apollo/client'
import RelationshipModal from '@components/molecules/modals/relationshipmodal/RelationshipModal'
import SignupModal from '@components/molecules/modals/signupmodal/SignupModal'
import { Ionicons } from '@expo/vector-icons'
import { Profile, useGetRelationshipFriendRequestStatusQuery } from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { HStack, useDisclose, IconButton, Icon } from 'native-base'

type Props = {
	profile: Profile
}

export default function Actions({ profile }: Props) {
	const navigation = useNavigation()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const {
		isOpen: isOpenRelationshipModal,
		onOpen: openRelationshipModal,
		onClose: onCloseRelaationshipModal,
	} = useDisclose()
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
			profileId: profile.id,
		},
	})

	if (GRFRSLoading || !GRFRSData) return null

	return (
		<HStack
			space={1}
			flex={1}
			py={3}
			px={2}
			alignItems={'flex-start'}
			borderRadius={'xl'}
			_light={{
				bg: 'light.50',
			}}
			_dark={{
				bg: 'dark.50',
			}}
		>
			<RelationshipModal isOpen={isOpenRelationshipModal} onClose={onCloseRelaationshipModal} />
			<SignupModal isOpen={isOpenSignupModal} onClose={onCloseSignupModal} />

			<Details profile={profile} />
			<IconButton
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
	)
}
