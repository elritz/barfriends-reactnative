import { useReactiveVar } from '@apollo/client'
import { Box } from '@components/core'
import InviteCard from '@components/screens/public/venue/venueactions/actioncards/invitecard/InviteCard'
import QuickBarfriendCard from '@components/screens/public/venue/venueactions/actioncards/quickbarfriendcard/QuickBarfriendCard'
import AddEmoji from '@components/screens/tonight/activity/ask/AddEmoji/AddEmoji'
import JoinVenue from '@components/screens/tonight/activity/ask/JoinVenue/JoinVenue'
import Photos from '@components/screens/tonight/photos'
import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
} from '@constants/ReactNavigationConstants'
import { AuthorizationReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Wrapper = ({ children }) => {
	return (
		<Box
			sx={{
				h: 200,
			}}
			flex={1}
			rounded='$lg'
			justifyContent={'center'}
			alignItems={'center'}
			overflow='hidden'
			px={'$5'}
			py={'$1'}
			m={'$2'}
		>
			{children}
		</Box>
	)
}

export default () => {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const insets = useSafeAreaInsets()

	console.log(
		'rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.emojimood[0] :>> ',
		JSON.stringify(rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory, null, 4),
	)
	return (
		<LinearGradient
			style={{ flex: 1 }}
			colors={
				rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.emojimood
					? [...rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.emojimood.colors]
					: []
			}
		>
			<FlashList
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingHorizontal: 5,
				}}
				contentInset={{
					top: insets.top + 60,
					bottom:
						insets.bottom !== 0
							? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
							: HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
				}}
				ListHeaderComponent={() => {
					return <Photos />
				}}
				data={[
					{
						_typename: 'addemoji',
						item: <AddEmoji />,
					},
					{
						_typename: 'joinvenue',
						item: <JoinVenue />,
					},
					{
						_typename: 'quickbarfriend',
						item: (
							<QuickBarfriendCard color={'#ff7000'} showIcon={false} logosize={40} qrcodesize={140} />
						),
					},
					{
						_typename: 'invite',
						item: <InviteCard />,
					},
				]}
				numColumns={2}
				estimatedItemSize={200}
				renderItem={({ index, item }) => {
					return <Wrapper>{item.item}</Wrapper>
				}}
			/>
		</LinearGradient>
	)
}
