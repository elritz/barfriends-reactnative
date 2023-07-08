import { Pressable } from '@components/core'
import { useRouter } from 'expo-router'
import * as React from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

interface ButtonProps {
	children: React.ReactNode
	height: number
	width: number
}

const GoBack: React.FC<ButtonProps> = (props: ButtonProps) => {
	const rotuer = useRouter()
	GoBack.defaultProps = {
		width: wp(10),
		height: wp(10),
	}

	const handleOnPress = () => {
		rotuer.back()
	}

	const { width, height, children } = props

	return (
		<Pressable
			style={{
				width,
				height,
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: 50,
			}}
			onPress={() => handleOnPress()}
		>
			{children}
		</Pressable>
	)
}

export default GoBack
