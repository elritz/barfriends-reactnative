import TermsLoadingState from '../TermsLoadingState'
import { usePrivacyTermsDocumentsQuery } from '@graphql/generated'
import { useContext } from 'react'
import { SafeAreaView, ScrollView, useWindowDimensions, View } from 'react-native'
import RenderHTML from 'react-native-render-html'
import { ThemeContext } from 'styled-components/native'

const TermsOfService = () => {
	const { width } = useWindowDimensions()
	const themeContext = useContext(ThemeContext)

	const { data, loading, error } = usePrivacyTermsDocumentsQuery()

	if (loading && data) {
		return <TermsLoadingState />
	}

	const source = {
		html: data?.privacyTermsDocuments.termsofservice.content,
	}

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<SafeAreaView
				style={{
					flex: 1,
					justifyContent: 'center',
					margin: 10,
				}}
			>
				<RenderHTML
					contentWidth={width}
					source={source}
					enableCSSInlineProcessing={true}
					allowedStyles={['color', 'backgroundColor']}
					classesStyles={{
						'body-1': {
							color: themeContext.palette.primary.color.default,
							fontSize: 19,
						},
						'lisitem-1': {
							color: themeContext.palette.primary.color.default,
							fontSize: 19,
						},
						highlight: {
							color: themeContext.palette.primary.color.accent,
						},
					}}
				/>
			</SafeAreaView>
		</ScrollView>
	)
}

export default TermsOfService
