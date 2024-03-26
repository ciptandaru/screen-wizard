import {createStackNavigator} from "@react-navigation/stack";
import WizardScreen1 from "./WizardScreen1";
import WizardScreen2 from "./WizardScreen2";
import WizardScreen3 from "./WizardScreen3";

const Stack = createStackNavigator();

const Wizard = () => {
  return (
    <Stack.Navigator
      tabBarOptions={{
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      }}
    >
      <Stack.Screen name="Screen 1" component={WizardScreen1} />
      <Stack.Screen name="Screen 2" component={WizardScreen2} />
      <Stack.Screen name="Screen 3" component={WizardScreen3} />
    </Stack.Navigator>
  );
};

export default Wizard;
