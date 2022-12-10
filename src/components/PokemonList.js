import { StyleSheet, Text, FlatList } from "react-native";
import React from "react";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";

export default function PokemonList(props) {
  const { pokemons } = props;
  return (
    <FlatList
      data={pokemons}
      numColumns={1}
      showsVerticalScrollIndicator={false}
      keyExtractor={(pokemon) => String(pokemon.id)}
      renderItem={({ item }) => <Text>{item.name}</Text>}
      contentContainerStyle={styles.flatListContentContainer}
    />
  );
}

const styles  = StyleSheet.create({
    flatListContentContainer: {
        paddingHorizontal: 5
    }
})