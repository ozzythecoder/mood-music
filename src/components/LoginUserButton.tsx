import React from "react";
import { useDispatch, useSelector} from "react-redux";
import {StyleSheet, Text, TouchableOpacity} from "react-native";

const LoginUserButton = ({
    username,
    password,
    navigation,
}: {
    username: string;
    password: string;
    navigation: any;
}) => {
    const dispatch = useDispatch();

    console.log(username);
    console.log(password);

    const handleLoginUser = (
        username: string,
        password: string
    ) => {
        const user = {username, password};
        const success =  dispatch({type: "LOGIN", payload: user});

        console.log("SUCCESS:      ", success)
       
        if(success) {
            navigation.navigate("Profile")
        }
    }

    return (
        <TouchableOpacity style={styles.button} onPress={() => {
            handleLoginUser(username, password);
        }}
        >
            <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
    )

}

export default LoginUserButton;

const styles = StyleSheet.create({
    button: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
  });