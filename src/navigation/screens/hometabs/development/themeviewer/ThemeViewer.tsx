import { useReactiveVar } from '@apollo/client'
import { AntDesign } from '@expo/vector-icons'
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet'
import {
	Profile,
	Theme,
	useGetAllThemesQuery,
	useProfileLazyQuery,
	useUpdateThemeManagerSwitchThemeMutation,
} from '@graphql/generated'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { capitalizeFirstLetter } from '@util/@fn/capitalizeFirstLetter'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'
import { DateTime } from 'luxon'
import {
	Box,
	Button,
	Center,
	Divider,
	Heading,
	HStack,
	Icon,
	ScrollView,
	Stack,
	Text,
	VStack,
} from 'native-base'
import { useCallback, useMemo, useRef } from 'react'
import { Pressable, useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DevelopmentStackParamList, HomeTabNavigatorParamList } from 'src/types/app'

export type DevelopmentTabRouteProp = RouteProp<DevelopmentStackParamList, 'ThemeViewer'>

export default function ThemeViewer() {
	const navigation = useNavigation()
	const route = useRoute<DevelopmentTabRouteProp>()
	const colorScheme = useColorScheme()
	const bottomSheetModalRef = useRef<BottomSheetModal>(null)
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [toggleThemes] = useToggleTheme()

	const snapPoints = useMemo(() => ['45%', '95%'], [])

	const theme = route.params.theme as Theme
	const created = DateTime.fromISO(theme.createdAt).toFormat('yyyy LLL dd')
	const updated = DateTime.fromISO(theme.updatedAt).toFormat('yyyy LLL dd')

	const company = {
		dark: [
			theme.mobile[0].dark.styled.palette.company.primary,
			theme.mobile[0].dark.styled.palette.company.secondary,
			theme.mobile[0].dark.styled.palette.company.tertiary,
		],
		light: [
			theme.mobile[0].light.styled.palette.company.primary,
			theme.mobile[0].light.styled.palette.company.secondary,
			theme.mobile[0].light.styled.palette.company.tertiary,
		],
	}
	const styled = {
		dark: [
			theme.mobile[0].dark.styled.palette.primary.background.default,
			theme.mobile[0].dark.styled.palette.secondary.background.default,
			theme.mobile[0].dark.styled.palette.tertiary.background.default,
			theme.mobile[0].dark.styled.palette.quaternary.background.default,
		],
		light: [
			theme.mobile[0].light.styled.palette.primary.background.default,
			theme.mobile[0].light.styled.palette.secondary.background.default,
			theme.mobile[0].light.styled.palette.tertiary.background.default,
			theme.mobile[0].light.styled.palette.quaternary.background.default,
		],
	}
	const bfs = {
		dark: [
			theme.mobile[0].dark.styled.palette.bfscompany.primary,
			theme.mobile[0].dark.styled.palette.bfscompany.secondary,
			theme.mobile[0].dark.styled.palette.bfscompany.tertiary,
		],
		light: [
			theme.mobile[0].light.styled.palette.bfscompany.primary,
			theme.mobile[0].light.styled.palette.bfscompany.secondary,
			theme.mobile[0].light.styled.palette.bfscompany.tertiary,
		],
	}

	const handleSnapPress = useCallback(index => {
		bottomSheetModalRef.current.present()
		bottomSheetModalRef.current?.snapToIndex(index)
	}, [])

	const RenderTheme = useCallback(({ item }) => {
		const company = {
			dark: [
				item.mobile[0].dark.styled.palette.company.primary,
				item.mobile[0].dark.styled.palette.company.secondary,
				item.mobile[0].dark.styled.palette.company.tertiary,
			],
			light: [
				item.mobile[0].light.styled.palette.company.primary,
				item.mobile[0].light.styled.palette.company.secondary,
				item.mobile[0].light.styled.palette.company.tertiary,
			],
		}
		const styled = {
			dark: [
				item.mobile[0].dark.styled.palette.primary.background.default,
				item.mobile[0].dark.styled.palette.secondary.background.default,
				item.mobile[0].dark.styled.palette.tertiary.background.default,
				item.mobile[0].dark.styled.palette.quaternary.background.default,
			],
			light: [
				item.mobile[0].light.styled.palette.primary.background.default,
				item.mobile[0].light.styled.palette.secondary.background.default,
				item.mobile[0].light.styled.palette.tertiary.background.default,
				item.mobile[0].light.styled.palette.quaternary.background.default,
			],
		}
		const bfs = {
			dark: [
				item.mobile[0].dark.styled.palette.bfscompany.primary,
				item.mobile[0].dark.styled.palette.bfscompany.secondary,
				item.mobile[0].dark.styled.palette.bfscompany.tertiary,
			],
			light: [
				item.mobile[0].light.styled.palette.bfscompany.primary,
				item.mobile[0].light.styled.palette.bfscompany.secondary,
				item.mobile[0].light.styled.palette.bfscompany.tertiary,
			],
		}

		return (
			<Box
				key={item.id}
				m={3}
				bg={'gray.400'}
				style={{
					flex: 1,
				}}
				py={4}
				px={1}
				borderRadius={'lg'}
				borderWidth={2}
				borderColor={
					AuthorizationReactiveVar().DeviceProfile.Profile.ThemeManager.ProfileTheme.Theme.id === item.id
						? 'primary.400'
						: 'transparent'
				}
			>
				<Pressable
					onPress={async () => {
						bottomSheetModalRef.current.close()
						navigation.navigate('HomeTabNavigator', {
							screen: 'DevelopmentStack',
							params: {
								screen: 'ThemeViewer',
								params: {
									theme: item,
								},
							},
						})
					}}
				>
					<Stack flexDir={'row'} flexWrap={'wrap'} space={2}>
						{rThemeVar.colorScheme === 'light' ? (
							<>
								{bfs.light.map((item, index) => {
									return (
										<Box
											key={index}
											alignSelf={'center'}
											style={{
												backgroundColor: item,
												width: 30,
												height: 30,
											}}
											m={2}
										/>
									)
								})}
							</>
						) : (
							<>
								{bfs.dark.map((item, index) => {
									return (
										<Box
											key={index}
											alignSelf={'center'}
											style={{
												backgroundColor: item,
												width: 30,
												height: 30,
											}}
											m={2}
										/>
									)
								})}
							</>
						)}
					</Stack>
					<Divider />
					<Stack flexDir={'row'} flexWrap={'wrap'} space={2}>
						{rThemeVar.colorScheme === 'light' ? (
							<>
								{styled.light.map((item, index) => {
									return (
										<Box
											key={index}
											alignSelf={'center'}
											style={{
												backgroundColor: item,
												width: 30,
												height: 30,
											}}
											m={2}
										/>
									)
								})}
							</>
						) : (
							<>
								{styled.dark.map((item, index) => {
									return (
										<Box
											key={index}
											alignSelf={'center'}
											style={{
												backgroundColor: item,
												width: 30,
												height: 30,
											}}
											m={2}
										/>
									)
								})}
							</>
						)}
					</Stack>
					<Divider />
					<Stack flexDir={'row'} flexWrap={'wrap'} space={2}>
						{rThemeVar.colorScheme === 'light' ? (
							<>
								{company.light.map((item, index) => {
									return (
										<Box
											key={index}
											alignSelf={'center'}
											style={{
												backgroundColor: item,
												width: 30,
												height: 30,
											}}
											m={2}
										/>
									)
								})}
							</>
						) : (
							<>
								{company.dark.map(item => {
									return (
										<Box
											alignSelf={'center'}
											style={{
												backgroundColor: item,
												width: 30,
												height: 30,
											}}
											m={2}
										/>
									)
								})}
							</>
						)}
					</Stack>
					<Text fontWeight={'medium'} textTransform={'capitalize'} textAlign={'center'} fontSize={'xl'}>
						{item.name}
					</Text>
				</Pressable>
			</Box>
		)
	}, [])

	const RenderColor = useCallback(({ color, index }) => {
		return (
			<VStack m={2} space={2} alignItems={'flex-start'}>
				<Box
					key={index}
					alignSelf={'center'}
					style={{
						backgroundColor: color,
						width: 90,
						height: 90,
					}}
				/>
				<Text fontWeight={'bold'}>{color}</Text>
			</VStack>
		)
	}, [])

	const [profileQuery, { data: PData, loading: PLoading, error: PError }] = useProfileLazyQuery({
		variables: {
			where: {
				id: rAuthorizationVar.DeviceProfile.Profile?.id,
			},
		},
		onCompleted: async data => {
			if (data.profile) {
				const profile = data.profile as Profile
				AuthorizationReactiveVar({
					...rAuthorizationVar,
					DeviceProfile: {
						...rAuthorizationVar.DeviceProfile,
						Profile: profile,
					},
				})
				await toggleThemes({ colorScheme: rThemeVar.colorScheme })
				setTimeout(() => navigation.goBack(), 2000)
			}
		},
	})

	const [updateThemeManagerSwitchTheme, { data: UTMSData, loading: UTMSLoading, error: UTMSError }] =
		useUpdateThemeManagerSwitchThemeMutation({
			onCompleted: async data => {
				profileQuery()
			},
		})

	const { data: GATData, loading: GATLoading, error } = useGetAllThemesQuery()

	return (
		<SafeAreaView>
			<BottomSheetModal
				ref={bottomSheetModalRef}
				snapPoints={snapPoints}
				backgroundStyle={{
					backgroundColor: rThemeVar.colorScheme === 'dark' ? 'black' : 'white',
				}}
			>
				<BottomSheetFlatList
					data={GATData.getAllThemes}
					keyExtractor={i => i}
					numColumns={3}
					renderItem={RenderTheme}
					ListHeaderComponent={() => {
						return (
							<HStack px={2} py={4} w={'full'} space={21} justifyContent={'space-around'}>
								<Button
									onPress={async () => {
										await toggleThemes({ colorScheme: 'light' })
									}}
									bg={'light.200'}
									flex={1}
									borderColor={rThemeVar.colorScheme === 'light' && 'primary.300'}
									borderWidth={2}
								>
									<Text color={'black'}>Light</Text>
								</Button>
								<Button
									onPress={async () => {
										await toggleThemes({ colorScheme: 'dark' })
									}}
									bg={'dark.100'}
									flex={1}
									borderColor={rThemeVar.colorScheme === 'dark' && 'primary.300'}
									borderWidth={2}
								>
									<Text color={'white'}>Dark</Text>
								</Button>
								<Button
									onPress={async () => {
										await toggleThemes({ colorScheme: 'system' })
									}}
									bg={colorScheme === 'light' ? 'light.200' : 'dark.100'}
									flex={1}
									borderColor={rThemeVar.colorScheme === 'system' && 'primary.300'}
									borderWidth={2}
								>
									<Text color={colorScheme === 'light' ? 'black' : 'white'}>System</Text>
								</Button>
							</HStack>
						)
					}}
				/>
			</BottomSheetModal>

			<ScrollView mt={70} mb={20}>
				<Box>
					<VStack alignItems={'center'} space={6} w={'full'}>
						<Button
							onPress={() => handleSnapPress(1)}
							variant={'ghost'}
							endIcon={<Icon size={'md'} as={AntDesign} name={'down'} />}
						>
							<Center>
								<Heading fontWeight={'light'} fontSize={'6xl'}>
									{capitalizeFirstLetter(theme.name)}
								</Heading>
								<Heading fontWeight={'black'} fontSize={'sm'}>
									theme
								</Heading>
							</Center>
						</Button>
						<HStack w={'100%'} justifyContent={'space-around'}>
							{[
								{ title: 'created', value: created },
								{ title: 'updated', value: updated },
							].map(item => {
								return (
									<VStack alignItems={'center'}>
										<Text fontSize={'xl'}>{item.value}</Text>
										<Heading fontWeight={'bold'} fontSize={'sm'}>
											{capitalizeFirstLetter(item.title)}
										</Heading>
									</VStack>
								)
							})}
						</HStack>
						<Button
							isDisabled={
								rAuthorizationVar.DeviceProfile.Profile.ThemeManager.ProfileTheme.themeId === theme.id
							}
							px={10}
							variant={'solid'}
							bg={'primary.600'}
							_disabled={{
								opacity: 1,
							}}
							startIcon={
								rAuthorizationVar.DeviceProfile.Profile.ThemeManager.ProfileTheme.themeId === theme.id ? (
									<Icon as={AntDesign} size={'md'} name={'checkcircle'} />
								) : null
							}
							colorScheme={
								rAuthorizationVar.DeviceProfile.Profile.ThemeManager.ProfileTheme.themeId === theme.id
									? 'primary'
									: 'tertiary'
							}
							onPress={() => {
								updateThemeManagerSwitchTheme({
									variables: {
										id: rAuthorizationVar.DeviceProfile.Profile.ThemeManager.id,
										themeId: theme.id,
									},
								})
							}}
						>
							<Text fontSize={'xl'}>
								{rAuthorizationVar.DeviceProfile.Profile.ThemeManager.ProfileTheme.themeId === theme.id
									? 'Active theme'
									: 'Set theme'}
							</Text>
						</Button>
					</VStack>
					<Box mt={10} w={'full'} bg={'secondary.500'}>
						<Heading mx={2} my={3} fontSize={'2xl'}>
							{capitalizeFirstLetter(theme.name)}
						</Heading>
						<Stack flexDir={'row'} flexWrap={'wrap'} space={2}>
							{rThemeVar.colorScheme === 'light' ? (
								<>
									{company.light.map((item, index) => {
										return <RenderColor color={item} index={index} />
									})}
								</>
							) : (
								<>
									{company.dark.map((item, index) => {
										return <RenderColor color={item} index={index} />
									})}
								</>
							)}
						</Stack>
						<Divider />

						<Heading mx={2} my={3} fontSize={'2xl'}>
							Styled Components
						</Heading>
						<Stack flexDir={'row'} flexWrap={'wrap'} space={2}>
							{rThemeVar.colorScheme === 'light' ? (
								<>
									{styled.light.map((item, index) => {
										return <RenderColor color={item} index={index} />
									})}
								</>
							) : (
								<>
									{styled.dark.map((item, index) => {
										return <RenderColor color={item} index={index} />
									})}
								</>
							)}
						</Stack>
						<Divider />
						<Heading mx={2} my={3} fontSize={'2xl'}>
							Barfriends
						</Heading>
						<Stack flexDir={'row'} flexWrap={'wrap'} space={2}>
							{rThemeVar.colorScheme === 'light' ? (
								<>
									{bfs.light.map((item, index) => {
										return <RenderColor color={item} index={index} />
									})}
								</>
							) : (
								<>
									{bfs.dark.map((item, index) => {
										return <RenderColor color={item} index={index} />
									})}
								</>
							)}
						</Stack>
					</Box>
				</Box>
			</ScrollView>
		</SafeAreaView>
	)
}
