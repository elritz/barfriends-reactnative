import { useReactiveVar } from '@apollo/client'
import { Box, Heading, Pressable, Text } from '@components/core'
import Photos from '@components/screens/tonight/photos'
import { Emojimood, useEmojimoodsQuery } from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { watch } from 'fs'
import { Controller, useForm } from 'react-hook-form'
import { Image, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type FormType = {
	emojimood: Emojimood
}

export default () => {
	const ITEM_WIDTH = 70
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const insets = useSafeAreaInsets()
	const { data, loading, error } = useEmojimoodsQuery({})

	const {
		control,
		handleSubmit,
		setValue,
		getValues,
		reset,
		setError,
		watch,
		formState: { errors },
	} = useForm<FormType>({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			emojimood: {
				id: '',
				emojiname: '',
				colors: [''],
				emoji: '',
			},
		},
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	if (loading) {
		return <Heading>EmojiMoods</Heading>
	}

	console.log('watch', watch('emojimood'))
	return (
		<LinearGradient colors={watch('emojimood.colors') || ['']}>
			<Box
				bg='$transparent'
				style={{
					height: '100%',
					width: '100%',
					alignItems: 'center',
					justifyContent: 'flex-start',
					alignSelf: 'center',
				}}
			>
				<Box
					bg='$transparent'
					style={{
						position: 'absolute',
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
					}}
				>
					<Controller
						name='emojimood'
						control={control}
						render={({ field: { value, onChange, onBlur } }) => (
							<FlashList
								data={data?.emojimoods}
								estimatedItemSize={50}
								numColumns={3}
								contentContainerStyle={{}}
								contentInset={{
									top: insets.top + 400 + 10,
									bottom: insets.bottom,
								}}
								ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
								renderItem={({ index, item }) => {
									return (
										<Pressable
											bg='$transparent'
											alignItems='center'
											alignSelf={'center'}
											flex={1}
											onPress={() => setValue('emojimood', item)}
										>
											<LinearGradient
												style={{
													borderRadius: ITEM_WIDTH / 2,
													height: ITEM_WIDTH,
													width: ITEM_WIDTH,
													alignItems: 'center',
													justifyContent: 'center',
													alignSelf: 'center',
												}}
												colors={item.colors.length ? [...item.colors] : ['#ff7000', '#567000']}
											>
												<Text>{item.emoji}</Text>
											</LinearGradient>
											<BlurView
												tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
												intensity={70}
												style={{
													overflow: 'hidden',
													borderRadius: 15,
													marginTop: 5,
													paddingHorizontal: 10,
													paddingVertical: 5,
												}}
											>
												<Text>{item.emojiname}</Text>
											</BlurView>
										</Pressable>
									)
								}}
							/>
						)}
					/>
				</Box>
				<View style={{ marginTop: insets.top }}>
					<Photos />
				</View>
			</Box>
		</LinearGradient>
	)
}
