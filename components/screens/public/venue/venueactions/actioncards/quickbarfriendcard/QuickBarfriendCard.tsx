import { useReactiveVar } from '@apollo/client'
import { Box, Heading, Pressable, VStack } from '@components/core'
import CameraModal from '@components/molecules/modals/cameramodal/CameraModal'
import { useGetSecureFriendQrCodeDataQuery } from '@graphql/generated'
import { AuthorizationReactiveVar, PermissionCameraReactiveVar } from '@reactive'
import { useDisclose } from '@util/hooks/useDisclose'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import QRCode from 'react-native-qrcode-svg'

const LOGO_COASTER = require('../../../../../../../assets/images/company/company_coaster.png')

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
					? onOpen()
					: router.push({
							pathname: '(app)/permission/camera',
					  })
			}
		>
			<VStack mt={'$2'} flexDirection={'column'} justifyContent={'space-around'} alignItems={'center'}>
				<Heading fontWeight={'$black'} fontSize={'$lg'}>
					Quick BFS
				</Heading>
				{rPermissionCamera?.granted ? (
					<>
						<VStack alignItems={'center'} justifyContent={'center'}>
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
						</VStack>
						<CameraModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
					</>
				) : (
					<Box bg={'transparent'} flexDirection={'column'} justifyContent={'space-around'}>
						<Box bg={'transparent'} mt={'$2'} alignItems={'center'} justifyContent={'center'}>
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
