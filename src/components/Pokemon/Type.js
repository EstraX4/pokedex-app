import { StyleSheet, View, Text } from "react-native";
import { map, capitalize } from "lodash";
import getColorByPokemonType from "../../utils/getColorType";
import React from "react";

export default function Type(props) {
  const { types } = props;

  return (
    <View style={styles.content}>
      {map(types, (item, index) => (
        <View
          key={index}
          style={{
            ...styles.pill,
            backgroundColor: getColorByPokemonType(item.type.name),
          }}
        >
          <Text style={styles.nameText}>{capitalize(item.type.name)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pill: {
    width: 90,
    height: 30,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  nameText: {
    textAlign: "center",
    color: "#fff",
  },
});
