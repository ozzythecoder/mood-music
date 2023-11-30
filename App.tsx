import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import SongsScreen from "./src/screens/SongsScreen";
import SongMoodModal from "./src/screens/SongMoodModal";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator<RootStackParamList>();
const SongStack = createStackNavigator();

type RootStackParamList = {
  Main: undefined;
  SongMoodModal: undefined;
};

function SongStackScreen() {
  return (
    <SongStack.Navigator>
      <SongStack.Screen name="Songs" component={SongsScreen} />
    </SongStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Songs") {
            iconName = focused ? "musical-notes" : "musical-notes-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Songs"
        component={SongsScreen}
        options={{ tabBarLabel: "Songs" }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name="Main"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <RootStack.Screen name="SongMoodModal" component={SongMoodModal} />
        </RootStack.Navigator>
      </NavigationContainer>
      </Provider>
  );
}
