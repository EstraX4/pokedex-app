import { StyleSheet, View, Text, Image } from "react-native";
import { map, capitalize } from "lodash";
import getColorByPokemonType from "../../utils/getColorType";
import React from "react";
import { getHttp } from "../../api/pokemon";

export default function Evolution(props) {
  const { species, type } = props;
  const [evolutions, setEvolutions] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        const speciesRes = await fetch(species);
        const speciesJson = await speciesRes.json();

        const evolutionRes = await fetch(speciesJson.evolution_chain.url);
        const evolutionJson = await evolutionRes.json();
        setEvolutions(evolutionJson);

        console.log(evolutionJson);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [species]);

  return (
      <View style={styles.content}>
        <Text
          style={{
            ...styles.title,
            color: getColorByPokemonType(type),
          }}
        >
          Evolution
        </Text>
        <View>
          <View>
            <Image
              source={require("../../assets/pokeballT.png")}
              style={styles.evolucionImage}
            />
          </View>
          <View>
            <Image
              source={require("../../assets/pokeballT.png")}
              style={styles.evolucionImage}
            />
          </View>
          <View>
            <Image
              source={require("../../assets/pokeballT.png")}
              style={styles.evolucionImage}
            />
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
  title: {},
  evolucionImage: {},
});
