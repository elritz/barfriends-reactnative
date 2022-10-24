import TonightImages from './images'
import ProfileActivityAndStatusCards from '@components/organisms/ProfileActivityAndStatusCards/ProfileActivityAndStatusCards'
import { useContext } from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { ThemeContext } from 'styled-components/native'

const Tonight = () => {
	const themeContext = useContext(ThemeContext)
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
				<TonightImages />
				<ProfileActivityAndStatusCards />
			</ScrollView>
		</SafeAreaView>
	)
}

export default Tonight

const TabContentScroll = styled.ScrollView`
	flex: 1;
`
