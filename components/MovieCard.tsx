import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { IMovie } from '@/helpers/types'
import { Link, useRouter } from 'expo-router'
import SkeletonLoader from './SkeletionLoader'
import { fontSizes } from '@/helpers/theme'

const MovieCard = (item: IMovie) => {
  return (
        <Link href={`/movies/${item.id}`} asChild>
          <TouchableOpacity activeOpacity={0.8} style={styles.movieCard}>
            <View style={styles.imageWrapper}>
              <SkeletonLoader width={"100%"} height={225} borderRadius={10} />
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.thumbnail}
              />
            </View>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <View className='flex-row items-center justify-start gap-x-1 mt-1'>
              <Image source={require("../assets/images/star.png")} className='size-4' />
              <Text className='text-light-400'>{item.vote_average/2}</Text>
            </View>
            <View className='flex-row mt-1'>
              <Text className='text-light-400'>{item.release_date.split('-')[0]}</Text>
            </View>
          </TouchableOpacity>
        </Link>
      )
}

export default React.memo(MovieCard)

const styles = StyleSheet.create({
    movieCard: {
        width: '30%',
        marginBottom: 16
    },
    imageWrapper: {
        width: "100%",
        height: 225,
        borderRadius: 10,
        position: "relative",
        overflow: "hidden",
    },
    thumbnail: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
        position: "absolute",
        top: 0,
        left: 0,
    },
    title: {
        marginTop: 8,
        color: "#FFF",
        fontSize: fontSizes(12),
        fontWeight: 500
    },
})

