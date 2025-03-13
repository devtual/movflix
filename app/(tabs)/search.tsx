import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { useFetch } from "@/hooks/useFetch";
import { TMDB } from "@/services/tmdb";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, Text, ScrollView } from "react-native";

const Search = () => {
    const tmdb = TMDB.getInstance();
    const [searchQuery, setSearchQuery] = useState('');
    const fetchMovies = useCallback(() => tmdb.getMovies(searchQuery), [tmdb, searchQuery]);
    const {data: movies, loading, error, fetchData, reset } = useFetch(fetchMovies, false);
    const searchBarRef = useRef<{ focus: () => void; clear: () => void }>(null);


    const keyExtractor = (item: any, index: number) => {
      return item.id.toString() + index;
    }

    useFocusEffect(
        useCallback(() => {
            const timer = setTimeout(() => {
                if(searchBarRef.current){
                    searchBarRef.current.focus();
                }
            }, 50)
            
            return () => {
                if(searchBarRef.current){
                    searchBarRef.current.clear();
                    setSearchQuery("");
                }
                clearTimeout(timer);
            };
        }, [])
    );


    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.trim()) {
                fetchData();
            } else {
                reset();
            }
        }, 500);
    
        return () => {
            clearTimeout(timer);
        };
    
    }, [searchQuery]);

    const onChange = (txt: string) => {
      setSearchQuery(txt);
    }


    return (
       
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
            <SearchBar ref={searchBarRef} onChangeText={onChange} placeholder="Search through 300+ movies online"  />
            {loading && <ActivityIndicator size="large" color="#E50914" style={styles.loader} />}
            {!loading && <React.Fragment>
                    <Text className="text-white my-4 text-lg">Searh Result: {searchQuery}</Text>
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
                        ListEmptyComponent={
                            !loading && !error ? (<View className="mt-4">
                                <Text className="text-light-400 text-center">{searchQuery.trim() ? "No movies found" : "Search for a movie"}</Text>
                            </View>) : null
                        }
                    />
                </React.Fragment>
            }
            </ScrollView>
       
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#030014",
    },
    contentContainer: {
        padding: 16
    },
    loader: {
        flex: 1,
        justifyContent: "center",
    }
});

export default Search;