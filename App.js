import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import * as Font from "expo-font";
import { AppLoading } from "expo";

const fetchFonts = () => {
  return Font.loadAsync({
    "Sriracha-Regular": require("./assets/fonts/Sriracha-Regular.ttf")
  });
};

export default function App(props) {
  const [userNumber, setUserNumber] = useState();
  const [roundNumber, setRoundNumber] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onerror={err => console.log(err)}
      />
    );
  }

  const configureNewGameHandler = () => {
    setUserNumber(null);
    setRoundNumber(0);
  };

  const onAddNumber = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  const onGameOverHandler = rndNumber => {
    setRoundNumber(rndNumber);
  };

  let content = <StartGameScreen onAddNumber={onAddNumber} />;

  if (userNumber && roundNumber <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={onGameOverHandler} />
    );
  }
  if (roundNumber > 0) {
    content = (
      <GameOverScreen
        roundsNumber={roundNumber}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess A Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
