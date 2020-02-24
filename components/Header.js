import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Colors from "../constants/Colors";

const Header = props => {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerANDROID
        })
      }}
    >
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: 30,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.accent
  },
  headerIOS: {
    backgroundColor: "red"
  },
  headerANDROID: {
    backgroundColor: "black"
  },

  headerTitle: {
    fontSize: 18,
    color: "#fff"
  }
});

export default Header;
