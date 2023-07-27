import { useReactiveVar } from '@apollo/client'
import TermsLoadingState from '@components/screens/settings/TermsLoadingState'
import { usePrivacyTermsDocumentsQuery } from '@graphql/generated'
import { ThemeReactiveVar } from '@reactive'
import { SafeAreaView, ScrollView, useWindowDimensions } from 'react-native'
import RenderHTML from 'react-native-render-html'

export default () => {
	const { width } = useWindowDimensions()
	const rTheme = useReactiveVar(ThemeReactiveVar)

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
							color:
								rTheme.colorScheme === 'light'
									? rTheme.theme?.gluestack.tokens.colors.light900
									: rTheme.theme?.gluestack.tokens.colors.dark900,
							fontSize: 19,
						},
						'lisitem-1': {
							color:
								rTheme.colorScheme === 'light'
									? rTheme.theme?.gluestack.tokens.colors.light900
									: rTheme.theme?.gluestack.tokens.colors.dark900,
							fontSize: 19,
						},
						highlight: {
							color: rTheme.theme?.gluestack.tokens.colors.primary500,
						},
					}}
				/>
			</SafeAreaView>
		</ScrollView>
	)
}
