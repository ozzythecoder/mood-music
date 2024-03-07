import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Button,
} from "react-native";
import LoginForm from "../components/LoginForm";
import LoginUserButton from "../components/LoginUserButton";

type LoginType = {
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
};

const LoginAppScreen = ({ navigation }: { navigation: any }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome To Mood Music</Text>
            <LoginForm
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
            />
            <LoginUserButton
                username={username}
                password={password}
                navigation={navigation}
            />
        </View>
    );
};

export default LoginAppScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: "black",
        marginBottom: 35,
        justifyContent: "center",
        textAlign: "center",
    },
});
