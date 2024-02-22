import React, { Dispatch, SetStateAction } from "react";
import { TextInput, View, StyleSheet } from "react-native";

type LoginType = {
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
};

const LoginForm = ({ username, setUsername, password, setPassword }: LoginType) => {
    return (
        <View style={styles.form}>
            <TextInput
                autoCapitalize="none"
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
        </View>
    );
};

export default LoginForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
    },
    form: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: "bold",
    },
    input: {
        height: 40,
        borderColor: "#ddd",
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
    },
    button: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
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
