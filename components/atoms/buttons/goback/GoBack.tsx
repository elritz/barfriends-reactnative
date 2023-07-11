import { Pressable } from '@components/core'
import { useRouter } from 'expo-router'
import * as React from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

interface ButtonProps {
	children: React.ReactNode
	height: number
	width?: number
}

const GoBack: React.FC<ButtonProps> = (props: ButtonProps) => {
	const rotuer = useRouter()

	GoBack.defaultProps = {
		width: 40,
		height: wp(15),
	}

	const handleOnPress = () => {
		rotuer.back()
	}

	const { width, height, children } = props

	return (
		<Pressable
			style={{
				// backgroundColor: 'red',
				flex: 1,
				maxWidth: width,
				height,
				alignItems: 'center',
				justifyContent: 'center',
			}}
			onPress={() => handleOnPress()}
		>
			{children}
		</Pressable>
	)
}

export default GoBack
