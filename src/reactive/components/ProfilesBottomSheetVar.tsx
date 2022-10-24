import { makeVar } from '@apollo/client'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'

export const ProfilesBottomSheetRefReactiveVar = makeVar<React.RefObject<BottomSheetModalMethods> | null>(
  null,
)
