import { useReactiveVar } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { PermissionForegroundLocationReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { uniqueId } from 'lodash'
import { AnimatePresence, MotiView } from 'moti'
import { Box, Button, Heading, Text } from 'native-base'

export default function ForegroundLocationPermissionFullSection() {
	const router = useRouter()
	const navigation = useNavigation()
	const rPermissionLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)

	return (
		<Box key={uniqueId()}>
			{!rPermissionLocationVar?.granted && (
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
						<Button
							onPress={() =>
								router.push({
									pathname: '(app)/permissionnavigator/foregroundlocation',
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
		</Box>
	)
}
