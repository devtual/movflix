import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { View, TextInput, TextInputProps } from 'react-native';

const SearchBar = forwardRef(({ ...props }: TextInputProps, ref) => {
  const inputRef = useRef<TextInput>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    clear: () => {
      inputRef.current?.clear();
    }
  }));

  return (
    <View className="flex-row bg-dark-500 rounded-full">
      <TextInput
        ref={inputRef}
        placeholderTextColor="#A8B5DB"
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        className="flex-1 ml-2 text-white px-4"
        {...props}
      />
    </View>
  );
});

export default SearchBar;
