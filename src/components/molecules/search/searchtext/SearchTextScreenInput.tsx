import { Ionicons } from '@expo/vector-icons'
import {
	CommonActions,
	RouteProp,
	StackActions,
	useNavigation,
	useRoute,
} from '@react-navigation/native'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Box, Button, HStack, Icon, IconButton, Input, Text } from 'native-base'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ExploreFilterTabParamList } from 'src/types/app'

export type SearchTextScreenRouteProp = RouteProp<ExploreFilterTabParamList, 'SearchTextScreen'>
// TODO: UX() get the navigation route here as well default values from form
const SearchTextScreenInput = () => {
	const navigation = useNavigation()
	const route = useRoute<SearchTextScreenRouteProp>()
	const colorScheme = useThemeColorScheme()

	const {
		control,
		setError,
		clearErrors,
		setValue,
		getValues,
		handleSubmit,
		formState: { errors },
		watch,
		setFocus,
	} = useForm({
		defaultValues: {
			searchText: route.params?.searchText || '',
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const handleSearchSubmitEditting = item => {
		navigation.dispatch(StackActions.pop())
		const values = getValues()
		navigation.dispatch(
			StackActions.push('HomeTabNavigator', {
				screen: 'ExploreStack',
				params: {
					screen: 'SearchResultTabStack',
					params: {
						screen: 'TopScreen',
						params: {
							searchText: values.searchText,
						},
					},
				},
			}),
		)
	}

	const changeSearchText = (text: string) => {
		setValue('searchText', text)
		navigation.dispatch(CommonActions.setParams({ searchText: text }))
	}

	const clearSearchInput = () => {
		setValue('searchText', '')
		navigation.dispatch(CommonActions.setParams({ searchText: '' }))
	}

	return (
		<Box>
			<Controller
				control={control}
				name='searchText'
				render={({ field: { value, onChange } }) => (
					<Input
						variant={'filled'}
						rounded={'lg'}
						mx={2}
						py={4}
						keyboardAppearance={colorScheme}
						_input={{
							fontSize: 'lg',
						}}
						placeholder='Search'
						autoFocus
						value={value}
						onChangeText={text => changeSearchText(text)}
						returnKeyType='search'
						underlineColorAndroid='transparent'
						onSubmitEditing={handleSearchSubmitEditting}
						onPressIn={() => {
							navigation.dispatch(
								StackActions.push('HomeTabNavigator', {
									screen: 'ExploreStack',
									params: {
										screen: 'SearchTextScreen',
									},
								}),
							)
						}}
						leftElement={<Icon as={Ionicons} name='ios-search' size={'lg'} ml={2} />}
						rightElement={
							<HStack alignItems={'center'}>
								<IconButton
									variant={'ghost'}
									_hover={{
										bg: 'transparent',
									}}
									_focus={{
										bg: 'transparent',
									}}
									icon={<Icon as={Ionicons} name='close-circle' size={'lg'} onPress={clearSearchInput} />}
									isDisabled={!value.length}
								/>
								<Button
									onPress={() => {
										clearSearchInput()
										navigation.dispatch(StackActions.pop(1))
									}}
									variant={'ghost'}
								>
									<Text>Cancel</Text>
								</Button>
							</HStack>
						}
					/>
				)}
			/>
		</Box>
	)
}

export default SearchTextScreenInput
