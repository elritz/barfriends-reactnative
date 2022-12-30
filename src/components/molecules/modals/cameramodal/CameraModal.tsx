import { useReactiveVar } from '@apollo/client'
import { useQrAddFriendMutation } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Camera, CameraType } from 'expo-camera'
import { Box, Button, Center, Modal, Text, useDisclose } from 'native-base'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

const LOGO_COASTER = require('../../../../assets/images/company/company_coaster.png')

const CameraModal = ({ isOpen, onOpen, onClose }) => {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [hasPermission, setHasPermission] = useState(null)
	const [scanned, setScanned] = useState(false)

	useEffect(() => {
		const getBarCodeScannerPermissions = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync()
			setHasPermission(status === 'granted')
		}

		getBarCodeScannerPermissions()
	}, [])

	const [QRAddFriendMutation, { data, loading, error }] = useQrAddFriendMutation()

	const handleBarCodeScanned = ({ type, data }) => {
		QRAddFriendMutation({
			variables: {
				qrCodeProfileId: data.profileId,
			},
		})

		setScanned(true)
		// alert(`Bar code with type ${type} and data ${data} has been scanned!`)
	}

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>
	}
	return (
		<Center>
			<Modal isOpen={isOpen} onClose={onClose}>
				<Modal.Content h={'70%'} w={'95%'}>
					<Modal.CloseButton />
					<BarCodeScanner
						onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
						style={StyleSheet.absoluteFillObject}
					/>
					<Box h={'100%'} alignItems={'center'} justifyContent={'flex-end'} pb={10}>
						<Box p={3} borderRadius={'lg'} bg={'dark.50'}>
							<QRCode
								size={100}
								value={JSON.stringify({ profileid: rAuthorizationVar?.DeviceProfile?.Profile?.id })}
								backgroundColor='transparent'
								color={'#ff7000'}
								logo={LOGO_COASTER}
								logoSize={40}
								logoBackgroundColor='transparent'
							/>
						</Box>
					</Box>
					{/* </Camera> */}
					<Modal.Footer>
						<Button variant='unstyled' mr='1' onPress={onClose}>
							Cancel
						</Button>
						<Button colorScheme='error' onPress={onClose}>
							Delete
						</Button>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
		</Center>
	)
}

export default CameraModal
