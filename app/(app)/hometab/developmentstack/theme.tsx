import { useReactiveVar } from '@apollo/client'
import { useGetAllThemesQuery } from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'
import { useRouter } from 'expo-router'
import { Box, Button, Divider, FlatList, HStack, Pressable, Stack, Text } from 'native-base'
import { useCallback } from 'react'

export default function Preferences() {
	const ITEM_HEIGHT = 50
	const router = useRouter()
	const colorScheme = useThemeColorScheme()
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const [toggleThemes] = useToggleTheme()

	const { data: GATData, loading: GATLoading, error } = useGetAllThemesQuery()

	const renderItem = useCallback(
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
					bg={colorScheme === 'light' ? 'light.50' : 'gray.800'}
					shadow={5}
					style={{
						flex: 1,
					}}
					py={4}
					px={1}
					borderRadius={'lg'}
					borderWidth={2}
					borderColor={
						AuthorizationReactiveVar()?.DeviceProfile?.Profile?.ThemeManager?.ProfileTheme[0]?.Theme
							.id === item.id
							? 'primary.400'
							: 'transparent'
					}
				>
					<Pressable
						onPress={async () => {
							router.back()
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
		[rThemeVar.colorScheme],
	)

	if (GATLoading || !GATData?.getAllThemes) return null

	const setTheme = async ({ colorScheme }: { colorScheme: 'light' | 'dark' | 'system' }) => {
		await toggleThemes({ colorScheme })
	}

	return (
		<FlatList
			data={GATData.getAllThemes}
			keyExtractor={i => i}
			numColumns={3}
			renderItem={renderItem}
			ListHeaderComponent={() => {
				return (
					<HStack px={2} py={4} w={'full'} space={21} justifyContent={'space-around'}>
						<Button
							onPress={async () => {
								await setTheme({ colorScheme: 'light' })
							}}
							bg={'light.200'}
							flex={1}
							borderColor={colorScheme === 'light' && 'primary.300'}
							borderWidth={2}
						>
							<Text color={'black'}>Light</Text>
						</Button>
						<Button
							onPress={async () => {
								await setTheme({ colorScheme: 'dark' })
							}}
							bg={'dark.100'}
							flex={1}
							borderColor={colorScheme === 'dark' && 'primary.300'}
							borderWidth={2}
						>
							<Text color={'white'}>Dark</Text>
						</Button>
						<Button
							onPress={async () => {
								await setTheme({ colorScheme: 'light' })
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
	)
}
