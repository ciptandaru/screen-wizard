import {StyleSheet, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {Provider} from "react-native-paper";
import TabNavigator from "./src/screen/TabNavigator";

export default function App() {
  return (
    <View style={styles.container}>
      <Provider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
