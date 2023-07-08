import { Box, Text } from '@components/core'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'

export default () => {
	const [toggleThemes] = useToggleTheme()

	return (
		<Box flex={1}>
			<Text fontSize={'$5xl'}>SECURITY</Text>
		</Box>
	)
}
