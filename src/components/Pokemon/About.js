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
        <View style={styles.blockInfo}>
          <Text style={styles.number}>{capitalize(weight / 10)} kg</Text>
          <Text style={styles.number}>{capitalize(height / 10)} m</Text>
          <View style={styles.blockInfoMoves}>
            {map(newMoves, (item, index) => (
              <Text key={index} style={styles.movesT}>
                {capitalize(item.move.name)}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.blockTitle}>
          <Text style={styles.title}>Weight</Text>
          <Text style={styles.title}>Height</Text>
          <Text style={styles.titleM}>Moves</Text>
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
    paddingBottom: 15,
  },
  title: {
    width: "30%",
    textAlign: "center",
    height: 50,
    textAlign: "center",
    fontSize: 12,
    color: "#666666",
  },
  titleM: {
    width: "30%",
    textAlign: "center",
    paddingLeft: 19,
    height: 50,
    textAlign: "center",
    fontSize: 12,
    color: "#666666",
  },
  block: {},
  blockInfo: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    width: "90%",
  },
  blockTitle: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    width: "90%",
  },
  blockInfoMoves: {
    width: "30%",
  },
  number: {
    width: "30%",
    textAlign: "center",
    height: 50,
    paddingTop: 14,
    marginTop: 2,
    fontSize: 16,
    color: "#000",
    borderRightColor: "black",
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  movesT: {
    textAlign: "center",
    width: 110,
    height: 30,
    fontSize: 16,
    color: "#000",
  },
});
