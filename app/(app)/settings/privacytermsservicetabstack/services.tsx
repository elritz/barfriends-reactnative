import TermsLoadingState from '@components/screens/settings/TermsLoadingState'
import { usePrivacyTermsDocumentsQuery } from '@graphql/generated'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useTheme } from 'native-base'
import { SafeAreaView, ScrollView, useWindowDimensions, View } from 'react-native'
import RenderHTML from 'react-native-render-html'

export default () => {
	const { width } = useWindowDimensions()
	const theme = useTheme()
	const colorScheme = useThemeColorScheme()

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
							color: colorScheme === 'light' ? theme.colors.light[900] : theme.colors.dark[900],
							fontSize: 19,
						},
						'lisitem-1': {
							color: colorScheme === 'light' ? theme.colors.light[900] : theme.colors.dark[900],
							fontSize: 19,
						},
						highlight: {
							color: theme.colors.primary[500],
						},
					}}
				/>
			</SafeAreaView>
		</ScrollView>
	)
}
