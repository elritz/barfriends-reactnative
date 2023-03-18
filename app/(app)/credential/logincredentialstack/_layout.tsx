import LogoTransparent from '@assets/images/company/LogoTransparent'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { Stack } from 'expo-router'
import { useColorMode, useTheme } from 'native-base'

export default function _layout() {
	const theme = useTheme()
	const colorScheme = useColorMode()
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor:
						colorScheme.colorMode === 'light' ? theme.colors.light[50] : theme.colors.dark[50],
				},
				headerTitle: () => <LogoTransparent height={30} width={192} />,
				headerLeft: () => <ChevronBackArrow />,
			}}
		/>
	)
}
