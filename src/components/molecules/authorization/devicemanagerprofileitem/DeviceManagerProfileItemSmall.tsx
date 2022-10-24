import React, { useContext, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { Icon, Image, ListItem } from '@rneui/base';
import { ThemeContext } from 'styled-components/native';
import RNEText600 from '@components/atoms/typography/RNETypography/text/RNEText600';
import RNEText500 from '@components/atoms/typography/RNETypography/text/RNEText500';

type ProfileItemType = {
  item: any;
  loading?: boolean;
  selectedProfileId?: string;
}

const ProfileItemSmall = ({ item, loading, selectedProfileId }: ProfileItemType) => {
  const themeContext = useContext(ThemeContext)

  return (
    <ListItem
      key={item.id}
      containerStyle={{ padding: 4, paddingHorizontal: 5, marginVertical: 2, borderRadius: 10 }}
    >
      <Image
        source={{ uri: item.Profile.photos[0].url }}
        style={{ width: 40, height: 40, borderRadius: 4 }}
      />
      <ListItem.Content style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
        {item.Profile.IdentifiableInformation.fullname && <RNEText500 style={{ textTransform: 'capitalize' }}>
          {item.Profile.IdentifiableInformation.fullname}
        </RNEText500>}
        {item.Profile.IdentifiableInformation.username && <RNEText500
          style={{ fontWeight: 'bold' }}
        >
          {item.Profile.IdentifiableInformation.username}
        </RNEText500>}
      </ListItem.Content>
      <ListItem.CheckBox
        checked={item.isActive}
        checkedIcon={
          !loading ?
            <Icon
              name="ios-checkmark-circle"
              type="ionicon"
              color={themeContext.palette.active.background.primary}
              size={25}
            />
            :
            <ActivityIndicator />
        }
        uncheckedIcon={
          (selectedProfileId === item.id) && loading ?
            <ActivityIndicator />
            :
            (
              <Icon
                name="radio-button-unchecked"
                type="material"
                color={themeContext.palette.disabled.background}
                size={25}
              />
            )
        }
      />
    </ListItem>
  )
}

export default ProfileItemSmall;
