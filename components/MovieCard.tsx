import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { IMovie } from '@/helpers/types'
import { Link } from 'expo-router'
import SkeletonLoader from './SkeletionLoader'

const MovieCard = (item: IMovie) => {
  return (
        <Link href={`/movies/${item.id}`} asChild>
          <TouchableOpacity style={styles.movieCard}>
            <SkeletonLoader style={styles.thumbnail}/>
              {/* <Image
                  source={{ uri: `https://placehold.co/600x400/1a1a1a/ffffff.png` }}
                  style={styles.thumbnail}
              /> */}
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
    thumbnail: {
        width: '100%',
        height: 225,
        borderRadius: 10,
    },
    title: {
        marginTop: 8,
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
})