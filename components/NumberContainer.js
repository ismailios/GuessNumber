import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../constants/Colors";

const NumberContainer = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.accent,
    borderRadius: 10,
    marginVertical: 10
  },
  number: {
    fontWeight: "bold",
    fontSize: 20
  }
});

export default NumberContainer;
