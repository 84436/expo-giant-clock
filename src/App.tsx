import { FontMap, useFonts } from "expo-font";
import { useKeepAwake } from "expo-keep-awake";
import { NavigationBar } from "expo-navigation-bar";
import { hideAsync } from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useReducer, useState } from "react";
import { StyleSheet, Text, TextLayoutEvent, useWindowDimensions, View } from "react-native";

export function App() {
  const [fontsLoaded] = useFonts(FONTS);

  const { now } = useNowEverySecond();
  const [hour0, hour1, minute0, minute1] = toTimeDigits(now);

  const [textLayout, setTextLayout] = useState<TextLayoutEvent["nativeEvent"]>();
  const computedStyle = useComputedStyle(textLayout);

  useKeepAwake();

  useEffect(() => {
    if (fontsLoaded) {
      hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.slot}>
        <Text
          style={[computedStyle.digit, styles.digit, styles.hourDigit]}
          onTextLayout={(event) => {
            if (!textLayout) {
              setTextLayout(event.nativeEvent);
            }
          }}
        >
          {hour0}
        </Text>
      </View>
      <View style={styles.slot}>
        <Text style={[computedStyle.digit, styles.digit, styles.hourDigit, styles.alternateDigit]}>
          {hour1}
        </Text>
      </View>
      <View style={styles.slot}>
        <Text style={[computedStyle.digit, styles.digit, styles.minuteDigit]}>{minute0}</Text>
      </View>
      <View style={styles.slot}>
        <Text
          style={[computedStyle.digit, styles.digit, styles.minuteDigit, styles.alternateDigit]}
        >
          {minute1}
        </Text>
      </View>
      <NavigationBar hidden />
    </View>
  );
}

const FONTS: FontMap = {
  Inter_Digits: require("@assets/fonts/Inter_Digits.ttf"),
};

function useNowEverySecond() {
  const [now, tick] = useReducer(
    () => new Date(),
    undefined,
    () => new Date(),
  );
  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return { now };
}

function toTimeDigits(date: Date) {
  const hour = `${date.getHours() % 12 || 12}`.padStart(2, "0");
  const minute = `${date.getMinutes()}`.padStart(2, "0");
  return [hour[0], hour[1], minute[0], minute[1]];

  // const digit = 0
  // return [`${digit}`, `${digit}`, `${digit}`, `${digit}`];
}

function useComputedStyle(textLayout?: TextLayoutEvent["nativeEvent"]) {
  const { height: windowHeight } = useWindowDimensions();

  const line = textLayout?.lines[0];
  const capHeight = line ? line.capHeight / line.height : 1;
  const ascender = line ? line.ascender / line.height : 1;
  const fontSize = windowHeight / capHeight;

  return StyleSheet.create({
    digit: {
      fontSize,
      lineHeight: fontSize,
      marginTop: -(ascender - capHeight) * fontSize,
      marginHorizontal: -fontSize / 2,
    },
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    columnGap: 4,
    backgroundColor: "hsla(0 0% 0% / 1.00)",
  },
  slot: {
    flex: 1,
    overflow: "hidden",
  },
  digit: {
    fontFamily: "Inter_Digits",
    textAlign: "center",
  },
  hourDigit: {
    // color: "hsla(0 100% 100% / 1.00)",
    color: "hsla(150 100% 50% / 1.00)",
  },
  minuteDigit: {
    // color: "hsla(0 0% 60% / 1.00)",
    color: "hsla(150 80% 40% / 1.00)",
  },
  alternateDigit: {
    backgroundColor: "hsla(0 0% 100% / 0.15)",
  },
});
