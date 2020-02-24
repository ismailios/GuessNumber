import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";
import { ScreenOrientation } from "expo";

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [btnStyle, setBtnStyle] = useState(Dimensions.get("window").width / 4);

  //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  useEffect(() => {
    const updateBtnStyle = () => {
      setBtnStyle(Dimensions.get("window").width / 4);
    };
    Dimensions.addEventListener("change", updateBtnStyle);
    console.log("change");
    return () => {
      Dimensions.removeEventListener("change", updateBtnStyle);
      console.log("remove change");
    };
  });

  const inputChangeHandler = inputText => {
    if (inputText) {
      setEnteredValue(inputText.replace(/[^0-9]/g, ""));
    }
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number", "Number Must Be Between 1 and 99", [
        {
          text: "Okey",
          onPress: inputChangeHandler,
          style: "destructive"
        }
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.containerSummary}>
        <Text>Selected Number</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onAddNumber(selectedNumber)}>
          Start A Game
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game</Text>
            <Card style={styles.inputContainer}>
              <Text>Select a Number</Text>
              <Input
                style={styles.TextInput}
                maxLength={2}
                keyboardType="number-pad"
                autoCorrect={false}
                blurOnSubmit
                autoCapitalize="none"
                onChangeText={inputChangeHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={{ width: btnStyle }}>
                  <Button
                    title="Reset"
                    onPress={resetInputHandler}
                    color={Colors.primary}
                  />
                </View>
                <View style={{ width: btnStyle }}>
                  <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={Colors.accent}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    flex: 1,
    alignItems: "center"
  },
  inputContainer: {
    width: Dimensions.get("window").width,
    maxWidth: "80%",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    paddingVertical: 10,
    fontFamily: "Sriracha-Regular"
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10
  },

  TextInput: {
    width: 50,
    textAlign: "center"
  },
  containerSummary: {
    alignItems: "center",
    marginTop: 20
  }
});

export default StartGameScreen;
