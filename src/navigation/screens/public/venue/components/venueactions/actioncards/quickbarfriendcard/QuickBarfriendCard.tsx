import { useReactiveVar } from '@apollo/client'
import CameraModal from '@components/molecules/modals/cameramodal/CameraModal'
import { AuthorizationReactiveVar } from '@reactive'
import { Box, Heading, Pressable, useDisclose, VStack } from 'native-base'
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

	return (
		<Pressable onPress={onOpen}>
			<CameraModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
			<VStack flexDirection={'column'} justifyContent={'space-around'} alignItems={'center'}>
				<Heading fontWeight={'black'}>BFS</Heading>
				<Box mt={2} alignItems={'center'} justifyContent={'center'}>
					<QRCode
						size={qrcodesize}
						value={JSON.stringify({ profileid: rAuthorizationVar?.DeviceProfile?.Profile?.id })}
						color={color}
						backgroundColor='transparent'
						logo={showIcon && LOGO_COASTER}
						logoSize={logosize}
						logoBackgroundColor='transparent'
					/>
				</Box>
			</VStack>
		</Pressable>
	)
}
