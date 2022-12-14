import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
  View
} from "react-native";
import React from "react";
import PokemonCard from "./PokemonCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PokemonList(props) {
  const { pokemons, loadPokemons, isNext, isSearching } = props;

  const loadMore = () => {
    loadPokemons();
  };

  return (
    <View>
    <FlatList
      data={pokemons}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(pokemon) => String(pokemon.id)}
      renderItem={({ item }) => <PokemonCard pokemon={item} />}
      contentContainerStyle={styles.flatListContentContainer}
      onEndReached={!isSearching && isNext && loadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        !isSearching && isNext && (
          <ActivityIndicator
            size="large"
            style={styles.spinner}
            color="#AEAEAE"
          />
        )
      }
    />
    </View>
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
  },
  spinner: {
    marginTop: 10,
    marginBottom: 60,
  },
});
