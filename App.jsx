import { StatusBar } from "expo-status-bar";
import { Header as HeaderRNE } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import MainScreen from "./App/screens/MainScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <HeaderRNE
          centerComponent={{
            text: "Forex",
            style: styles.heading,
          }}
        />
        <MainScreen />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#397af8",
    marginBottom: 20,
    width: "100%",
    paddingVertical: 15,
  },
  heading: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
});
