import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

export default function NoLogged() {
  const navigation = useNavigation();

  return (
    <View style={styles.content}>
      <Text style={styles.text}>To see this screen you have to log in</Text>
      <View style={styles.contentB}>
        <Button
          mode="contained"
          buttonColor="#000"
          textColor="#fff"
          textDecorationLine="underline line-through"
          onPress={() => navigation.navigate("Account")}
        >
          Go to login
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: "80%",
    height: "20%",
  },
  contentB: {
    width: "70%",
    marginRight: "15%",
    marginLeft: "15%",
  },
  text: {
    textAlign: "center",
    marginBottom: 10,
  },
});
