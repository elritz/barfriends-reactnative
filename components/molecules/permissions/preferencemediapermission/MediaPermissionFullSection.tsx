import { useReactiveVar } from '@apollo/client'
import { PermissionMediaReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { uniqueId } from 'lodash'
import { AnimatePresence, MotiView } from 'moti'
import { Box, Button, Heading, Text } from 'native-base'

export default function MediaPermissionFullSection() {
	const router = useRouter()
	const rPermissionMediaVar = useReactiveVar(PermissionMediaReactiveVar)

	return (
		<AnimatePresence key={uniqueId()}>
			{!rPermissionMediaVar?.granted && (
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
						<Button
							onPress={() =>
								router.push({
									pathname: '(app)/permission/medialibrary',
								})
							}
							size={'sm'}
							mt={4}
							w={'85%'}
							_text={{
								fontWeight: 'bold',
								fontSize: 'sm',
							}}
						>
							Use Current Location
						</Button>
					</Box>
				</MotiView>
			)}
		</AnimatePresence>
	)
}
