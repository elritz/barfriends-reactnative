import PermissionButton from './PermissionButton'
import { useReactiveVar } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { BackgroundLocationPermissionReactiveVar } from '@reactive'
import { AnimatePresence, MotiView } from 'moti'
import { Box, Heading, Text } from 'native-base'
import styled from 'styled-components/native'

export default function BackgroundLocationPermissionFullSection() {
	const navigation = useNavigation()
	const rBackgroundPermissionLocationVar = useReactiveVar(BackgroundLocationPermissionReactiveVar)

	return (
		<AnimatePresence>
			{!rBackgroundPermissionLocationVar.granted && (
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
							Enable more features
						</Heading>
						<Text fontSize={'lg'} style={{ width: '100%' }}>
							Change location permission to "always allow". Enhance your nightlife experience by finding
							deals and venues near you.
						</Text>
						<PermissionButton
							onPress={() =>
								navigation.navigate('PermissionNavigator', {
									screen: 'BackgroundLocationPermissionScreen',
								})
							}
						/>
					</Box>
				</MotiView>
			)}
		</AnimatePresence>
	)
}
