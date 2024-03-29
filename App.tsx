import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SongsScreen from "./src/screens/SongsScreen";
import PlaylistsScreen from "./src/screens/PlaylistsScreen";
import SongMoodModal from "./src/screens/SongMoodModal";
import ProfileScreen from "./src/components/Profile";
import NewPlaylistScreen from "./src/screens/NewPlaylistScreen";
import SearchArtistSongsScreen from "./src/screens/SearchArtistSongsScreen";
import SelectedPlaylistModal from "./src/screens/SelectedPlaylistModal";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "./src/styles";

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator<RootStackParamList>();
const SongStack = createStackNavigator();
const PlaylistsStack = createStackNavigator();
const ProfileStack = createStackNavigator();

type RootStackParamList = {
    Main: undefined;
    SongMoodModal: undefined;
    SearchArtistSongsScreen: undefined;
    SelectedPlaylistModal: undefined;
};

// Function to add more screens to the song stack.
function SongStackScreen() {
    return (
        <SongStack.Navigator>
            <SongStack.Screen name="Songs" component={SongsScreen} />
        </SongStack.Navigator>
    );
}

function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="Profile" component={ProfileScreen} />
        </ProfileStack.Navigator>
    );
}

function PlaylistsStackScreen() {
    return (
        <PlaylistsStack.Navigator>
            <PlaylistsStack.Screen name="New Playlist" component={NewPlaylistScreen} />
            <PlaylistsStack.Screen name="Saved Playlists" component={PlaylistsScreen} />
            <PlaylistsStack.Screen name="SelectedPlaylistModal" component={SelectedPlaylistModal} />
        </PlaylistsStack.Navigator>
    );
}

const navigationIconNames: Record<string, string> = {
    Home: "home",
    Songs: "musical-notes",
    Playlists: "list",
    Login: "log-in",
    Profile: "person",
};

function TabNavigator() {
    return (
        <Tab.Navigator
            // sets navigator icons and links
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    const suffix = focused ? "" : "-outline";
                    const iconName = navigationIconNames[route.name] + suffix;
                    // not sure how best to satisfy this typescript error. A problem for another time
                    return <Ionicons name={iconName} size={focused ? 28 : 24} color={color} />;
                },
                tabBarActiveTintColor: Colors.text,
                tabBarInactiveTintColor: Colors.neutralDark,
                tabBarStyle: { backgroundColor: Colors.background },
            })}
        >
            {/* Creates route on TabNavigator and links to SongScreen */}
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ tabBarLabel: "Home", headerShown: false }}
            />
            <Tab.Screen
                name="Songs"
                component={SongsScreen}
                options={{ tabBarLabel: "Songs" }}
            />
            <Tab.Screen
                name="Playlists"
                // eslint-disable-next-line react/no-children-prop
                children={PlaylistsStackScreen}
                options={{ tabBarLabel: "Playlists" }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ tabBarLabel: "Profile" }}
            />
            <Tab.Screen
                name="Login"
                component={LoginScreen}
                options={{ tabBarLabel: "Login" }}
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
                    <RootStack.Screen
                        name="SongMoodModal"
                        component={SongMoodModal}
                    />
                    <RootStack.Screen
                        name="SearchArtistSongsScreen"
                        component={SearchArtistSongsScreen}
                    />
                    <RootStack.Screen
                        name="SelectedPlaylistModal"
                        component={SelectedPlaylistModal}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
