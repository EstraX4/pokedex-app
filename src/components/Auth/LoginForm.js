import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Keyboard } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { user, userDetails } from "../../utils/userDB";
import useAuth from "../../hooks/useAuth";
import { Button } from "react-native-paper";

export default function LoginForm() {
  const [error, setError] = useState("");
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formValue) => {
      setError("");
      const { username, password } = formValue;

      if (username !== user.username || password !== user.password) {
        setError("The username or password is not correct");
      } else {
        login(userDetails);
      }
    },
  });

  return (
    <View style={styles.content}>
      <Text style={styles.title}>LOG IN</Text>
      <TextInput
        placeholder="Name of user"
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.username}
        onChangeText={(text) => formik.setFieldValue("username", text)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />
      <View style={styles.button}>
        <Button
          mode="contained"
          buttonColor="#000"
          textColor="#fff"
          textDecorationLine="underline line-through"
          onPress={formik.handleSubmit}
          borderRadius= "20px"
        >
          CHECK IN
        </Button>
      </View>
      <Text style={styles.error}>{formik.errors.username}</Text>
      <Text style={styles.error}>{formik.errors.password}</Text>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

function initialValues() {
  return {
    username: "",
    password: "",
  };
}

function validationSchema() {
  return {
    username: Yup.string().required("The user is required."),
    password: Yup.string().required("password is required."),
  };
}

const styles = StyleSheet.create({
  content: {
    marginTop: "35%",
    marginBottom: "35%",
    height: "30%",
  },
  title: {
    textAlign: "center",
    fontSize: 38,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  error: {
    textAlign: "center",
    color: "#f00",
    marginTop: 20,
  },
  button: {
    marginTop: 20,
     marginRight: "3%", 
     marginLeft: "3%",
    width: "94%",
  }
});
