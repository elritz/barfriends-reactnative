import { useReactiveVar } from '@apollo/client'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { DeviceNetworkInfoReactiveVar } from '@reactive'
import { Text, Icon, Box } from 'native-base'
import React, { useContext } from 'react'
import { View, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
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
				<Box
					bg={'primary.500'}
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						paddingTop: inset.top,
						paddingBottom: 5,
					}}
				>
					<Icon
						as={MaterialCommunityIcons}
						name='wifi-strength-off'
						size={18}
						color={'tertiary.500'}
						style={{ paddingHorizontal: 5 }}
					/>
					<Text
						style={{
							textAlign: 'center',
							color: themeContext.palette.tertiary.color.default,
						}}
					>
						No internet connection
					</Text>
					<Pressable onPress={() => 'TODO: onPress(FN(Refresh))'}>
						<Text
							style={{
								textAlign: 'center',
							}}
						>
							&nbsp; Refresh
						</Text>
					</Pressable>
				</Box>
			)}
		</View>
	)
}

export default NetworkConnectivityTop
