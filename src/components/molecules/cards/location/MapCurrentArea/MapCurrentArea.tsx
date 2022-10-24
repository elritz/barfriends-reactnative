import { useReactiveVar } from '@apollo/client'
import RNEHeading500 from '@components/atoms/typography/RNETypography/heading/RNEHeading500'
import RNEHeading600 from '@components/atoms/typography/RNETypography/heading/RNEHeading600'
import RNEHeading700 from '@components/atoms/typography/RNETypography/heading/RNEHeading700'
import RNEHeading1000 from '@components/atoms/typography/RNETypography/heading/RNEHeading1000'
import LocationStatusButton from '@components/molecules/permissions/locations/LocationStatusButton/LocationStatusButton'
import { MapBottomSheetRefVar, MapReactiveVar } from '@reactive'
import { Icon } from '@rneui/base'
import { useContext } from 'react'
import * as React from 'react'
import { Pressable, View } from 'react-native'
import SimpleEmoji from 'simple-react-native-emoji'
import styled, { ThemeContext } from 'styled-components/native'

const MapCurrentArea = () => {
	const themeContext = useContext(ThemeContext)
	const rMap = useReactiveVar(MapReactiveVar)
	const rMapBottomSheet = useReactiveVar(MapBottomSheetRefVar)

	// const navigation = useNavigation()
	return (
		<Pressable>
			<OuterView>
				<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<Icon
						name='ios-location-sharp'
						type='ionicon'
						size={25}
						color={themeContext.palette.company.primary}
					/>
					<RNEHeading600 ellipsizeMode='tail' style={{ textTransform: 'uppercase' }}>
						My Area
					</RNEHeading600>
				</View>
				<View
					style={{
						flex: 2,
						justifyContent: 'space-around',
					}}
				>
					<View>
						<View>
							<RNEHeading1000 ellipsizeMode='tail' style={{ textTransform: 'uppercase' }}>
								<SimpleEmoji
									shortName={
										rMap.reverseGeocoded.isoCountryCode
											? `flag-${rMap.reverseGeocoded.isoCountryCode.toLowerCase()}`
											: 'earth_americas'
									}
								/>
							</RNEHeading1000>
						</View>
						<View>
							<RNEHeading700 ellipsizeMode='tail' style={{ textTransform: 'uppercase' }}>
								{rMap.reverseGeocoded.subregion ? rMap.reverseGeocoded.subregion : 'Unknown'}
							</RNEHeading700>
						</View>
					</View>
					<View>
						<RNEHeading500 ellipsizeMode='tail' style={{ color: themeContext.palette.grey[600] }}>
							Range
						</RNEHeading500>
						<RNEHeading600 ellipsizeMode='tail' style={{ textTransform: 'uppercase' }}>
							{rMap.range}
						</RNEHeading600>
					</View>
				</View>
				<View
					style={{
						flex: 1,
						flexDirection: 'row-reverse',
						position: 'absolute',
						bottom: 10,
						right: 10,
					}}
				>
					<LocationStatusButton />
				</View>
			</OuterView>
		</Pressable>
	)
}

export default MapCurrentArea

const OuterView = styled.View(props => ({
	background: props.theme.palette.tertiary.background,
	height: '100%',
	width: '100%',
	padding: 10,
	marginHorizontal: 10,
	shadowRadius: 10,
	borderRadius: 16,
}))
