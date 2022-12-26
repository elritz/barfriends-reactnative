import { Box, Heading } from 'native-base'
import { View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

export default function QuickBarfriendCard() {
	return (
		<Box flexDirection={'column'} justifyContent={'space-around'}>
			<Heading
				numberOfLines={2}
				adjustsFontSizeToFit
				// color={'primary.600'}
				fontSize={'lg'}
				textTransform={'uppercase'}
				fontWeight={'black'}
				lineHeight={'xs'}
				textAlign={'center'}
				mb={4}
			>
				Quick Barfriend
			</Heading>
			<Box alignItems={'center'} justifyContent={'center'}>
				<QRCode
					size={100}
					value='Just some string value'
					// logo={{ uri: base64Logo }}
					backgroundColor='transparent'
					logoSize={30}
					logoBackgroundColor='transparent'
				/>
			</Box>
			{/* <View
				style={{
					height: 60,
					width: 60,
					backgroundColor: 'black',
					borderRadius: 30,
					alignSelf: 'center',
					marginBottom: 20,
				}}
			/> */}
		</Box>
	)
}
