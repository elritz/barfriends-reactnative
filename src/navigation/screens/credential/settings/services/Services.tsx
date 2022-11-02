import { SortOrder, TypeOfDocument, useDocumentsQuery } from '@graphql/generated'
import { Text } from 'native-base'
import { useContext } from 'react'
import { SafeAreaView, ScrollView, useWindowDimensions, View } from 'react-native'
import RenderHTML from 'react-native-render-html'
import { ThemeContext } from 'styled-components/native'

const TermsOfService = () => {
	const { width } = useWindowDimensions()
	const themeContext = useContext(ThemeContext)

	const { data, loading, error } = useDocumentsQuery({
		variables: {
			where: {
				TypeOfDocument: {
					equals: TypeOfDocument.ProfileTermsOfService,
				},
			},
			orderBy: {
				createdAt: SortOrder.Desc,
			},
			first: 1,
		},
	})

	if (loading && data) {
		return <Text>Loading Terms of Service...</Text>
	}

	const source = {
		html: data.documents[0].content,
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
