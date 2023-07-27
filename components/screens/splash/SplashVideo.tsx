import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av'
import { useRef, useState } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'

export function SplashVideo({ onLoaded, onFinish }) {
	const video = useRef(null)
	const [lastStatus, setStatus] = useState<AVPlaybackStatus>({})
	const { width } = useWindowDimensions()
	const isTablet = width >= 768
	return (
		<Video
			ref={video}
			style={StyleSheet.absoluteFill}
			source={isTablet ? require('./assets/splash-tablet.mp4') : require('./assets/splash.mp4')}
			shouldPlay={!(lastStatus.isLoaded && lastStatus.didJustFinish)}
			isLooping={false}
			resizeMode={ResizeMode.COVER}
			onPlaybackStatusUpdate={status => {
				if (status.isLoaded) {
					if (lastStatus.isLoaded !== status.isLoaded) {
						onLoaded()
					}
					if (status.didJustFinish) {
						onFinish()
					}
				}
				setStatus(() => status)
			}}
		/>
	)
}
