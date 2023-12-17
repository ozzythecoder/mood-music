
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import HomeScreen from "./src/screens/HomeScreen";
import SongsScreen from "./src/screens/SongsScreen";
import PlaylistsScreen from "./src/screens/PlaylistsScreen";
import SongMoodModal from "./src/screens/SongMoodModal";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator<RootStackParamList>();
const SongStack = createStackNavigator();
const PlaylistsStack = createStackNavigator();

type RootStackParamList = {
  Main: undefined;
  SongMoodModal: undefined;
};

// Function to add more screens to the song stack.
function SongStackScreen() {
  return (
    <SongStack.Navigator>
      <SongStack.Screen name="Songs" component={SongsScreen} />
    </SongStack.Navigator>
  );
}

function PlaylistsStackScreen() {
  return (
    <PlaylistsStack.Navigator>
      <PlaylistsStack.Screen name="Playlists" component={PlaylistsScreen} />
    </PlaylistsStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      // sets navigator icons and links
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Songs") {
            iconName = focused ? "musical-notes" : "musical-notes-outline";
          } else if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Playlists") {
            iconName = focused ? "list" : "list-outline";
          } else {
            iconName = "musical-notes";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      {/* Creates route on TabNavigator and links to SongScreen */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Songs"
        component={SongsScreen}
        options={{ tabBarLabel: "Songs" }}
      />
      <Tab.Screen
        name="Playlists"
        component={PlaylistsScreen}
        options={{ tabBarLabel: "Playlists" }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
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

export default App;
