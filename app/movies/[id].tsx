import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { TMDB } from '@/services/tmdb';
import { useFetch } from '@/hooks/useFetch';

const MovieDetails = () => {
  const tmdb = TMDB.getInstance();
  const { id } = useLocalSearchParams();
  const {data} = useFetch(() => tmdb.getMovieDetails(id as string));

  return (
    <View className='bg-dark-600 flex-1'>
      <Text className='text-white'>Movie Details {data?.title}</Text>
    </View>
  )
}

export default MovieDetails

const styles = StyleSheet.create({})