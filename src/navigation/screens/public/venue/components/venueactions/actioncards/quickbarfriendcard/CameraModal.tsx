import { useReactiveVar } from '@apollo/client'
import { AuthorizationReactiveVar } from '@reactive'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Camera, CameraType } from 'expo-camera'
import { Box, Button, Center, Modal, Text, useDisclose } from 'native-base'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

export const CameraModal = ({ isOpen, onOpen, onClose }) => {
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

	const handleBarCodeScanned = ({ type, data }) => {
		console.log('🚀 ----------------------------------------------------------------🚀')
		console.log('🚀 ~ file: CameraModal.tsx:25 ~ handleBarCodeScanned ~ data', data)
		console.log('🚀 ----------------------------------------------------------------🚀')

		setScanned(true)
		alert(`Bar code with type ${type} and data ${data} has been scanned!`)
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
					{/* <Camera
						style={styles.camera}
						type={CameraType.back}
						onBarCodeScanned={scanningResult => {
							console.log('SCANNED')
						}}
					> */}
					<Box h={'100%'} alignItems={'center'} justifyContent={'flex-end'} pb={10}>
						<Box p={3} borderRadius={'lg'} bg={'dark.50'}>
							<QRCode
								size={100}
								value={rAuthorizationVar?.DeviceProfile?.Profile?.id}
								backgroundColor='transparent'
								color={'#ff7000'}
								logo={require('../../../../../../../../assets/images/company/company_coaster.png')}
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'transparent',
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: 'flex-end',
		alignItems: 'center',
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
})
