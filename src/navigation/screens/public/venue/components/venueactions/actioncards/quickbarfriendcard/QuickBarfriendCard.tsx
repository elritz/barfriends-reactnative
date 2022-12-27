import { CameraModal } from './CameraModal'
import { useReactiveVar } from '@apollo/client'
import { MaterialIcons } from '@expo/vector-icons'
import { AuthorizationReactiveVar } from '@reactive'
import { Box, Heading, Icon, IconButton, Pressable, useDisclose, VStack } from 'native-base'
import QRCode from 'react-native-qrcode-svg'

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
				{/* <IconButton
					disabled={true}
					variant={'solid'}
					borderRadius={'lg'}
					_light={{
						bg: 'light.100',
					}}
					_dark={{
						bg: 'dark.50',
					}}
					icon={<Icon size={30} color={'#ff7000'} as={MaterialIcons} name='group-add' />}
					height={'50px'}
					width={'50px'}
				/> */}
				<Heading fontWeight={'black'}>BFS</Heading>
				<Box mt={2} alignItems={'center'} justifyContent={'center'}>
					<QRCode
						size={qrcodesize}
						value={rAuthorizationVar?.DeviceProfile?.Profile?.id}
						color={color}
						// logo={{ uri: base64Logo }}
						backgroundColor='transparent'
						logo={
							showIcon && require('../../../../../../../../assets/images/company/company_coaster.png')
						}
						logoSize={logosize}
						logoBackgroundColor='transparent'
					/>
				</Box>
			</VStack>
		</Pressable>
	)
}
