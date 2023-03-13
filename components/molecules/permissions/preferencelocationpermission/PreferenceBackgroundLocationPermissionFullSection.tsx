import { useReactiveVar } from '@apollo/client'
import BackgroundLocationNextAskModal from '@components/molecules/modals/asks/backgroundlocationnextaskmodal'
import { EvilIcons } from '@expo/vector-icons'
import {
	PermissionBackgroundLocationReactiveVar,
	PreferenceBackgroundLocationPermissionReactiveVar,
} from '@reactive'
import { useRouter } from 'expo-router'
import { uniqueId } from 'lodash'
import { DateTime } from 'luxon'
import { MotiView } from 'moti'
import { Box, Button, Divider, Heading, HStack, Icon, Text, useDisclose, VStack } from 'native-base'

export default function PreferenceBackgroundLocationPermissionFullSection() {
	const router = useRouter()
	const { isOpen, onOpen, onClose } = useDisclose()
	const rBackgroundPermissionLocationVar = useReactiveVar(PermissionBackgroundLocationReactiveVar)
	const rPreferenceBackgroundLocationPermission = useReactiveVar(
		PreferenceBackgroundLocationPermissionReactiveVar,
	)

	return (
		<>
			<BackgroundLocationNextAskModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
			{rPreferenceBackgroundLocationPermission?.canShowAgain &&
			DateTime.fromISO(rPreferenceBackgroundLocationPermission?.dateToShowAgain) <= DateTime.now() ? (
				<Box key={uniqueId()}>
					<Divider />
					{!rBackgroundPermissionLocationVar?.granted && (
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
							<VStack my={3} space={1} alignItems={'center'}>
								<HStack w={'95%'} justifyContent={'flex-end'}>
									<Icon onPress={onOpen} as={EvilIcons} size={'md'} name={'close'} />
								</HStack>
								<Heading
									size={'md'}
									textAlign={'center'}
									style={{
										width: '100%',
									}}
								>
									Enable More Features
								</Heading>
								<Text textAlign={'center'} fontSize={'md'} style={{ width: '90%' }}>
									Turn on "always allow" and find better deals at venues, be notified when you can join, and
									when friends near you are going out.
								</Text>
								<Button
									onPress={() =>
										router.push({
											pathname: '(app)/permissionnavigator/bakgroundlocation',
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
									Use "always allow"
								</Button>
								<Button
									w={'90%'}
									variant={'unstyled'}
									_text={{
										color: 'primary.500',
										fontWeight: 'bold',
									}}
									onPress={() => {
										console.log('Set it so in the future it knows to show agains')
									}}
								>
									Not now
								</Button>
							</VStack>
						</MotiView>
					)}
					<Divider />
				</Box>
			) : null}
		</>
	)
}
