import { ScrollView, Text, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { getPokemonDetailApi } from "../api/pokemon";
import { Header, Type, Stats, About, Evolutions, Favorite } from "../components/Pokemon";
import { capitalize } from "lodash";
import Icon from "react-native-vector-icons/FontAwesome5";
import { BorderlessButton } from "react-native-gesture-handler";
import getColorByPokemonType from "../utils/getColorType";
import useAuth from "../hooks/useAuth";

export default function Pokemon(props) {
  const {
    navigation,
    route: { params },
  } = props;
  const [pokemon, setPokemon] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const res = await getPokemonDetailApi(params.id);
        setPokemon(res);
      } catch (error) {
        console.error(error);
        navigation.goBack();
      }
    })();
  }, [params]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => auth && <Favorite id={pokemon?.id}/>,
      headerLeft: () => (
        <Icon
          name="arrow-left"
          color="#fff"
          size={30}
          style={{ marginLeft: 20 }}
          onPress={navigation.goBack}
        />
      ),
    });
  }, [navigation, params, pokemon]);

  if (!pokemon) return null;


  return (
    <ScrollView
      style={{
        borderColor: getColorByPokemonType(pokemon.types[0].type.name),
        backgroundColor: "white",
        borderWidth: 6,
      }}
    >
      <Header
        name={pokemon.name}
        id={pokemon.id}
        image={pokemon.sprites.other["official-artwork"].front_default}
        type={pokemon.types[0].type.name}
      />
      <Type types={pokemon.types} />
      <About
        weight={pokemon.weight}
        height={pokemon.height}
        type={pokemon.types[0].type.name}
        moves={pokemon.moves}
      />
      <Stats stats={pokemon.stats}  type={pokemon.types[0].type.name} />
      <Evolutions species={pokemon.species.url} type={pokemon.types[0].type.name} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerRightText: {
    marginRight: 140,
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  number: {
    color: "#fff",
    fontSize: 30,
  },
});
