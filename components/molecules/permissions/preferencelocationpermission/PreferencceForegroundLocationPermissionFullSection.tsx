import { useReactiveVar } from '@apollo/client'
import ForegroundLocationNextAskModal from '@components/molecules/modals/asks/foregroundlocationnextaskmodal'
import {
	PermissionForegroundLocationReactiveVar,
	PreferenceForegroundLocationPermissionReactiveVar,
} from '@reactive'
import { useRouter } from 'expo-router'
import { uniqueId } from 'lodash'
import { DateTime } from 'luxon'
import { MotiView } from 'moti'
import { Box, Button, Heading, Text, useDisclose } from 'native-base'

export default function ForegroundLocationPermissionFullSection() {
	const router = useRouter()
	const { isOpen, onOpen, onClose } = useDisclose()
	const rPermissionLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)
	const rPreferenceForegroundLocationPermission = useReactiveVar(
		PreferenceForegroundLocationPermissionReactiveVar,
	)
	return (
		<>
			<ForegroundLocationNextAskModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
			{rPreferenceForegroundLocationPermission?.canShowAgain &&
			DateTime.fromISO(rPreferenceForegroundLocationPermission?.dateToShowAgain) <= DateTime.now() ? (
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
									Using your current location will automatically show you what's near you based on where you
									are.
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
			) : null}
		</>
	)
}
