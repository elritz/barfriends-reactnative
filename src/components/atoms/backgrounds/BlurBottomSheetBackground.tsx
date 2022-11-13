import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { StyleSheet, ViewStyle } from 'react-native'

type BottomSheetBackgroundProps = {
	style?: ViewStyle
}

const BlurBottomSheetBackground = ({ style }: BottomSheetBackgroundProps) => {
	const colorScheme = useThemeColorScheme()
	return <BlurView style={[StyleSheet.absoluteFill, style]} tint={colorScheme} intensity={100} />
}

export default BlurBottomSheetBackground
