import ProfileActivityAndStatusCards from '@components/organisms/ProfileActivityAndStatusCards/ProfileActivityAndStatusCards'
import Photos from '@screens/hometabs/tonight/photos'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				style={{
					flex: 1,
				}}
				showsVerticalScrollIndicator={false}
				contentInset={{
					top: 0,
					left: 0,
					bottom: 90,
					right: 0,
				}}
			>
				{/* <TonightImages /> */}
				<Photos />
				<ProfileActivityAndStatusCards />
			</ScrollView>
		</SafeAreaView>
	)
}
