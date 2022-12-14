import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { Searchbar } from "react-native-paper";
import { getPokemonApi, getPokemonDetailsByUrlApi } from "../api/pokemon";
import { PokemonList } from "../components";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [pokemonsFilter, setPokemonsFilter] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [searchQuery, setSearchQuery] = React.useState("");

  useEffect(() => {
    (async () => {
      //showToast()
      Toast.show({
        type: "info",
        text1: "Loading pokemons",
        text2: "This may take a while  ⏳",
        autoHide: false,
      });
      await loadPokemons();
      Toast.hide();
    })();
  }, []);

  const showToast = () => {
    ToastAndroid.showWithGravity(
      "🐱 Loading pokemons, this may take a while ⏳",
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
  };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if (pokemons.length > 0) {
      if (query === "" || query.length === 0) {
        setPokemonsFilter(pokemons);
        setIsSearching(false);
      } else {
        setIsSearching(true);
        const search = searchQuery.toLowerCase();
        const tempPokemonsFilter = pokemons.filter((pokemon) =>
          pokemon.name.includes(search)
        );
        setPokemonsFilter(tempPokemonsFilter);
      }
    }
  };

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
      setPokemonsFilter([...pokemons, ...pokemonsArray]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Toast position="bottom" bottomOffset={30} />
      <SafeAreaView>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={pokemons.length > 0 ? searchQuery : "Loading..."}
          style={{ paddingTop: 30 }}
        />
        <PokemonList
          pokemons={pokemonsFilter}
          loadPokemons={loadPokemons}
          isNext={nextUrl}
          isSearching={isSearching}
        />
      </SafeAreaView>
    </>
  );
}
