import { useReactiveVar } from '@apollo/client'
import CameraModal from '@components/molecules/modals/cameramodal/CameraModal'
import { useGetSecureFriendQrCodeDataQuery } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { Box, Heading, Pressable, useDisclose, VStack } from 'native-base'
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
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const { isOpen, onOpen, onClose } = useDisclose()
	const [dataQR, setDataQR] = useState('')

	const { data, loading, error } = useGetSecureFriendQrCodeDataQuery({
		onError: error => {
			console.log('errror', error)
		},
		onCompleted: data => {
			console.log('🚀 ---------------------------------------------------------------------🚀')
			console.log('🚀 ~ file: QuickBarfriendCard.tsx:25 ~ QuickBarfriendCard ~ data', data)
			console.log('🚀 ---------------------------------------------------------------------🚀')

			const dataQRString = JSON.stringify({
				dataHash: data.getSecureFriendQRCodeData,
				qrCodeProfileId: rAuthorizationVar?.DeviceProfile?.Profile?.id,
			})
			setDataQR(dataQRString)
		},
	})

	if (loading || !data || !dataQR) return null

	return (
		<Pressable onPress={onOpen}>
			<CameraModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
			<VStack flexDirection={'column'} justifyContent={'space-around'} alignItems={'center'}>
				<Heading fontWeight={'black'}>BFS</Heading>
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
			</VStack>
		</Pressable>
	)
}
