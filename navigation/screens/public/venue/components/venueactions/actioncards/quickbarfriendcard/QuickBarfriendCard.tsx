import { useReactiveVar } from '@apollo/client'
import CameraModal from '@components/molecules/modals/cameramodal/CameraModal'
import { useGetSecureFriendQrCodeDataQuery } from '@graphql/generated'
import { AuthorizationReactiveVar, PermissionCameraReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { Box, Button, Heading, Pressable, useDisclose, VStack } from 'native-base'
import { useState } from 'react'
import QRCode from 'react-native-qrcode-svg'

const LOGO_COASTER = require('../../../../../../../../assets/images/company/company_coaster.png')

type Props = {
	qrcodesize: number
	logosize: number
	showIcon?: boolean | true
	color?: string
}

export default function QuickBarfriendCard({ qrcodesize, logosize, showIcon, color }: Props) {
	const router = useRouter()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rPermissionCamera = useReactiveVar(PermissionCameraReactiveVar)
	const { isOpen, onOpen, onClose } = useDisclose()
	const [dataQR, setDataQR] = useState('')

	const { data, loading, error } = useGetSecureFriendQrCodeDataQuery({
		onError: error => {
			console.log('errror', error)
		},
		onCompleted: data => {
			const dataQRString = JSON.stringify({
				dataHash: data.getSecureFriendQRCodeData,
				qrCodeProfileId: rAuthorizationVar?.DeviceProfile?.Profile?.id,
			})
			setDataQR(dataQRString)
		},
	})

	if (loading || !data || !dataQR) return null

	return (
		<Pressable
			onPress={() =>
				rPermissionCamera?.granted
					? onOpen
					: router.push({
							pathname: '(app)/permissio/camera',
					  })
			}
		>
			<VStack mt={2} flexDirection={'column'} justifyContent={'space-around'} alignItems={'center'}>
				<Heading fontWeight={'black'} fontSize={'lg'}>
					Quick BF
				</Heading>
				{rPermissionCamera?.granted ? (
					<>
						<Box alignItems={'center'} justifyContent={'center'}>
							{dataQR && (
								<QRCode
									size={qrcodesize}
									value={dataQR}
									color={color}
									backgroundColor={'transparent'}
									logo={showIcon && LOGO_COASTER}
									logoSize={logosize}
									logoBackgroundColor={'transparent'}
								/>
							)}
						</Box>
						<CameraModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
					</>
				) : (
					<Box flexDirection={'column'} justifyContent={'space-around'}>
						<Box mt={2} alignItems={'center'} justifyContent={'center'}>
							{dataQR && (
								<QRCode
									size={qrcodesize}
									value={dataQR}
									color={color}
									backgroundColor={'transparent'}
									logo={showIcon && LOGO_COASTER}
									logoSize={logosize}
									logoBackgroundColor={'transparent'}
								/>
							)}
						</Box>
					</Box>
				)}
			</VStack>
		</Pressable>
	)
}
