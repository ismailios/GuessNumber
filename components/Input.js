import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = props => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderBottomColor: "#EEE",
    borderBottomWidth: 1,
    textAlign: "center"
  }
});

export default Input;
