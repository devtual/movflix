import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { useFetch } from "@/hooks/useFetch";
import { TMDB } from "@/services/tmdb";
import React, { useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, Text, ScrollView } from "react-native";

const Home = () => {
    const tmdb = TMDB.getInstance();
    const [searchQuery, setSearchQuery] = useState('');

    const {data: movies, loading } = useFetch(() => tmdb.fetchMovies(searchQuery), [searchQuery]);
    const {data: tmovies, } = useFetch(() => tmdb.fetchTrendingMovies(), [searchQuery]);
    

    if (loading) {
        return <ActivityIndicator size="large" color="#E50914" style={styles.loader} />;
    }

    const keyExtractor = (item: any, index: number) => {
      return item.id.toString() + index;
    }

    const onChange = (txt: string) => {
      setSearchQuery(txt);
      console.log('txt', txt)
    }


    return (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
          {/* <FlatList
                horizontal
            
                data={movies}
                keyExtractor={keyExtractor}
                
                renderItem={({item}) => <MovieCard {...item} />}
               
                ListHeaderComponent={<SearchBar onChangeText={onChange}  />}
            /> */}
             <SearchBar onChangeText={onChange}  />
             <Text>Latest Movies</Text>
            <FlatList
                data={movies}
                keyExtractor={keyExtractor}
                numColumns={3}
                renderItem={({item}) => <MovieCard {...item} />}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 20
                }}
                scrollEnabled={false}
            />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 16,
        paddingBottom: 120
    },
    loader: {
        flex: 1,
        justifyContent: "center",
    }
});

export default Home;