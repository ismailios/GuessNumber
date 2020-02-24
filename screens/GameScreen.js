import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  Dimensions
} from "react-native";
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";
import { FontAwesome } from "@expo/vector-icons";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (value, numOfRound) => {
  return (
    <View key={value} style={styles.listItem}>
      <Text>#{numOfRound}</Text>
      <Text>{value}</Text>
    </View>
  );
};

const GameScreen = props => {
  const { userChoice, onGameOver } = props;
  const initailGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initailGuess);
  const [pastGuesses, setPastGuesses] = useState([initailGuess]);

  const currentLow = useRef(1);
  const currentHight = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("NO", "You're Wrong ...", [
        {
          text: "SORRY !!",
          style: "cancel"
        }
      ]);
      return;
    }

    if (direction === "lower") {
      currentHight.current = currentGuess;
    } else if (direction === "greater") {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHight.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    //setRounds(rndNumber => rndNumber + 1);
    setPastGuesses(curPastGuess => [nextNumber, ...curPastGuess]);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.container}>
        <Text>Opponent's Guess : </Text>
        <NumberContainer>{currentGuess}</NumberContainer>
      </Card>
      <View style={styles.btnContainer}>
        <MainButton onPress={() => nextGuessHandler("lower")}>
          <FontAwesome name="minus-circle" size={29} />
        </MainButton>
        <MainButton onPress={() => nextGuessHandler("greater")}>
          <FontAwesome name="plus-circle" size={29} />
        </MainButton>
      </View>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginTop: 20,
    flex: 1,
    alignItems: "center"
  },
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  btnContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    width: "80%"
  },
  listContainer: {
    width: Dimensions.get("window").width > 400 ? "80%" : "60%",
    flex: 1
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end"
  },

  listItem: {
    borderColor: "#CCC",
    borderWidth: 2,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default GameScreen;
