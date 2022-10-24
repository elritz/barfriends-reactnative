import PermissionButton from './PermissionButton'
import { useReactiveVar } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { ForegroundLocationPermissionReactiveVar } from '@reactive'
import { AnimatePresence, MotiView } from 'moti'
import { Box, Heading, Text } from 'native-base'
import styled from 'styled-components/native'

export default function ForegroundLocationPermissionFullSection() {
	const navigation = useNavigation()
	const rPermissionLocationVar = useReactiveVar(ForegroundLocationPermissionReactiveVar)

	return (
		<AnimatePresence>
			{!rPermissionLocationVar.granted && (
				<MotiView
					from={{
						opacity: 0,
						scale: 1,
					}}
					animate={{
						opacity: 1,
						scale: 1,
					}}
					exit={{
						opacity: 0,
						scale: 0.9,
					}}
				>
					<Box
						style={{
							width: '100%',
							alignItems: 'center',
						}}
					>
						<Heading
							size={'lg'}
							style={{
								width: '100%',
								marginVertical: 10,
							}}
						>
							Location Permission
						</Heading>
						<Text fontSize={'lg'} style={{ width: '100%' }}>
							Using your current location will automatically show you what's near you.
						</Text>
						<PermissionButton
							onPress={() =>
								navigation.navigate('PermissionNavigator', {
									screen: 'ForegroundLocationPermissionScreen',
								})
							}
						/>
					</Box>
				</MotiView>
			)}
		</AnimatePresence>
	)
}
