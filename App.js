import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Game from "./components/Game";
import Overview from "./components/Overview";
import useChosenWord from "./hooks/useChosenWord";
import useChosenWordSimple from "./hooks/useChosenWordSimple";
export default function App() {
  return (
    <View style={styles.container}>
      <Text>
        <Overview />
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

// ...
// guesses
// <GuessList {guesses} />
