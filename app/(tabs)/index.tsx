import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { usePaginatedFetch } from "@/hooks/usePaginatedFetch";
import { TMDB } from "@/services/tmdb";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, Text, ScrollView, Button, TouchableOpacity, Pressable } from "react-native";

const Home = () => {
    const tmdb = TMDB.getInstance();
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    const fetchMovies = useCallback(() => tmdb.getMovies("", page), [tmdb, page]);

    const { data: movies, loading } = usePaginatedFetch(fetchMovies, setLoadingMore, [page]);
    
    if (loading) {
        return <View style={styles.container}><ActivityIndicator size="large" color="#E50914" style={styles.loader} /></View>
    }

    const keyExtractor = (item: any, index: number) => item.id.toString() + index;

    const navigateToSearch = () => {
        router.push("/search")
    }

    const getMoreMovies = () => {
        setLoadingMore(true);
        setPage(prevPage => prevPage + 1)      
    }


    return (
        
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          <TouchableOpacity activeOpacity={1} onPress={navigateToSearch}>
             <SearchBar onPress={navigateToSearch} editable={false} placeholder="Search through 300+ movies online"  />
             <Text className="text-white my-4 text-lg">Latest Movies</Text>
            </TouchableOpacity>
            <FlatList
                data={movies}
                keyExtractor={keyExtractor}
                numColumns={3}
                renderItem={({item}) => <MovieCard {...item} />}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  gap: 20
                }}
                scrollEnabled={false}
                ListFooterComponent={
                    loadingMore ? (
                        <ActivityIndicator size="small" color="#E50914" />
                    ) : (              
            <TouchableOpacity activeOpacity={0.95} className="bg-primary-400 justify-center items-center h-14 rounded-full" onPress={getMoreMovies}>
                <Text className="text-white text-lg">Load More</Text>
            </TouchableOpacity>
                    )}
            />
            </ScrollView>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#030014"
    },
    contentContainer: {
        padding: 16
    },
    loader: {
        flex: 1,
        justifyContent: "center",
    }
});

export default Home;