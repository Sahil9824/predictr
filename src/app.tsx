import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, useColorScheme } from "react-native";

const App = () => {
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? "white" : "white",
    display: "flex",
    flex: 1,
  };
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar
            barStyle={"light-content"}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Navigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
