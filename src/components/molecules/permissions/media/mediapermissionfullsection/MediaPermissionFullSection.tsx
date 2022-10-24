import PermissionButton from './PermissionButton'
import { useReactiveVar } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { PermissionMediaReactiveVar } from '@reactive'
import { AnimatePresence, MotiView } from 'moti'
import { Box, Heading, Text } from 'native-base'

export default function MediaPermissionFullSection() {
	const navigation = useNavigation()
	const rPermissionMediaVar = useReactiveVar(PermissionMediaReactiveVar)

	return (
		<AnimatePresence>
			{!rPermissionMediaVar.granted && (
				<MotiView
					from={{
						opacity: 0,
						scale: 0.9,
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
							Media Permission
						</Heading>
						<Text fontSize={'lg'} style={{ width: '100%' }}>
							Using your photos on your device.
						</Text>
						<PermissionButton
							onPress={() =>
								navigation.navigate('PermissionNavigator', {
									screen: 'MediaLibraryPermissionScreen',
								})
							}
						/>
					</Box>
				</MotiView>
			)}
		</AnimatePresence>
	)
}
