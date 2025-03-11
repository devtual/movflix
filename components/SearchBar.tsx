import React from 'react'
import { View, TextInput, Image, StyleSheet, ViewStyle, TextStyle, StyleProp, TextInputProps } from 'react-native'

const SearchBar = ({ ...props }: TextInputProps) => {

  return (
    <View className='flex-row bg-dark-500 rounded-full'>
      {/* <Image source={require('../assets/images/icons/search-normal.png')} /> */}
      <TextInput
         placeholderTextColor="#A8B5DB"
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        className="flex-1 ml-2 text-white px-4"
        {...props}
      />
    </View>
  )
}

export default SearchBar
