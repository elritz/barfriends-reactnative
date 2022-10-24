import { Component } from 'react'
import * as React from 'react'

import { View } from 'react-native'

interface TonightPhotosProps { }

export const TonightPhotos = ({ }) => <View />

// <View >
//   <Image
//     source={{
//       uri: 'https://images.unsplash.com/photo-1573600073955-f15b3b6caab7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80'
//     }}
//     style={{ borderRadius: 15, width: '100%', height: 400 }}
//     PlaceholderContent={<ActivityIndicator />}
//   />
//   <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
//     <Image
//       source={{
//         uri: 'https://images.unsplash.com/photo-1573600073955-f15b3b6caab7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80'
//       }}
//       style={{ borderRadius: 10, width: smallImageSize, height: smallImageSize + 30, }}
//       PlaceholderContent={<ActivityIndicator />}
//     />
//     <Image
//       source={{
//         uri: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
//       }}
//       style={{ borderRadius: 10, width: smallImageSize, height: smallImageSize + 30, }}
//       PlaceholderContent={<ActivityIndicator />}
//     />
//     <Image
//       source={{
//         uri: 'https://images.unsplash.com/photo-1578774296842-c45e472b3028?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=673&q=80'
//       }}
//       style={{ borderRadius: 10, width: smallImageSize, height: smallImageSize + 30, }}
//       PlaceholderContent={<ActivityIndicator />}
//     />
//   </View>
// </View>
