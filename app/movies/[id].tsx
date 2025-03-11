import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { TMDB } from '@/services/tmdb';

const MovieDetails = () => {
  const tmdb = TMDB.getInstance();
  const { id } = useLocalSearchParams();

  return (
    <View className='bg-dark-600 flex-1'>
      <Text className='text-white'>Movie Details {id}</Text>
    </View>
  )
}

export default MovieDetails

const styles = StyleSheet.create({})