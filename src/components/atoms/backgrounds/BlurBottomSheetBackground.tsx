import { useReactiveVar } from '@apollo/client'
import { ThemeReactiveVar } from '@reactive'
import { BlurView } from 'expo-blur'
import React from 'react'
import { StyleSheet, ViewStyle } from 'react-native'

type BottomSheetBackgroundProps = {
	style?: ViewStyle
}

const BlurBottomSheetBackground = ({ style }: BottomSheetBackgroundProps) => {
	const theme = useReactiveVar(ThemeReactiveVar)
	return (
		<BlurView
			style={[StyleSheet.absoluteFill, style]}
			tint={theme === 'dark' ? 'dark' : 'light'}
			intensity={100}
		/>
	)
}

export default BlurBottomSheetBackground
