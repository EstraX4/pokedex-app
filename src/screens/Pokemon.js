import { ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { getPokemonDetailApi } from "../api/pokemon";
import { Header } from "../components/Pokemon";

export default function Pokemon(props) {
  const {
    navigation,
    route: { params },
  } = props;
  const [pokemon, setPokemon] = useState(null);
  console.log(params.id);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonDetailApi(params.id);
        setPokemon(response);
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [params]);

  if (!pokemon) return null;

  return (
    <ScrollView>
      <Header
        name={pokemon.name}
        id={pokemon.id}
        image={pokemon.sprites.other["official-artwork"].front_default}
        type={pokemon.types[0].type.name}
      />
    </ScrollView>
  );
}
