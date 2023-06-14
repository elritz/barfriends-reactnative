// TODO: If user is joined to the venue remove join button show joined
import { useReactiveVar } from '@apollo/client'
import { GET_LIVE_VENUE_TOTALS_QUERY } from '@graphql/DM/profiling/out/index.query'
import {
	AuthorizationDeviceManager,
	AuthorizationDeviceProfile,
	Profile,
	ProfileVenue,
	useAddPersonalJoinsVenueMutation,
	useRemovePersonalJoinsVenueMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import useGetDistance from '@util/hooks/useDistance'
import { useRouter } from 'expo-router'
import { MotiPressable } from 'moti/interactions'
import { Image, VStack, Box, Heading, Button, Pressable } from 'native-base'
import { useEffect, useState, memo, useMemo } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Blurhash } from 'react-native-blurhash'

const width = Dimensions.get('window').width / 2.15

type Props = {
	item: ProfileVenue
	columnIndex: number
}

const VerticalVenueFeedVenueItem = (props: Props) => {
	const router = useRouter()
	const [hideBlur, setHideBlur] = useState(false)
	const [distance, setDistance] = useState(0)
	const [metric, setMetric] = useState('m')
	const [canJoin, setCanJoin] = useState(false)
	const [isJoined, setIsJoined] = useState(false)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const { refreshLocation } = useGetDistance()

	const [addPersonalJoinVenueMutation, { data: JVData, loading: JVLoading, error: JVError }] =
		useAddPersonalJoinsVenueMutation({
			variables: {
				profileIdVenue: String(props.item.id),
			},
			onCompleted: async data => {
				if (data.addPersonalJoinsVenue) {
					const profile = data.addPersonalJoinsVenue as Profile
					const deviceManager = rAuthorizationVar as AuthorizationDeviceManager
					const deviceprofile = rAuthorizationVar?.DeviceProfile as AuthorizationDeviceProfile
					if (
						profile?.Personal?.LiveOutPersonal?.Out &&
						deviceprofile?.Profile?.Personal?.LiveOutPersonal
					) {
						AuthorizationReactiveVar({
							...deviceManager,
							DeviceProfile: {
								...deviceprofile,
								Profile: {
									...deviceprofile.Profile,
									Personal: {
										...deviceprofile.Profile.Personal,
										LiveOutPersonal: {
											...deviceprofile.Profile.Personal.LiveOutPersonal,
											Out: profile.Personal.LiveOutPersonal.Out,
										},
									},
								},
							},
						})
					}
					setIsJoined(true)
				}
			},
			refetchQueries: [
				{
					query: GET_LIVE_VENUE_TOTALS_QUERY,
					variables: {
						profileIdVenue: props.item.id,
					},
				},
			],
		})

	const [
		removePersonalJoinsVenueMutation,
		{ data: RPJVData, loading: RPJVLoading, error: RPJVError },
	] = useRemovePersonalJoinsVenueMutation({
		onCompleted: async data => {
			if (data.removePersonalJoinsVenue) {
				setIsJoined(false)
				const profile = data.removePersonalJoinsVenue as Profile
				const deviceManager = rAuthorizationVar as AuthorizationDeviceManager
				const deviceprofile = rAuthorizationVar?.DeviceProfile as AuthorizationDeviceProfile
				if (
					profile?.Personal?.LiveOutPersonal?.Out &&
					deviceprofile?.Profile?.Personal?.LiveOutPersonal
				) {
					AuthorizationReactiveVar({
						...deviceManager,
						DeviceProfile: {
							...deviceprofile,
							Profile: {
								...deviceprofile.Profile,
								Personal: {
									...deviceprofile.Profile.Personal,
									LiveOutPersonal: {
										...deviceprofile.Profile.Personal.LiveOutPersonal,
										Out: profile.Personal.LiveOutPersonal.Out,
									},
								},
							},
						},
					})
				}
			}
		},
		refetchQueries: [
			{
				query: GET_LIVE_VENUE_TOTALS_QUERY,
				variables: {
					profileIdVenue: props.item.id,
				},
			},
		],
	})

	const setDist = ({ distanceInM }) => {
		if (distanceInM) {
			if (distanceInM > 1000) {
				const val = parseInt((distanceInM / 1000).toFixed(1))
				setDistance(val)
				setMetric('km')
				setCanJoin(false)
			} else {
				setDistance(distanceInM)
				setMetric('m')
				if (distanceInM < 25) {
					setCanJoin(true)
				}
			}
		}
	}

	useEffect(() => {
		if (props.item.distanceInM) {
			setDist({ distanceInM: props.item.distanceInM })
		}
	}, [props.item.distanceInM])

	useEffect(() => {
		if (rAuthorizationVar?.DeviceProfile?.Profile?.Personal) {
			const joinedToVenue =
				rAuthorizationVar.DeviceProfile.Profile?.Personal?.LiveOutPersonal?.Out.map(item => {
					return item.venueProfileId
				})

			if (joinedToVenue) {
				setIsJoined(joinedToVenue.includes(String(props.item.id)))
			}
		}
	}, [rAuthorizationVar, isJoined])

	const getTitleCase = str => {
		const titleCase = str
			.toLowerCase()
			.split(' ')
			.map(word => {
				return word.charAt(0).toUpperCase() + word.slice(1)
			})
			.join(' ')

		return titleCase
	}

	const _press = () => {
		// router.push({
		// 	pathname: `(app)/hometab/venuefeedstack/${props.item.id}`,
		// 	params: {
		// 		profileId: String(props.item.id),
		// 		distanceInM: Number(props.item.distanceInM),
		// 		latitude: Number(props.item.Venue?.Location?.Geometry?.latitude),
		// 		longitude: Number(props.item.Venue?.Location?.Geometry?.longitude),
		// 	},
		// })
		router.push({
			pathname: `(app)/public/venue/${props.item.id}`,
			params: {
				profileId: String(props.item.id),
				distanceInM: Number(props.item.distanceInM),
				latitude: Number(props.item.Venue?.Location?.Geometry?.latitude),
				longitude: Number(props.item.Venue?.Location?.Geometry?.longitude),
			},
		})
	}

	const _pressLeave = () => {
		isJoined ? removePersonalJoinsVenueMutation() : addPersonalJoinVenueMutation()
	}

	return (
		<Pressable disabled={JVLoading || RPJVLoading} onPress={() => _press()}>
			{({ isPressed }) => {
				return (
					<VStack
						space={2}
						width={width}
						flex={1}
						
						style={{
							alignSelf: 'center',
							overflow: 'hidden',
						}}
					>
						<Box minH={260}>
							<Image
								borderRadius={'xl'}
								source={{ uri: props.item.photos[0]?.url }}
								resizeMode='cover'
								onLoadEnd={() => setHideBlur(true)}
								style={{
									...StyleSheet.absoluteFillObject,
								}}
								alt={'Profile Photo'}
							/>
							{!hideBlur && (
								<>
									{props.item.photos[0]?.blurhash && (
										<Blurhash
											blurhash={String(props.item.photos[0].blurhash)}
											style={{
												flex: 1,
											}}
										/>
									)}
								</>
							)}
						</Box>

						<VStack space={2}>
							<Box>
								<Heading
									size={'sm'}
									fontWeight={'bold'}
									textAlign={'left'}
									numberOfLines={2}
									ellipsizeMode='tail'
									underline={isPressed}
								>
									{getTitleCase(props?.item?.IdentifiableInformation?.fullname)}
								</Heading>
								<Heading
									size={'sm'}
									fontWeight={'bold'}
									textAlign={'left'}
									numberOfLines={2}
									ellipsizeMode='tail'
								>
									{distance}
									{metric}
								</Heading>
							</Box>
							{canJoin ? (
								<>
									<Button
										variant={'solid'}
										onPress={() => _pressLeave()}
										colorScheme={isJoined ? 'error' : 'primary'}
										borderRadius={'md'}
										width={'full'}
										isLoadingText={isJoined ? 'Leaving' : 'Joining'}
										textAlign={'center'}
										_text={{
											fontWeight: '700',
											fontSize: 'md',
										}}
										h={'45px'}
									>
										{isJoined ? 'Leave' : 'Join'}
									</Button>
								</>
							) : metric === 'm' && distance < 100 ? (
								<Button
									variant={'ghost'}
									onPress={async () => {
										const { distanceInM } = await refreshLocation({
											vlat: props.item.Venue?.Location?.Geometry?.latitude,
											vlng: props.item.Venue?.Location?.Geometry?.longitude,
										})

										setDist({ distanceInM })
									}}
									borderRadius={'md'}
									textAlign={'center'}
								>
									Refresh distance
								</Button>
							) : null}
						</VStack>
					</VStack>
				)
			}}
		</Pressable>
	)
}

export default memo(VerticalVenueFeedVenueItem)
