import { MARGIN, SIZE } from './Config'
import { useReactiveVar } from '@apollo/client'
import { MaterialIcons } from '@expo/vector-icons'
import { PermissionMediaReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { Image, Box, Icon, Text } from 'native-base'
import { StyleSheet, View, Pressable, AppState } from 'react-native'

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
	const router = useRouter()
	const rPermissionMedia = useReactiveVar(PermissionMediaReactiveVar)

	return (
		<Pressable
			onPress={() => {
				rPermissionMedia?.granted
					? onPress()
					: router.push({
							pathname: '(app)/permission/medialibrary',
					  })
			}}
		>
			<View style={styles.container} pointerEvents='none'>
				{uri ? (
					<Image
						source={{ uri }}
						style={{ flex: 1, margin: MARGIN * 2, borderRadius: MARGIN * 10 }}
						alt={'Story Image'}
						accessibilityLabel={'Story Image'}
					/>
				) : (
					<Box
						alignItems={'center'}
						justifyContent={'center'}
						flex={1}
						borderRadius={MARGIN * 10}
						m={`${MARGIN * 2}px`}
						_light={{
							bg: 'light.50',
						}}
						_dark={{
							bg: 'dark.50',
						}}
					>
						<Icon
							as={MaterialIcons}
							name={'add-photo-alternate'}
							size={'5xl'}
							_light={{
								color: 'dark.200',
							}}
							_dark={{
								bg: 'light.800',
							}}
						/>
						<Text fontSize={'xl'}>Add photo</Text>
					</Box>
				)}
			</View>
		</Pressable>
	)
}

export default Item
