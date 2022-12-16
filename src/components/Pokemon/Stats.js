import { StyleSheet, View, Text } from "react-native";
import { map, capitalize } from "lodash";
import getColorByPokemonType from "../../utils/getColorType";
import React from "react";

export default function Stats(props) {
  const { stats, type, statT } = props;

  const barStyles = (number) => {
    const color = number > 49 ? "#00ac17" : "#ff3e3e";
    return {
      backgroundColor: color,
      width: `${number/2.55}%`,
    };
  };

  return (
    <View style={styles.content}>
      <Text
        style={{
          ...styles.title,
          color: getColorByPokemonType(type),
        }}
      >
        Base Stats
      </Text>
      {map(stats, (item, index) => (
        <View key={index} style={styles.block}>
          <View style={styles.blockTitle}>
            <Text
              style={{
                ...styles.statName,
                color: getColorByPokemonType(type),
              }}
            >
              {" "}
              {capitalize(item.stat.name)}
            </Text>
          </View>
          <View style={styles.blockInfo}>
            <Text style={styles.number}>{item.base_stat}</Text>
            <View style={styles.bgBar}>
              <View
                style={{
                  ...styles.bar,
                  ...barStyles(item.base_stat),
                  backgroundColor: getColorByPokemonType(type),
                }}
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 40,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 10,
  },
  block: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  blockTitle: {
    width: "30%",
  },
  statName: {
    fontSize: 12,
    color: "#6b6b6b",
  },
  blockInfo: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
  },
  number: {
    width: "12%",
    fontSize: 12,
    color: "#6b6b6b",
  },
  bgBar: {
    backgroundColor: "#dedede",
    width: "88%",
    height: 5,
    borderRadius: 20,
    overflow: "hidden",
  },
  bar: {
    // backgroundColor: "red",
    // width: "40%",
    height: 5,
    borderRadius: 20,
  },
});
