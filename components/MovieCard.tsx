import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { IMovie } from '@/helpers/types'
import { Link } from 'expo-router'
import SkeletonLoader from './SkeletionLoader'

const MovieCard = (item: IMovie) => {
  return (
        <Link href={`/movies/${item.id}`} asChild>
          <TouchableOpacity activeOpacity={0.8} style={styles.movieCard}>
          <View style={styles.imageWrapper}>
          {/* Skeleton Loader */}
          <SkeletonLoader width={"100%"} height={225} borderRadius={10} />
          {/* Image (Loaded above Skeleton) */}
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
            style={styles.thumbnail}
          />
        </View>
              <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          </TouchableOpacity>
          </Link>
      )
}

export default React.memo(MovieCard)

const styles = StyleSheet.create({
    movieCard: {
        width: '30%',
        marginBottom: 16,
        alignItems: "center",
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
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
})

