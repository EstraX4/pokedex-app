import { ScrollView, Text, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { getPokemonDetailApi } from "../api/pokemon";
import { Header, Type, Stats } from "../components/Pokemon";
import { capitalize } from "lodash";
import Icon from "react-native-vector-icons/FontAwesome5";
import { BorderlessButton } from "react-native-gesture-handler";
import getColorByPokemonType from "../utils/getColorType";

export default function Pokemon(props) {
  const { name, id, image, type } = props;
  const {
    navigation,
    route: { params },
  } = props;
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
        name="heart"
        color="#fff"
        size={30}
        
        style={{ marginRight: 20, alignContent: "center"}}
        onPress={navigation.goBack}
      />
      ),
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
  }, [navigation, params]);

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
    <ScrollView style={{
      borderColor: getColorByPokemonType(pokemon.types[0].type.name),
      backgroundColor: "white",
      borderWidth: 6,
    }}>
      <Header
        name={pokemon.name}
        id={pokemon.id}
        image={pokemon.sprites.other["official-artwork"].front_default}
        type={pokemon.types[0].type.name}
      />
      <Type types={pokemon.types} />
      <Stats stats={pokemon.stats} type={pokemon.types[0].type.name} />
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
