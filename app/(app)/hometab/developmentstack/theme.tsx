import { useReactiveVar } from '@apollo/client'
import { Box, Button, Divider, HStack, Heading, Pressable, Text, VStack } from '@components/core'
import { useGetAllThemesQuery } from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'
import { useRouter } from 'expo-router'
import { useCallback } from 'react'

export default function Preferences() {
	const ITEM_HEIGHT = 50
	const router = useRouter()
	const colorScheme = useThemeColorScheme()
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const [toggleTheme] = useToggleTheme()

	const { data: GATData, loading: GATLoading, error } = useGetAllThemesQuery()

	const renderItem = useCallback(
		({ item }) => {
			console.log('item.theme.dark :>> ', JSON.stringify(item, null, 4))
			const company = {
				dark: [
					item.theme.styled.dark.palette.company.primary,
					item.theme.styled.dark.palette.company.secondary,
					item.theme.styled.dark.palette.company.tertiary,
				],
				light: [
					item.theme.styled.light.palette.company.primary,
					item.theme.styled.light.palette.company.secondary,
					item.theme.styled.light.palette.company.tertiary,
				],
			}
			const bfs = {
				dark: [
					item.theme.styled.dark.palette.bfscompany.primary,
					item.theme.styled.dark.palette.bfscompany.secondary,
					item.theme.styled.dark.palette.bfscompany.tertiary,
				],
				light: [
					item.theme.styled.light.palette.bfscompany.primary,
					item.theme.styled.light.palette.bfscompany.secondary,
					item.theme.styled.light.palette.bfscompany.tertiary,
				],
			}

			return (
				<Box
					key={item.id}
					m={3}
					style={{
						flex: 1,
					}}
					py={'$4'}
					px={'$2'}
					rounded={'$md'}
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
						<VStack flexDirection={'row'} flexWrap={'wrap'} justifyContent='space-around' space={'md'}>
							{rThemeVar.colorScheme === 'light' ? (
								<>
									{bfs.light.map((item, index) => {
										return (
											<Box
												key={index}
												alignSelf={'center'}
												style={{
													backgroundColor: item,
													width: 25,
													height: 25,
												}}
												m={'$2'}
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
													width: 40,
													height: 40,
												}}
												m={'$2'}
											/>
										)
									})}
								</>
							)}
						</VStack>

						<Divider my={'$3'} />
						<VStack flexDirection={'row'} flexWrap={'wrap'} justifyContent='space-around' space={'$md'}>
							{rThemeVar.colorScheme === 'light' ? (
								<>
									{company.light.map((item, index) => {
										return (
											<Box
												key={index}
												alignSelf={'center'}
												style={{
													backgroundColor: item,
													width: 40,
													height: 40,
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
						</VStack>
						<Heading
							mt={'$4'}
							fontWeight={'$bold'}
							textTransform={'capitalize'}
							textAlign={'center'}
							fontSize={'$xl'}
						>
							{item.name}
						</Heading>
					</Pressable>
				</Box>
			)
		},
		[rThemeVar.colorScheme],
	)

	if (GATLoading || !GATData?.getAllThemes) return null

	const setTheme = async ({ colorScheme }: { colorScheme: 'light' | 'dark' | 'system' }) => {
		toggleTheme({ colorScheme })
	}

	return (
		<FlashList
			estimatedItemSize={30}
			data={GATData.getAllThemes}
			keyExtractor={(item, index) => index.toString()}
			numColumns={2}
			renderItem={renderItem}
			ListHeaderComponent={() => {
				return (
					<HStack px={'$2'} py={'$4'} w={'$full'} space={'lg'} justifyContent={'space-around'}>
						<Button
							onPress={async () => {
								await setTheme({ colorScheme: 'light' })
							}}
							bg={'$light50'}
							flex={1}
							borderColor={rThemeVar.localStorageColorScheme === 'light' ? '$primary300' : 'transparent'}
							borderWidth={2}
						>
							<Text color={'$black'}>Light</Text>
						</Button>
						<Button
							onPress={async () => {
								await setTheme({ colorScheme: 'dark' })
							}}
							bg={'$dark100'}
							flex={1}
							borderColor={rThemeVar.localStorageColorScheme === 'dark' ? '$primary300' : 'transparent'}
							borderWidth={'$2'}
						>
							<Text color={'$white'}>Dark</Text>
						</Button>
						<Button
							onPress={async () => {
								await setTheme({ colorScheme: 'system' })
							}}
							bg={colorScheme === 'light' ? '$light100' : '$dark100'}
							flex={1}
							borderColor={rThemeVar.localStorageColorScheme === 'system' ? '$primary300' : 'transparent'}
							borderWidth={'$2'}
						>
							<Text color={colorScheme === 'light' ? '$black' : '$white'}>System</Text>
						</Button>
					</HStack>
				)
			}}
		/>
	)
}
