import React from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Image
        style={styles.imageOver}
        resizeMode="cover"
        source={require("../assets/images/gameover.jpg")}
      />
      <Text style={styles.title}>Game Is Over !!!</Text>
      <Text style={styles.whiteColor}>
        Number Of Rounds : {props.roundsNumber}
      </Text>
      <Text style={styles.whiteColor}>Number was : {props.userNumber}</Text>
      <Button title="Restart The Game" onPress={props.onRestart} color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageOver: {
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    right: 0
  },
  title: {
    fontSize: 20,
    paddingVertical: 10,
    fontFamily: "Sriracha-Regular",
    color: "#FFF"
  },
  whiteColor: {
    color: "#fff"
  }
});

export default GameOverScreen;
