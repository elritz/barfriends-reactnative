import { useReactiveVar } from '@apollo/client'
import { BottomSheetBackgroundProps, useBottomSheet } from '@gorhom/bottom-sheet'
import { ThemeReactiveVar } from '@reactive'
import React, { useContext, useEffect, useMemo } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import Animated, { useAnimatedStyle, interpolateColor } from 'react-native-reanimated'
import { ThemeContext } from 'styled-components/native'

const FadeBottomSheetBackground = ({ style, animatedIndex }: BottomSheetBackgroundProps) => {
	const themeContext = useContext(ThemeContext)
	const bottomSheet = useBottomSheet()
	const theme = useReactiveVar(ThemeReactiveVar)

	const containerAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			bottomSheet.animatedIndex.value,
			[0, 1],
			[themeContext.palette.secondary.background, themeContext.palette.primary.background],
		),
	}))

	const containerStyle = useMemo(
		() => [style, containerAnimatedStyle],
		[style, containerAnimatedStyle],
	)

	useEffect(() => { }, [theme])

	return (
		<Animated.View
			pointerEvents='none'
			style={{
				borderTopLeftRadius: 20,
				borderTopRightRadius: 20,
				backgroundColor: '#fff',
				shadowColor: theme === 'light' ? '#00000040' : '#ffffff40',
				shadowOffset: {
					width: 0,
					height: -2,
				},
				shadowOpacity: 0.35,
				shadowRadius: 14.78,
				elevation: 4,
			}}
		/>
	)
}

export default FadeBottomSheetBackground
