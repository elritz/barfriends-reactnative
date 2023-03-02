import { FontAwesome5 } from '@expo/vector-icons'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { Icon, Heading, IconButton, Box, View, Text } from 'native-base'
import { useCallback, useContext, useMemo, useRef } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'

interface AddRelationshipProps {}

const AddRelationship = ({}) => {
	const themeContext = useContext(ThemeContext)
	// const sheetRef = useRef<BottomSheet>(null)

	// // variables
	// const data = useMemo(
	// 	() =>
	// 		Array(50)
	// 			.fill(0)
	// 			.map((_, index) => `index-${index}`),
	// 	[],
	// )
	// const snapPoints = useMemo(() => ['25%', '50%', '90%'], [])

	// // callbacks
	// const handleSheetChange = useCallback(index => {
	// 	console.log('handleSheetChange', index)
	// }, [])
	// const handleSnapPress = useCallback(index => {
	// 	sheetRef.current?.snapToIndex(index)
	// }, [])
	// const handleClosePress = useCallback(() => {
	// 	sheetRef.current?.close()
	// }, [])

	// // render
	// const renderItem = useCallback(
	// 	item => (
	// 		<View key={item} style={styles.itemContainer}>
	// 			<Text>{item}</Text>
	// 		</View>
	// 	),
	// 	[],
	// )

	return (
		<>
			{/* <BottomSheet ref={sheetRef} index={1} snapPoints={snapPoints} onChange={handleSheetChange}>
				<BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
					{data.map(renderItem)}
				</BottomSheetScrollView>
			</BottomSheet> */}
			<Box
				flex={1}
				h={200}
				justifyContent={'center'}
				alignItems={'center'}
				rounded='lg'
				_light={{
					bg: 'light.50',
				}}
				_dark={{
					bg: 'dark.50',
				}}
				px={5}
			>
				<IconButton
					disabled={true}
					variant={'solid'}
					borderRadius={'lg'}
					bg={'amber.200'}
					icon={<Icon size={30} color={'darkBlue.800'} as={FontAwesome5} name='hand-holding-heart' />}
					height={57}
					width={57}
					borderColor={'primary.500'}
					borderWidth={3}
				/>
				<Heading
					mt={3}
					textAlign={'center'}
					fontSize={'lg'}
					fontWeight={'bold'}
					style={{ textTransform: 'uppercase' }}
				>
					Add a
				</Heading>
				<Heading
					textAlign={'center'}
					fontSize={'lg'}
					fontWeight={'bold'}
					style={{ textTransform: 'uppercase' }}
				>
					relationship
				</Heading>
			</Box>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 200,
	},
	contentContainer: {
		backgroundColor: 'white',
	},
	itemContainer: {
		padding: 6,
		margin: 6,
		backgroundColor: '#eee',
	},
})

export default AddRelationship
