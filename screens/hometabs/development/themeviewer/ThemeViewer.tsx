import { useReactiveVar } from '@apollo/client'
import { AntDesign } from '@expo/vector-icons'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import {
	AuthorizationDeviceManager,
	AuthorizationDeviceProfile,
	Profile,
	Theme,
	useGetAllThemesQuery,
	useProfileLazyQuery,
	useUpdateThemeManagerSwitchThemeMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { capitalizeFirstLetter } from '@util/@fn/capitalizeFirstLetter'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'
import { useRouter, useSearchParams } from 'expo-router'
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
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

export default function ThemeViewer() {
	const router = useRouter()
	const params = useSearchParams()
	const colorScheme = useColorScheme()
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [toggleThemes] = useToggleTheme()
	const insets = useSafeAreaInsets()

	const snapPoints = useMemo(() => ['45%', '95%'], [])

	const theme = params?.params?.theme as Theme
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

	const RenderTheme = useCallback(
		({ item }) => {
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
					_light={{
						bg: 'gray.100',
					}}
					_dark={{
						bg: 'gray.700',
					}}
					shadow={'1'}
					style={{
						flex: 1,
					}}
					py={4}
					px={1}
					borderRadius={'md'}
					borderWidth={3}
					borderColor={theme.id === item.id ? 'success.500' : 'transparent'}
				>
					<Pressable
						onPress={async () => {
							router.push({
								pathname: '(app)/hometab/developmentstack/themeviewer',
								params: {
									theme: item,
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
									{company.dark.map((item, index) => {
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
						<Text fontWeight={'medium'} textTransform={'capitalize'} textAlign={'center'} fontSize={'xl'}>
							{item.name}
						</Text>
					</Pressable>
				</Box>
			)
		},
		[theme.id],
	)

	const RenderColor = useCallback(({ color }) => {
		return (
			<VStack m={2} space={2} alignItems={'flex-start'}>
				<Box
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

	const ThemeColorScheme = useCallback(() => {
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
					borderColor={rThemeVar.localStorageColorScheme === 'system' && 'primary.300'}
					borderWidth={2}
				>
					<Text color={colorScheme === 'light' ? 'black' : 'white'}>System</Text>
				</Button>
			</HStack>
		)
	}, [])

	const [profileQuery, { data: PData, loading: PLoading, error: PError }] = useProfileLazyQuery({
		variables: {
			where: {
				id: {
					equals: rAuthorizationVar?.DeviceProfile?.Profile?.id,
				},
			},
		},
		onCompleted: async data => {
			if (data.profile) {
				const profile = data.profile as Profile
				const deviceManager = rAuthorizationVar as AuthorizationDeviceManager
				const deviceprofile = rAuthorizationVar?.DeviceProfile as AuthorizationDeviceProfile

				AuthorizationReactiveVar({
					...deviceManager,
					DeviceProfile: {
						...deviceprofile,
						Profile: profile,
					},
				})
				await toggleThemes({ colorScheme: rThemeVar.colorScheme })
				setTimeout(() => router.back(), 2000)
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
			<BottomSheetFlatList
				data={GATData?.getAllThemes}
				keyExtractor={item => item.id.toString()}
				numColumns={3}
				renderItem={RenderTheme}
				ListHeaderComponent={() => {
					return <ThemeColorScheme />
				}}
			/>
			<ScrollView
				mt={70}
				contentInset={{
					bottom: insets.bottom + 20,
				}}
			>
				<Box>
					<VStack px={3} alignItems={'center'} space={6} w={'full'}>
						<Button
							variant={'ghost'}
							endIcon={
								<Icon
									style={{ position: 'absolute', right: -15, top: 30 }}
									size={'md'}
									as={AntDesign}
									name={'down'}
								/>
							}
							w={'65%'}
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
							].map((item, index) => {
								return (
									<VStack key={index} alignItems={'center'}>
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
								rAuthorizationVar?.DeviceProfile?.Profile?.ThemeManager?.ProfileTheme[0].themeId ===
								theme.id
							}
							px={10}
							variant={'solid'}
							_disabled={{
								opacity: 1,
							}}
							startIcon={
								rAuthorizationVar?.DeviceProfile?.Profile?.ThemeManager?.ProfileTheme[0].themeId ===
								theme.id ? (
									<Icon as={AntDesign} size={'md'} name={'checkcircle'} />
								) : null
							}
							colorScheme={
								rAuthorizationVar?.DeviceProfile?.Profile?.ThemeManager?.ProfileTheme[0].themeId ===
								theme.id
									? 'primary'
									: 'tertiary'
							}
							onPress={() => {
								updateThemeManagerSwitchTheme({
									variables: {
										id: String(rAuthorizationVar?.DeviceProfile?.Profile?.ThemeManager?.id),
										themeId: theme.id,
									},
								})
							}}
						>
							<Text fontSize={'xl'}>
								{rAuthorizationVar?.DeviceProfile?.Profile?.ThemeManager?.ProfileTheme[0].themeId ===
								theme.id
									? 'Active theme'
									: 'Set theme'}
							</Text>
						</Button>
						<ThemeColorScheme />
					</VStack>
					<Box
						mt={5}
						px={2}
						w={'full'}
						_dark={{
							bg: 'gray.800',
						}}
						_light={{
							bg: 'gray.50',
						}}
					>
						<Heading mx={2} my={3} fontSize={'2xl'}>
							{capitalizeFirstLetter(theme.name)}
						</Heading>
						<Stack flexDir={'row'} flexWrap={'wrap'} space={2}>
							{rThemeVar.colorScheme === 'light' ? (
								<>
									{company.light.map((item, index) => {
										return <RenderColor key={index} color={item} />
									})}
								</>
							) : (
								<>
									{company.dark.map((item, index) => {
										return <RenderColor key={index} color={item} />
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
										return <RenderColor key={index} color={item} />
									})}
								</>
							) : (
								<>
									{styled.dark.map((item, index) => {
										return <RenderColor key={index} color={item} />
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
										return <RenderColor key={index} color={item} />
									})}
								</>
							) : (
								<>
									{bfs.dark.map((item, index) => {
										return <RenderColor key={index} color={item} />
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
