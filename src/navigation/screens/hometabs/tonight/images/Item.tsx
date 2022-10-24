import { MARGIN, SIZE } from './Config'
import { useReactiveVar } from '@apollo/client'
import { StackActions, useIsFocused, useNavigation } from '@react-navigation/native'
import { PermissionMediaReactiveVar } from '@reactive'
import * as MediaLibrary from 'expo-media-library'
import { useEffect, useRef } from 'react'
import { StyleSheet, View, Image, Pressable, AppState } from 'react-native'

const styles = StyleSheet.create({
	container: {
		width: SIZE,
		height: SIZE,
	},
})

interface TileProps {
	id: string
	uri: string
	onPress: () => void
}

const Item = ({ uri, onPress }: TileProps) => {
	const navigation = useNavigation()
	const rPermissionMedia = useReactiveVar(PermissionMediaReactiveVar)

	return (
		<Pressable
			onPress={() => {
				rPermissionMedia.granted
					? onPress()
					: navigation.dispatch(
							StackActions.push('PermissionNavigator', {
								screen: 'MediaLibraryPermissionScreen',
							}),
					  )
			}}
		>
			<View style={styles.container} pointerEvents='none'>
				<Image source={{ uri }} style={{ flex: 1, margin: MARGIN * 2, borderRadius: MARGIN * 10 }} />
			</View>
		</Pressable>
	)
}

export default Item
