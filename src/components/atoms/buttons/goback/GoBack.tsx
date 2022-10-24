import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import styled from 'styled-components/native'

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
		<OuterView width={width} height={height} onPress={() => handleOnPress()}>
			{children}
		</OuterView>
	)
}

export default GoBack

const OuterView = styled.Pressable<ButtonProps>`
	height: ${props => (props.height ? props.height : '100%')};
	width: ${props => (props.width ? props.width : '100%')};
	align-items: center;
	justify-content: center;
`
