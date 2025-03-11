import React from 'react'
import { View, TextInput, Image, StyleSheet, ViewStyle, TextStyle, StyleProp, TextInputProps } from 'react-native'

interface Props extends TextInputProps {
  formGroupStyle?: StyleProp<ViewStyle>;
  formControlWrap?: StyleProp<ViewStyle | TextStyle>;
  style?: StyleProp<TextStyle>;
}

const SearchBar = ({ formGroupStyle, style, ...props }: Props) => {

  return (
    <View style={formGroupStyle}>
      <View style={[styles.formControlWrap]}>
        <View style={styles.formControlPrepend}>
          {/* <Image source={newIcon?require('../assets/images/icons/search-normal-new.png' ):require('../assets/images/icons/search-normal.png')} /> */}
        </View>
        <TextInput
          style={[styles.formControl]}
          selectionColor="rgba(202, 206, 255, 0.6)"
          autoCapitalize="none"
          keyboardAppearance='dark'
          underlineColorAndroid="transparent"
          {...props}
        />
      </View>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    formControlWrap: {
        position: 'relative',
        flexDirection: 'row',
        display: 'flex',
        borderRadius:50,
        backgroundColor: '#fffff'
    },
    newFormControlWrap: {
      borderWidth: 1.5,
    },
    formControl: {
        flex: 1,
        backgroundColor: '#ffffff',
        
    },
    newFormControl: {
      flex: 1,
      
    },
    formControlPrepend: {
        justifyContent: 'center',
    }
  })
