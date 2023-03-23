import SearchAreaInput from '@components/molecules/search/searcharea/SearchAreaInput'
import SearchAreaInputDisabled from '@components/molecules/search/searcharea/SearchAreaInputDisabled'
import { PlaceType } from '@preferences'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { Stack, useRouter } from 'expo-router'
import { Box, Icon, VStack } from 'native-base'
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

	const methods = useForm<Form>({
		defaultValues: {
			country: {
				name: '',
				isoCode: '',
				coords: {
					latitude: 0,
					longitude: 0,
				},
			},
			state: {
				name: '',
				isoCode: '',
				coords: {
					latitude: 0,
					longitude: 0,
				},
			},
			city: {
				name: '',
				isoCode: '',
				coords: {
					latitude: 0,
					longitude: 0,
				},
			},
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
						header: () => {
							return (
								<VStack justifyContent={'flex-end'} safeAreaTop pb={2}>
									{Platform.OS === 'ios' ? (
										<BlurView style={StyleSheet.absoluteFill} tint={colorScheme} intensity={80} />
									) : (
										<Box
											_light={{ bg: 'light.50' }}
											_dark={{ bg: 'dark.50' }}
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
					options={{
						animation: 'fade',
						headerTransparent: true,
						header: () => {
							return (
								<VStack justifyContent={'flex-end'} safeAreaTop pb={2}>
									{Platform.OS === 'ios' ? (
										<BlurView style={StyleSheet.absoluteFill} tint={colorScheme} intensity={80} />
									) : (
										<Box
											_light={{ bg: 'light.50' }}
											_dark={{ bg: 'dark.50' }}
											style={[StyleSheet.absoluteFill]}
										/>
									)}
									<SearchAreaInput placeholder='Search country' />
								</VStack>
							)
						},
					}}
					name={'searchcountry'}
				/>
				<Stack.Screen
					name={'searchcountrystate'}
					options={{
						animation: 'fade',
						headerTransparent: true,
						header: () => {
							return (
								<VStack justifyContent={'flex-end'} safeAreaTop pb={2}>
									{Platform.OS === 'ios' ? (
										<BlurView style={StyleSheet.absoluteFill} tint={colorScheme} intensity={80} />
									) : (
										<Box
											_light={{ bg: 'light.50' }}
											_dark={{ bg: 'dark.50' }}
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
						header: () => {
							return (
								<VStack safeAreaTop justifyContent={'flex-end'} pb={2}>
									{Platform.OS === 'ios' ? (
										<BlurView style={StyleSheet.absoluteFill} tint={colorScheme} intensity={80} />
									) : (
										<Box
											_light={{ bg: 'light.50' }}
											_dark={{ bg: 'dark.50' }}
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
