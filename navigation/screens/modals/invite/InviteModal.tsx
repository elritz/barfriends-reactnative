import { Heading } from 'native-base'
import { View } from 'react-native'

interface InviteOutVenueProps {}

export const InviteOutVenueModal = ({}: InviteOutVenueProps) => {
	return (
		<View>
			<Heading fontSize={'2xl'} style={{ fontWeight: '800', textTransform: 'uppercase' }}>
				Invite friends out
			</Heading>
		</View>
	)
}
