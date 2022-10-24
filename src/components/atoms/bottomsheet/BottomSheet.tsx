import { BottomSheetModal } from '@gorhom/bottom-sheet'
import CustomBackground from '@components/atoms/backgrounds/FadeBottomSheetBackground'

export default function BottomSheet({ ...props }) {
  return (
    <BottomSheetModal
      backgroundComponent={CustomBackground}
      ref={props.bottomSheetRef}
      index={1}
      snapPoints={props.snapPoints}
      footerComponent={props.footerComponent}
    >
      {props.children}
    </BottomSheetModal>
  )
}
