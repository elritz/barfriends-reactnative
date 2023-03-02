import ExcludedCountries from '../../../constants/Countries'
import { useReactiveVar } from '@apollo/client'
import { ThemeReactiveVar } from '@reactive'
import React from 'react'
import CountryPicker, {
	CountryCode,
	DARK_THEME,
	DEFAULT_THEME,
} from 'react-native-country-picker-modal'

type prop = {
	cca2: string
	callingCode: string
}

type CountryPickerProps = {
	onSelect: (country: string) => void
	countryCode: string
}

const ComponentCountryPicker = ({ countryCode, onSelect }: CountryPickerProps) => {
	const theme = useReactiveVar(ThemeReactiveVar)
	const [withCountryNameButton] = React.useState(false)
	const [withFlag, setWithFlag] = React.useState(true)
	const [withEmoji, setWithEmoji] = React.useState(true)
	const [withFilter, setWithFilter] = React.useState(true)
	const [withAlphaFilter, setWithAlphaFilter] = React.useState(false)
	const [withCallingCode, setWithCallingCode] = React.useState(true)
	const [excludeCountries, setExcludeCountries] = React.useState(ExcludedCountries)
	const [preferredCountries, setPreferredCountries] = React.useState(['CA', 'MX', 'US'])

	return (
		<CountryPicker
			theme={theme.colorScheme === 'dark' ? DARK_THEME : DEFAULT_THEME}
			{...{
				countryCode,
				withFilter,
				withFlag,
				withCountryNameButton,
				withAlphaFilter,
				withCallingCode,
				withEmoji,
				onSelect,
				preferredCountries,
				excludeCountries,
			}}
		/>
	)
}
export default ComponentCountryPicker
