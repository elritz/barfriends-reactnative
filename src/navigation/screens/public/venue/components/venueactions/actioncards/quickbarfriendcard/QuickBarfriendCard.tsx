import { Box, Heading } from 'native-base'
import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { ThemeContext } from 'styled-components/native'

export default function QuickBarfriendCard() {
	const themeContext = useContext(ThemeContext)
	return (
		<Box flexDirection={'column'} justifyContent={'space-around'}>
			<Heading
				numberOfLines={2}
				adjustsFontSizeToFit
				color={'primary.600'}
				size={'md'}
				textTransform={'uppercase'}
				fontWeight={'black'}
				lineHeight={'xs'}
				textAlign={'center'}
			>
				Quick Barfriend
			</Heading>
			<View
				style={{
					height: 60,
					width: 60,
					backgroundColor: 'black',
					borderRadius: 30,
					alignSelf: 'center',
					marginBottom: 20,
				}}
			/>
		</Box>
	)
}
