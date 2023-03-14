import { useRouter } from 'expo-router'
import { Pressable, Divider, FlatList, HStack, Heading } from 'native-base'

export default function Preferences() {
	const router = useRouter()
	return (
		<FlatList
			data={[
				{
					name: 'Foreground Location',
					route: () => {
						router.push({
							pathname: '/(app)/permissionnavigator/foregroundlocation',
						})
					},
				},
				{
					name: 'Background Location',
					route: () => {
						router.push({
							pathname: '/(app)/permissionnavigator/backgroundlocation',
						})
					},
				},
				{
					name: 'Notifications',
					route: () => {
						router.push({
							pathname: '/(app)/permissionnavigator/notifications',
						})
					},
				},
				{
					name: 'Media Library',
					route: () => {
						router.push({
							pathname: '/(app)/permissionnavigator/medialibrary',
						})
					},
				},
			]}
			keyExtractor={i => i.name}
			numColumns={1}
			style={{
				marginHorizontal: 5,
			}}
			contentInset={{ top: 10 }}
			renderItem={({ item }) => {
				return (
					<Pressable onPressIn={item.route}>
						<Divider />
						<HStack h={'45px'} flex={1} alignItems={'center'}>
							<Heading px={4} fontSize={'md'}>
								{item.name}
							</Heading>
						</HStack>
						<Divider />
					</Pressable>
				)
			}}
		/>
	)
}
