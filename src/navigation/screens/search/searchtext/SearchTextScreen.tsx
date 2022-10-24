import { useReactiveVar } from '@apollo/client'
import RNEText1000 from '@components/atoms/typography/RNETypography/text/RNEText1000'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SearchReactiveVar } from '@reactive'
import React, { useContext } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'

const SearchTextScreen = () => {
	const route = useRoute()

	type Params = {
		searchText: string
	}
	const params: any = route.params
	return (
		<OuterView>
			<ScrollView
				keyboardDismissMode='interactive'
				style={{ backgroundColor: 'orange', paddingTop: 90, paddingHorizontal: 10 }}
			>
				<RNEText1000 style={{ textAlign: 'center' }}>searchTextScreen</RNEText1000>
				<RNEText1000 style={{ textAlign: 'center' }}>{params?.searchText}</RNEText1000>
			</ScrollView>
		</OuterView>
	)
}

export default SearchTextScreen

const OuterView = styled.View`
	flex: 1;
	background: red;
`
