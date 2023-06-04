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
import { Image, VStack, Box, Heading, Pressable, Button, Skeleton } from 'native-base'
import { useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Blurhash } from 'react-native-blurhash'

const width = Dimensions.get('window').width / 2.15

type Props = {
	index: number
	item: ProfileVenue
	columnIndex: number
	loading: boolean
}

const VerticalVenueFeedVenueItem = (props: Props) => {
	const router = useRouter()
	const [hideBlur, setHideBlur] = useState(false)
	const [distance, setDistance] = useState(0)
	const [metric, setMetric] = useState('m')
	const [canJoin, setCanJoin] = useState(false)
	const [isJoined, setIsJoined] = useState(false)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [outId, setOutId] = useState('')

	const [addPersonalJoinVenueMutation, { data: JVData, loading: JVLoading, error: JVError }] =
		useAddPersonalJoinsVenueMutation({
			variables: {
				profileIdVenue: String(props.item.id),
				profileIdPersonal: String(rAuthorizationVar?.DeviceProfile?.Profile?.id),
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
		variables: {
			outId,
		},
		onCompleted: async () => {
			setIsJoined(false)
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
	const { refreshLocation } = useGetDistance()

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
			const out = rAuthorizationVar?.DeviceProfile?.Profile?.Personal?.LiveOutPersonal?.Out.find(
				item => item.venueProfileId === props.item.id,
			)
			if (out) {
				setOutId(out.id)
			}
			if (joinedToVenue) {
				setIsJoined(joinedToVenue.includes(String(props.item.id)))
			}
		}
	}, [rAuthorizationVar, isJoined])

	if (!props.item || props.loading) {
		return (
			<Skeleton
				h={'260'}
				w={width}
				rounded={'md'}
				style={{
					alignSelf: 'center',
					overflow: 'hidden',
				}}
				speed={0.95}
				_light={{
					startColor: 'coolGray.100',
					endColor: 'coolGray.300',
				}}
				_dark={{
					startColor: 'dark.200',
					endColor: 'dark.300',
				}}
			/>
		)
	}

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

	return (
		<Pressable
			mx={1}
			rounded={'md'}
			key={props.item.id}
			onPress={() => {
				router.push({
					pathname: `(app)/public/venue/${props.item.id}`,
					params: {
						profileId: String(props.item.id),
						distanceInM: Number(props.item.distanceInM),
						latitude: Number(props.item.Venue?.Location?.Geometry?.latitude),
						longitude: Number(props.item.Venue?.Location?.Geometry?.longitude),
					},
				})
			}}
		>
			<VStack
				space={2}
				width={width}
				flex={1}
				borderRadius={'md'}
				style={{
					alignSelf: 'center',
					overflow: 'hidden',
				}}
			>
				<Box minH={260}>
					{!props.loading ? (
						<Image
							borderRadius={'md'}
							source={{ uri: props.item.photos[0]?.url }}
							resizeMode='cover'
							onLoadEnd={() => setHideBlur(true)}
							style={{
								...StyleSheet.absoluteFillObject,
							}}
							alt={'Profile Photo'}
						/>
					) : null}
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
					{!props.loading && canJoin ? (
						<>
							<Button
								variant={isJoined ? 'ghost' : 'solid'}
								onPress={() => {
									if (rAuthorizationVar?.DeviceProfile) {
										isJoined ? removePersonalJoinsVenueMutation() : addPersonalJoinVenueMutation()
									}
								}}
								colorScheme={isJoined ? 'error' : 'primary'}
								borderRadius={'md'}
								textAlign={'center'}
								_text={{
									fontWeight: '700',
									fontSize: 'md',
								}}
							>
								{isJoined ? 'Leave' : 'Join'}
							</Button>
						</>
					) : metric === 'm' && distance < 50 ? (
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
		</Pressable>
	)
}

export default VerticalVenueFeedVenueItem
