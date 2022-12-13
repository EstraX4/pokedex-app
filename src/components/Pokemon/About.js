import { StyleSheet, View, Text } from "react-native";
import { map, capitalize } from "lodash";
import getColorByPokemonType from "../../utils/getColorType";
import React from "react";

export default function About(props) {
  const { weight, height, moves, type } = props;

  const newMoves = moves.slice(0, 2);

  return (
    <View style={styles.content}>
      <Text
        style={{
          ...styles.titleMax,
          color: getColorByPokemonType(type),
        }}
      >
        About
      </Text>
      <View style={styles.block}>
        <View style={styles.blockTitle}>
          <Text style={styles.number}>{capitalize(weight / 10)} kg</Text>
          <Text style={styles.title}>Weight</Text>
        </View>
        <View style={styles.blockTitle}>
          <Text style={styles.number}>{capitalize(height / 10)} m</Text>
          <Text style={styles.title}>Height</Text>
        </View>
        <View style={styles.blockTitle}>
          {map(newMoves, (item, index) => (
            <Text key={index} style={styles.movesT}>
              {capitalize(item.move.name)}
            </Text>
          ))}

          <Text style={styles.title}>Moves</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 0,
  },
  titleMax: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 12,
    color: "#666666",
  },
  block: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  blockTitle: {
    width: "30%",
  },
  number: {
    textAlign: "center",
    height: 50,
    paddingTop: 10,
    marginTop: 2,
    fontSize: 16,
    color: "#000",
  },
  movesT: {
    textAlign: "center",
    width: 110,
    height: 50,
    marginTop: 2,
    fontSize: 16,
    color: "#000",
  },
});
