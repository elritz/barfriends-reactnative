import { useReactiveVar } from '@apollo/client'
import { isNetworkRequestInFlight } from '@apollo/client/core/networkStatus'
import RNEText500 from '@components/atoms/typography/RNETypography/text/RNEText500'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { DeviceNetworkInfoReactiveVar } from '@reactive'
import { Icon } from '@rneui/themed'
import React, { useContext } from 'react'
import { View, Text, Pressable } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeContext } from 'styled-components/native'

// TODO: FN(Fix broken functionality to be more stable)
// TODO: FN(Refresh the network activity)

const NetworkConnectivityTop = () => {
	const themeContext = useContext(ThemeContext)
	const inset = useSafeAreaInsets()
	const rDeviceNetworkVar = useReactiveVar(DeviceNetworkInfoReactiveVar)

	return (
		<View>
			{rDeviceNetworkVar.isInternetReachable && (
				<View
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						backgroundColor: themeContext.palette.quaternary.background,
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						paddingTop: inset.top,
						paddingBottom: 5,
					}}
				>
					<Icon
						type='material-community'
						name='wifi-strength-off'
						size={18}
						color={themeContext.palette.tertiary.color.tertiary}
						style={{ paddingHorizontal: 5 }}
					/>
					<RNEText500
						style={{
							textAlign: 'center',
							color: themeContext.palette.tertiary.color.tertiary,
						}}
					>
						No internet connection
					</RNEText500>
					<Pressable onPress={() => 'TODO: onPress(FN(Refresh))'}>
						<RNEText500
							style={{
								textAlign: 'center',
								// color: themeContext.palette.highlight.color.tertiary
							}}
						>
							&nbsp; Refresh
						</RNEText500>
					</Pressable>
				</View>
			)}
		</View>
	)
}

export default NetworkConnectivityTop
