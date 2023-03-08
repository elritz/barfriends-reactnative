import { useNavigation } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import { Pressable } from 'native-base'
import * as React from 'react'

interface ButtonProps {
	children: React.ReactNode
	height?: string
	width?: string
}

const GoBack: React.FC<ButtonProps> = (props: ButtonProps) => {
	const rotuer = useRouter()
	GoBack.defaultProps = {
		width: '100%',
		height: '100%',
	}

	const handleOnPress = () => {
		rotuer.back()
	}

	const { width, height, children } = props
	return (
		<Pressable
			width={width || '100%'}
			height={height || '100%'}
			alignItems={'center'}
			justifyContent={'center'}
			onPress={() => handleOnPress()}
		>
			{children}
		</Pressable>
	)
}

export default GoBack
