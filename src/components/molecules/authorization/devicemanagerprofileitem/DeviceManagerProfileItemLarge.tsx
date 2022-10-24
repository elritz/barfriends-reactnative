import RNEText600 from '@components/atoms/typography/RNETypography/text/RNEText600'
import { Profile } from '@graphql/generated'
import { Icon, Image, ListItem } from '@rneui/themed'
import React, { useContext, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { ThemeContext } from 'styled-components/native'

type ProfileItemType = {
	item: Profile
	isActive: boolean
	loading?: boolean
	selectedProfileId?: string
}

const DeviceManagerProfileItemLarge = ({
	item,
	isActive,
	loading,
	selectedProfileId,
}: ProfileItemType) => {
	const themeContext = useContext(ThemeContext)

	return (
		<ListItem key={item.id} containerStyle={{ marginVertical: 5, borderRadius: 10 }}>
			<Image
				source={{ uri: item?.photos[0]?.url }}
				style={{ width: 40, height: 40, borderRadius: 4 }}
			/>
			<ListItem.Content>
				<RNEText600 style={{ textTransform: 'capitalize' }}>
					{item?.IdentifiableInformation?.fullname}
				</RNEText600>
				<ListItem.Title style={{ fontWeight: 'bold' }}>
					{item?.IdentifiableInformation?.username}
				</ListItem.Title>
			</ListItem.Content>
			<ListItem.CheckBox
				checked={isActive}
				checkedIcon={
					!loading ? (
						<Icon
							name='ios-checkmark-circle'
							type='ionicon'
							color={themeContext.palette.active.background.primary}
							size={25}
						/>
					) : (
						<ActivityIndicator />
					)
				}
				uncheckedIcon={
					selectedProfileId === item.id && loading ? (
						<ActivityIndicator />
					) : (
						<Icon
							name='radio-button-unchecked'
							type='material'
							color={themeContext.palette.disabled.background}
							size={25}
						/>
					)
				}
			/>
		</ListItem>
	)
}

export default DeviceManagerProfileItemLarge
