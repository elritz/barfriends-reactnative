import LogoTransparent from '@assets/images/company/LogoTransparent'
import { View, useColorScheme, SafeAreaView } from 'react-native'

export default function SplashScreen() {
	const colorScheme = useColorScheme()
	return (
		<SafeAreaView>
			<View
				style={{
					backgroundColor: 'red',
					flex: 1,
					alignItems: 'center',
					justifyContent: 'flex-start',
					width: '100%',
					// backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
				}}
			>
				<View
					style={{
						alignItems: 'center',
						paddingTop: '40%',
						paddingBottom: 40,
						width: '100%',
						backgroundColor: '#1d1d1d',
						borderRadius: 10,
					}}
				>
					<LogoTransparent height={75} />
				</View>
			</View>
		</SafeAreaView>
	)
}
