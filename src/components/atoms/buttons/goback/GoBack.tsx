import { useNavigation } from '@react-navigation/native'
import { Pressable } from 'native-base'
import * as React from 'react'

interface ButtonProps {
	children: React.ReactNode
	height?: string
	width?: string
}

const GoBack: React.FC<ButtonProps> = (props: ButtonProps) => {
	GoBack.defaultProps = {
		width: '100%',
		height: '100%',
	}

	const navigation = useNavigation()
	const handleOnPress = () => {
		navigation.goBack()
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
