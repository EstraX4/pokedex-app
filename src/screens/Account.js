import { View, Text } from "react-native";
import React from "react";
import { LoginForm, UserData } from "../components/Auth";
import useAuth from "../hooks/useAuth";

export default function Account() {
  const { auth } = useAuth();

  return <View>{auth ? <UserData /> : <LoginForm />}</View>;
}