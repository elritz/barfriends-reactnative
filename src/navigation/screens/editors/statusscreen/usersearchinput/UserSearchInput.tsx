import { View, Text, Pressable } from 'react-native'
import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import RNEHeading800 from '@components/atoms/typography/RNETypography/heading/RNEHeading800'
import { Controller, useForm } from 'react-hook-form'
import { Icon, Input, Button, SearchBar } from '@rneui/themed'
import { Ionicons } from '@expo/vector-icons'
import { useReactiveVar } from '@apollo/client'
import { AuthorizationReactiveVar } from '@reactive'
import RNEText500 from '@components/atoms/typography/RNETypography/text/RNEText500'

export default function UserSearchInput() {
  const themeContext = useContext(ThemeContext)
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

  const {
    control,
    setError,
    handleSubmit,
    reset,
    formState: { dirtyFields, errors },
  } = useForm({
    defaultValues: {
      search: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  })

  const onSubmit = (data) => {
    if (dirtyFields.search) {
    }
  }

  return (
    <OuterView>
      <RNEHeading800>
        Add your relationship
      </RNEHeading800>
      <Controller
        name="search"
        control={control}
        rules={{
          required: true,
          validate: {
            // maxLength: (value) => value.trim().split(/\s+/).length <= 200 || 'Description must be less than 200 characters'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <SearchBar
            placeholder='Search...'
            onChangeText={(text: string) => onChange(text)}
            returnKeyType='search'
            platform='ios'
            value={value}
            containerStyle={{
              backgroundColor: 'transparent',
              width: '100%',
              alignSelf: 'center',
            }}
            cancelButtonProps={{
              color: themeContext.palette.primary.color.primary,
            }}
            inputContainerStyle={{
              height: 40,
              backgroundColor: themeContext.palette.secondary.background,
              paddingHorizontal: 10,
              borderBottomColor: 'transparent',
              borderRadius: 14,
            }}
          />
          // <Input
          //   onPressIn={() => { }}
          //   placeholder='Search'
          //   value={value}
          //   returnKeyType='search'
          //   onChangeText={text => onChange(text)}
          //   underlineColorAndroid='transparent'
          //   inputContainerStyle={{
          //     borderBottomColor: 'transparent',
          //     paddingHorizontal: 10,
          //     backgroundColor: themeContext.palette.secondary.background,
          //     borderRadius: 14,
          //   }}
          //   inputStyle={{
          //     color: themeContext.palette.primary.color.primary,
          //   }}
          //   containerStyle={{ marginTop: 10 }}
          //   rightIcon={
          //     <Pressable onPress={() => reset()}>
          //       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          //         {!!value.length && (
          //           <RNEText500>
          //             Cancel
          //           </RNEText500>
          //           // <Icon
          //           //   type='ionicon'
          //           //   name="close-circle"
          //           //   size={25}
          //           //   color={themeContext.palette.primary.color.primary}
          //           //   onPress={() => reset()}
          //           // />
          //         )}
          //         {/* <View style={{ height: 35, width: 35, borderRadius: 20, backgroundColor: 'blue', marginLeft: 5 }} /> */}
          //       </View>
          //     </Pressable>
          //   }
          // />
        )}
      />
    </OuterView >
  )
}

const OuterView = styled.View`
`;