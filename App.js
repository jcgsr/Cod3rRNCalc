// 28.02.2022
// Diana no Abais desde sáb 26. Fomos ontem e iremos hj novamente, dessa vez para dormirmos. Cotoco vai tbm.

import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from "./src/components/Button";
import Display from "./src/components/Display";

export default function App() {
  const [displayValue, setDisplayValue] = useState("0");
  const [clearDisplay, setClearDisplay] = useState(false);
  const [operations, setOperations] = useState(null);
  const [values, setValues] = useState([0, 0]);
  const [current, setCurrent] = useState(0);

  const addDigit = (n) => {
    const clearDisplayValue = displayValue === "0" || clearDisplay;
    if (n === "." && !clearDisplay && displayValue.includes(".")) {
      return;
    }
    const currentValue = clearDisplayValue ? "" : displayValue;
    const displayValue = currentValue + n;
    setDisplayValue(displayValue);
    setClearDisplay(false);

    if (n !== ".") {
      const newValue = parseFloat(displayValue);
      const valuesArr = [values];
      valuesArr[current] = newValue;
      setValues(valuesArr);
    }
  };

  const clearMemory = () => {
    setDisplayValue("0");
  };

  const setOp = (operation) => {
    if (current === 0) {
      setOperations(operation);
      setCurrent(1);
      setClearDisplay(true);
    } else {
      const equals = operation === "=";
      const values = [...values];
    }
    try {
      values[0] = eval(`${values[0]} ${operations} ${values[1]}`);
    } catch (e) {
      values[0] = values[0];
    }
    values[1] = 0;
    setDisplayValue(String(values[0]));
    setOperations(equals ? null : operation);
    setCurrent(equals ? 0 : 1);
    setClearDisplay(true);
    setValues(values);
  };
  return (
    <View style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        <Button label="AC" triple onClick={clearMemory} />
        <Button label="/" operation onClick={() => setOp("/")} />
        <Button label="7" onClick={() => addDigit(7)} />
        <Button label="8" onClick={() => addDigit(8)} />
        <Button label="9" onClick={() => addDigit(9)} />
        <Button label="*" operation onClick={() => setOp("*")} />
        <Button label="4" onClick={() => addDigit(4)} />
        <Button label="5" onClick={() => addDigit(5)} />
        <Button label="6" onClick={() => addDigit(6)} />
        <Button label="-" operation onClick={() => setOp("-")} />
        <Button label="1" onClick={() => addDigit(1)} />
        <Button label="2" onClick={() => addDigit(2)} />
        <Button label="3" onClick={() => addDigit(3)} />
        <Button label="+" operation onClick={() => setOp("+")} />
        <Button label="0" double onClick={() => addDigit(0)} />
        <Button label="." onClick={() => addDigit(".")} />
        <Button label="=" operation onClick={() => setOp("=")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
