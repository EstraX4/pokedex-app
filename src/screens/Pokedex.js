import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { getPokemonApi, getPokemonDetailsByUrlApi } from "../api/pokemon";
import { PokemonList } from "../components";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";

export default function Pokedex(props) {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [pokemonsFilter, setPokemonsFilter] = useState([]);
 
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.name.first
          ? item.name.first.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.idexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  useEffect(() => {
    (async () => {
      await loadPokemons();
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     await AsyncStorage.removeItem("pokemonsfav");
  //   })();
  // }, []);

  const loadPokemons = async () => {
    try {
      const response = await getPokemonApi(nextUrl);
      setNextUrl(response.next);

      const pokemonsArray = [];
      for await (const pokemon of response.results) {
        const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);

        pokemonsArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          order: pokemonDetails.order,
          image: pokemonDetails.sprites.other["official-artwork"].front_default,
          weight: pokemonDetails.weight,
          height: pokemonDetails.height,
          moves: pokemonDetails.moves,
        });
      }
      setPokemons([...pokemons, ...pokemonsArray]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <Searchbar style={{ paddingTop: 45 }} />
      <PokemonList
        pokemons={pokemons}
        loadPokemons={loadPokemons}
        isNext={nextUrl}
      />
    </SafeAreaView>
  );
}
