import { BottomSheetSectionList } from '@gorhom/bottom-sheet'

export default function AuthorizedProfilesList({
	sections,
	renderSectionHeader,
	renderItem,
	horizontal,
	keyExtractor,
	stickySectionHeadersEnabled,
}) {
	return (
  <BottomSheetSectionList
  horizontal={horizontal}
  keyExtractor={keyExtractor}
  sections={sections}
  stickySectionHeadersEnabled={stickySectionHeadersEnabled}
  renderSectionHeader={renderSectionHeader}
  renderItem={renderItem}
		/>
	)
}
