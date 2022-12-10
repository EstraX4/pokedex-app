import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

export default function PokemonCard(props) {
  const { pokemon } = props;

  const goToPokemon = () => {
    console.log(`Vamos al pokemon: ${pokemon.name}`);
  };

  return (
    <TouchableWithoutFeedback onPress={goToPokemon}>
      <View style={styles.card}>
        <View style={styles.spacing}>
          <View style={styles.bgStyles}>
            <Text>{pokemon.name}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 130,
  },
  spacing: {
    flex: 1,
    padding: 5,
  },
  bgStyles: {
    backgroundColor: "red",
  },
});
