import ControlledInput, { TextInputProps } from './ControlledInput'
import { useFormContext } from 'react-hook-form'

const SearchAreaCountryTextScreenInput = (props: TextInputProps) => {
	const { label, name, rules, defaultValue, ...inputProps } = props

	const formContext = useFormContext()

	if (!formContext || !name) {
		const msg = !formContext
			? 'TextInput must be wrapped by the FormProvider'
			: 'Name must be defined'
		console.error(msg)
		return null
	}

	return <ControlledInput {...props} />
}

export default SearchAreaCountryTextScreenInput
