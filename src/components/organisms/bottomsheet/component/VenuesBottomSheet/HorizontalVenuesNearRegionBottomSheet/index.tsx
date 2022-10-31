import { useReactiveVar } from '@apollo/client'
import BlurBottomSheetBackground from '@components/atoms/backgrounds/BlurBottomSheetBackground'
import FadeBottomSheetBackground from '@components/atoms/backgrounds/FadeBottomSheetBackground'
import CardPleaseSignup from '@components/molecules/asks/signuplogin/SignupLogin'
import CardFullImageNameTotals from '@components/molecules/venue/CardFullImageNameTotals'
import { Ionicons } from '@expo/vector-icons'
import BottomSheet from '@gorhom/bottom-sheet'
import { MapBottomSheetRefVar, MapReactiveVar } from '@reactive'
import { Text } from '@rneui/base'
import { ItemRenderType } from '@types'
import { useCallback, useContext, useMemo, useRef } from 'react'
import * as React from 'react'
import { View, Animated, Platform, ListRenderItemInfo, Pressable } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'

interface Marker {
	id: string
	coordinate: {
		latitude: number
		longitude: number
	}
	title: string
	description: string
	image: string
	rating: number
	reviews: number
}

interface HorizontalVenuesNearRegionBottomSheetProps {
	_flatListView?: React.Ref<Animated.FlatList<Marker>>
	markers: [Marker]
	CARD_HEIGHT: number
	CARD_WIDTH: number
	SPACING_FOR_CARD_INSET: number
	mapAnimation: {}
}

const HorizontalVenuesNearRegionBottomSheet = ({
	CARD_HEIGHT,
	CARD_WIDTH,
	_flatListView,
	markers,
	SPACING_FOR_CARD_INSET,
	mapAnimation,
}: HorizontalVenuesNearRegionBottomSheetProps) => {
	const bottomSheetRef = useRef<BottomSheet>(null)
	const snapPoints = useMemo(() => [30, CARD_HEIGHT + 70], [])
	const themeContext = useContext(ThemeContext)
	const rMap = useReactiveVar(MapReactiveVar)
	const [loading, setLoading] = React.useState(false)
	const rMapBottomSheet = useReactiveVar(MapBottomSheetRefVar)

	const handleSheetChanges = useCallback((index: number) => {}, [])

	React.useEffect(() => {
		if (rMap.reverseGeocoded) {
			setLoading(false)
		}
	}, [rMap.reverseGeocoded])

	const VenueItem = ({ index, item }: ListRenderItemInfo<ItemRenderType<Marker>>) => (
		<CardFullImageNameTotals index={index} item={item} height={CARD_HEIGHT} width={CARD_WIDTH} />
	)

	const FooterItems = () => (
		<View style={{ flexDirection: 'row' }}>
			<View style={{ height: CARD_HEIGHT, width: CARD_WIDTH * 1.05 }}>
				<CardPleaseSignup />
			</View>
		</View>
	)

	return (
		<BottomSheet
			ref={bottomSheetRef}
			index={1}
			backgroundComponent={
				Platform.OS === 'ios' ? BlurBottomSheetBackground : FadeBottomSheetBackground
			}
			snapPoints={snapPoints}
			onChange={handleSheetChanges}
			bottomInset={90}
			keyboardBehavior='fillParent'
		>
			<View>
				<Pressable
					style={{ flexDirection: 'row', marginBottom: 5, marginHorizontal: 5 }}
					onPress={() => {
						rMapBottomSheet.current.present()
					}}
				>
					<Text
						numberOfLines={1}
						h3
						h3Style={{
							textTransform: 'uppercase',
							fontWeight: '800',
							paddingHorizontal: '2%',
						}}
					>
						{rMap.reverseGeocoded.city}
					</Text>
					<Ionicons
						name='md-search-circle'
						size={33}
						color={themeContext.palette.primary.color.primary}
					/>
				</Pressable>
				<FlatListStyledAnimated
					style={{ elevation: 100, zIndex: 100 }}
					ref={_flatListView}
					data={markers}
					keyExtractor={({ id }) => id}
					renderItem={VenueItem}
					ListFooterComponent={FooterItems}
					ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
					contentContainerStyle={{
						paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
					}}
					contentInset={{
						top: 0,
						left: SPACING_FOR_CARD_INSET,
						bottom: 0,
						right: SPACING_FOR_CARD_INSET,
					}}
					horizontal
					pagingEnabled
					initialScrollIndex={0}
					scrollEventThrottle={1}
					showsHorizontalScrollIndicator={false}
					snapToAlignment='center'
					snapToInterval={CARD_WIDTH + 20}
					onScroll={Animated.event(
						[
							{
								nativeEvent: {
									contentOffset: {
										x: mapAnimation,
									},
								},
							},
						],
						{ useNativeDriver: true },
					)}
				/>
			</View>
		</BottomSheet>
	)
}

export default HorizontalVenuesNearRegionBottomSheet

const FlatListStyledAnimated = styled(Animated.FlatList)`
	left: 0;
	right: 0;
	padding-vertical: 0px;
`
