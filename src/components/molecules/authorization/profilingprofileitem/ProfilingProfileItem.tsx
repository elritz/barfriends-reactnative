import React, { useContext, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { Image, ListItem } from '@rneui/themed';
import { ThemeContext } from 'styled-components/native';
import RNEText600 from '@components/atoms/typography/RNETypography/text/RNEText600';

type ProfileItemType = {
  item: any;
}

const ProfilingProfileItemLarge = ({ item }: ProfileItemType) => {
  const themeContext = useContext(ThemeContext)

  return (
    <ListItem
      key={item.id}
      containerStyle={{ marginVertical: 5, borderRadius: 10 }}
    >
      <Image
        source={{ uri: item.photos[0].url }}
        style={{ width: 40, height: 40, borderRadius: 4 }}
      />
      <ListItem.Content>
        <RNEText600 style={{ textTransform: 'capitalize' }}>
          {item.IdentifiableInformation.fullname}
        </RNEText600>
        <ListItem.Title
          style={{ fontWeight: 'bold' }}
        >
          {item.IdentifiableInformation.username}
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  )
}

export default ProfilingProfileItemLarge;
