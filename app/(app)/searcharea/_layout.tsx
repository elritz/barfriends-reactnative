import { useReactiveVar } from '@apollo/client'
import SearchAreaInput from '@components/molecules/search/searcharea/SearchAreaInput'
import SearchAreaInputDisabled from '@components/molecules/search/searcharea/SearchAreaInputDisabled'
import { PlaceType } from '@preferences'
import { SearchAreaReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { Stack, useRouter } from 'expo-router'
import { Box, Icon, VStack, useTheme } from 'native-base'
import { FormProvider, useForm } from 'react-hook-form'
import { Platform, StyleSheet } from 'react-native'

export type HorizontalCityItemProps = {
	countryCode: string
	latitude: string
	longitude: string
	name: string
	stateCode: string
}
export type HorizontalStateItemProps = {
	countryCode: string
	isoCode: string
	latitude: string
	longitude: string
	name: string
}

export type HorizontalCountryItemProps = {
	currency: string
	flag?: string
	isoCode: string
	latitude: string
	longitude: string
	name: string
	phonecode: string
	timezones: Timezone[]
}

type Timezone = {
	abbreviation: string
	gmtOffset: string
	gmtOffsetName: string
	tzName: string
	zoneName: string
}

export type Form = {
	country: PlaceType
	state: PlaceType
	city: PlaceType
	done: boolean
}

export default function _layout() {
	const router = useRouter()
	const colorScheme = useThemeColorScheme()
	const theme = useTheme()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)

	const methods = useForm<Form>({
		defaultValues: {
			...rSearchAreaVar.searchArea,
			done: false,
		},
	})

	return (
		<FormProvider {...methods}>
			<Stack
				screenOptions={{
					headerShown: true,
				}}
			>
				<Stack.Screen
					name={'index'}
					options={{
						contentStyle: {
							backgroundColor: colorScheme === 'dark' ? theme.colors.dark[100] : theme.colors.light[200],
						},
						header: () => {
							return (
								<VStack justifyContent={'flex-end'} safeAreaTop pb={3}>
									{Platform.OS === 'ios' ? (
										<BlurView style={StyleSheet.absoluteFill} tint={colorScheme} intensity={80} />
									) : (
										<Box
											_light={{ bg: 'light.100' }}
											_dark={{ bg: 'dark.100' }}
											style={[StyleSheet.absoluteFill]}
											flexDirection={'row'}
										/>
									)}
									<SearchAreaInputDisabled
										onPress={() =>
											router.push({
												pathname: '(app)/searcharea/searchcountry',
											})
										}
									/>
								</VStack>
							)
						},
					}}
				/>
				<Stack.Screen
					name={'searchcountry'}
					options={{
						animation: 'fade',
						contentStyle: {
							backgroundColor: colorScheme === 'dark' ? theme.colors.dark[100] : theme.colors.light[200],
						},
						headerTransparent: true,
						header: () => {
							return (
								<VStack justifyContent={'flex-end'} safeAreaTop pb={3}>
									{Platform.OS === 'ios' ? (
										<BlurView style={StyleSheet.absoluteFill} tint={colorScheme} intensity={80} />
									) : (
										<Box
											_light={{ bg: 'light.100' }}
											_dark={{ bg: 'dark.100' }}
											style={[StyleSheet.absoluteFill]}
										/>
									)}
									<SearchAreaInput placeholder='Search country' />
								</VStack>
							)
						},
					}}
				/>
				<Stack.Screen
					name={'searchcountrystate'}
					options={{
						animation: 'fade',
						contentStyle: {
							backgroundColor: colorScheme === 'dark' ? theme.colors.dark[100] : theme.colors.light[200],
						},
						headerTransparent: true,
						header: () => {
							return (
								<VStack justifyContent={'flex-end'} safeAreaTop pb={3}>
									{Platform.OS === 'ios' ? (
										<BlurView style={StyleSheet.absoluteFill} tint={colorScheme} intensity={80} />
									) : (
										<Box
											_light={{ bg: 'light.100' }}
											_dark={{ bg: 'dark.100' }}
											style={[StyleSheet.absoluteFill]}
										/>
									)}
									<SearchAreaInput placeholder='Search states' />
								</VStack>
							)
						},
					}}
				/>
				<Stack.Screen
					name={'searchstatecities'}
					options={{
						animation: 'fade',
						headerTransparent: true,
						contentStyle: {
							backgroundColor: colorScheme === 'dark' ? theme.colors.dark[100] : theme.colors.light[200],
						},
						header: () => {
							return (
								<VStack justifyContent={'flex-end'} safeAreaTop pb={3}>
									{Platform.OS === 'ios' ? (
										<BlurView style={StyleSheet.absoluteFill} tint={colorScheme} intensity={80} />
									) : (
										<Box
											_light={{ bg: 'light.100' }}
											_dark={{ bg: 'dark.100' }}
											style={[StyleSheet.absoluteFill]}
										/>
									)}
									<SearchAreaInput placeholder='Search cities' />
								</VStack>
							)
						},
					}}
				/>
			</Stack>
		</FormProvider>
	)
}
