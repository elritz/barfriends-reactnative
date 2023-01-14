import { useReactiveVar } from '@apollo/client'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import CancelFriendNotificationModal from '@components/molecules/modals/cancelfriendnotioficationmodal/CancelFriendNotificationModal'
import RelationshipModal from '@components/molecules/modals/relationshipmodal/RelationshipModal'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { GET_RELATIONSHIP_FRIENDREQUESTSTATUS_QUERY } from '@graphql/DM/profiling/friending/index.query'
import { NOTIFICATIONS_QUERY } from '@graphql/DM/profiling/notifications/index.query'
import {
	useGetRelationshipFriendRequestStatusQuery,
	useCreateFriendRequestMutation,
	useAcceptFriendRequestMutation,
	useDeclineFriendRequestMutation,
} from '@graphql/generated'
import PersonalScreen from '@navigation/screens/public/personal/Personal'
import { RouteProp, useRoute } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthorizationReactiveVar } from '@reactive'
import { PersonalProfileStackParamList, PublicNavigatorParamList } from '@types'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Button, HStack, Icon, IconButton, useDisclose, useTheme } from 'native-base'
import { ReactElement } from 'react'

const ScreenStack = createStackNavigator<PersonalProfileStackParamList>()

export type PublicProfileRouteProp = RouteProp<PublicNavigatorParamList, 'PersonalStack'>

function PersonalStack() {
	const colorScheme = useThemeColorScheme()
	const theme = useTheme()
	const route = useRoute<PublicProfileRouteProp>()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const {
		isOpen: isOpenRelationshipModal,
		onOpen: openRelationshipModal,
		onClose: onCloseRelationshipModal,
	} = useDisclose()
	const {
		isOpen: isOpenSignupModal,
		onOpen: onOpenSignupModal,
		onClose: onCloseSignupModal,
	} = useDisclose()
	const {
		isOpen: isOpenCancelFriendNotification,
		onOpen: onOpenCancelFriendNotification,
		onClose: onCloseCancelFriendNotification,
	} = useDisclose()

	const isGuest = rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === 'GUEST'

	const {
		data: GRFRSData,
		loading: GRFRSLoading,
		error: GRFRSError,
	} = useGetRelationshipFriendRequestStatusQuery({
		skip: !route.params?.params?.profileId,
		fetchPolicy: 'network-only',
		variables: {
			profileId: String(route.params?.params?.profileId),
		},
	})

	const [createFriendRequestMutation, { data, loading, error }] = useCreateFriendRequestMutation({
		refetchQueries: [
			{
				query: GET_RELATIONSHIP_FRIENDREQUESTSTATUS_QUERY,
				variables: {
					profileId: String(route.params?.params?.profileId),
				},
			},
			{
				query: NOTIFICATIONS_QUERY,
			},
		],
	})

	const [acceptFriendRequestMutation, { data: AFRData, loading: AFRLoading, error: AFRError }] =
		useAcceptFriendRequestMutation({
			onCompleted: data => {},
			// update(cache, { data }) {
			// 	const { getNotifications }: any = cache.readQuery({
			// 		query: NOTIFICATIONS_QUERY,
			// 	})

			// 	if (data?.deleteFriendRequest) {
			// 		cache.writeQuery({
			// 			query: NOTIFICATIONS_QUERY,
			// 			data: {
			// 				getNotifications: getNotifications.friendRequestNotifications.filter(notification => {
			// 					notification.id !== item.id
			// 				}),
			// 			},
			// 		})
			// 	}
			// },
			update(cache, { data }) {
				const { getNotifications }: any = cache.readQuery({
					query: NOTIFICATIONS_QUERY,
				})

				if (data?.acceptFriendRequest?.id) {
					cache.writeQuery({
						query: NOTIFICATIONS_QUERY,
						data: {
							getNotifications: getNotifications.friendRequestNotifications.filter(notification => {
								notification.id !== String(data.acceptFriendRequest?.id)
							}),
						},
					})
				}
			},
		})

	const [declineFriendRequestMutation, { data: DFRData, loading: DFRLoading, error: DFRError }] =
		useDeclineFriendRequestMutation({
			refetchQueries: [
				{
					query: GET_RELATIONSHIP_FRIENDREQUESTSTATUS_QUERY,
					variables: {
						profileId: String(route.params?.params?.profileId),
					},
				},
			],
			onError: error => {
				console.log('🚀 --------------------------------------------------------------🚀')
				console.log('🚀 ~ file: PersonalStack.tsx:148 ~ PersonalStack ~ error', error)
				console.log('🚀 --------------------------------------------------------------🚀')
			},
		})

	if (GRFRSLoading || !GRFRSData) return null

	const FriendStatusButton = (): ReactElement | null => {
		switch (GRFRSData.getRelationshipFriendRequestStatus?.__typename) {
			case 'FriendRequest':
				const isSender =
					GRFRSData?.getRelationshipFriendRequestStatus.senderProfileId ===
					rAuthorizationVar?.DeviceProfile?.Profile?.id

				return (
					<>
						{isSender ? (
							<>
								<CancelFriendNotificationModal
									profileId={String(route.params?.params?.profileId)}
									friendRequestId={GRFRSData.getRelationshipFriendRequestStatus.id}
									isOpen={isOpenCancelFriendNotification}
									onClose={onCloseCancelFriendNotification}
								/>
								<Button
									variant={'outline'}
									colorScheme={'primary'}
									px={3}
									mx={2}
									mr={2}
									height={'35px'}
									borderRadius={'lg'}
									_disabled={{
										opacity: '100',
									}}
									_text={{
										fontSize: 11,
										lineHeight: 'xs',
										textTransform: 'uppercase',
										fontWeight: '800',
									}}
									onPress={() => {
										isGuest
											? onOpenSignupModal()
											: isSender
											? onOpenCancelFriendNotification()
											: console.log('receiver')
									}}
								>
									Requested
								</Button>
							</>
						) : (
							<HStack space={1} justifyContent={'space-around'} alignItems={'center'} mr={3}>
								<Button
									colorScheme={'primary'}
									px={3}
									mx={2}
									height={'35px'}
									borderRadius={'lg'}
									_disabled={{
										opacity: '100',
									}}
									_text={{
										fontSize: 11,
										lineHeight: 'xs',
										textTransform: 'uppercase',
										fontWeight: '800',
									}}
									isLoadingText={'Accept'}
									isDisabled={DFRLoading || AFRLoading}
									onPress={() =>
										acceptFriendRequestMutation({
											variables: {
												friendRequestId: String(GRFRSData?.getRelationshipFriendRequestStatus?.id),
												venueIdMetAt: '',
											},
										})
									}
								>
									Accept
								</Button>
								<IconButton
									variant={'outline'}
									px={2}
									py={2}
									height={'35px'}
									isDisabled={DFRLoading || AFRLoading}
									icon={<Icon as={Ionicons} name='close' size={'lg'} rounded={'full'} />}
									onPress={() =>
										declineFriendRequestMutation({
											variables: {
												friendRequestId: String(GRFRSData?.getRelationshipFriendRequestStatus?.id),
											},
										})
									}
								/>
							</HStack>
						)}
					</>
				)
			case 'Relationship':
				return (
					<>
						<RelationshipModal isOpen={isOpenRelationshipModal} onClose={onCloseRelationshipModal} />
						<IconButton
							icon={<Icon as={MaterialCommunityIcons} name={'account'} />}
							colorScheme={'primary'}
							variant={'solid'}
							px={3}
							py={2}
							mx={2}
							w={'45px'}
							onPress={() => {
								openRelationshipModal()
							}}
						/>
					</>
				)

			case 'RejectedFriendsResponse':
				return (
					<Button
						colorScheme={'primary'}
						px={3}
						mx={2}
						height={'35px'}
						borderRadius={'lg'}
						_disabled={{
							opacity: '100',
						}}
						_text={{
							fontSize: 11,
							lineHeight: 'xs',
							textTransform: 'uppercase',
							fontWeight: '800',
						}}
						onPress={() => {
							isGuest
								? onOpenSignupModal()
								: createFriendRequestMutation({
										variables: {
											receiversProfileId: [String(route.params?.params?.profileId)],
											senderProfileId: String(rAuthorizationVar?.DeviceProfile?.Profile?.id),
										},
								  })
						}}
					>
						Barfriend
					</Button>
				)
			default:
				return null
		}
	}

	return (
		<ScreenStack.Navigator>
			<ScreenStack.Screen
				name='PublicPersonalScreen'
				component={PersonalScreen}
				options={{
					// headerShown: false,
					headerStyle: {
						backgroundColor: colorScheme === 'light' ? theme.colors.light[50] : theme.colors.dark[50],
						shadowOpacity: 0,
						// height: 80,
					},
					// headerTitle: () => <LogoTransparent height={30} width={192} />,
					headerTitle: '',
					headerRight: () => {
						return <FriendStatusButton />
					},
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
		</ScreenStack.Navigator>
	)
}

export default PersonalStack
