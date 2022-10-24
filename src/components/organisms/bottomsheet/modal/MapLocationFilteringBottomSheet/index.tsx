import { useReactiveVar } from '@apollo/client'
import FadeBottomSheetBackground from '@components/atoms/backgrounds/FadeBottomSheetBackground'
import SearchAreaFilltering from '@components/templates/SearchAreaFilltering/SearchAreaFilltering'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { MapBottomSheetRefVar } from '@reactive'
import { useEffect, useMemo, useRef } from 'react'

const MapLocationFillteringBottomSheet = () => {
	const _bottomSheetRef = useRef<BottomSheetModal>(null)
	const snapPoints = useMemo(() => ['55%', '90%'], [])
	const mapBottomSheetRef = useReactiveVar(MapBottomSheetRefVar)

	useEffect(() => {
		if (_bottomSheetRef) {
			MapBottomSheetRefVar(_bottomSheetRef)
		}
	}, [_bottomSheetRef])

	return (
		<BottomSheetModal
			ref={mapBottomSheetRef}
			index={1}
			backgroundComponent={FadeBottomSheetBackground}
			snapPoints={snapPoints}
			enableContentPanningGesture={false}
			handleStyle={{
				height: 30,
			}}
			handleIndicatorStyle={{
				marginTop: 10,
			}}
			style={{
				shadowColor: '#000',
				shadowOffset: {
					width: 0,
					height: 8,
				},
				shadowOpacity: 0.44,
				shadowRadius: 10.32,

				elevation: 16,
			}}
		>
			<SearchAreaFilltering />
		</BottomSheetModal>
	)
}

export default MapLocationFillteringBottomSheet
