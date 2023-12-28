import React from "react";
import { Text, TouchableOpacity, SafeAreaView, StyleSheet, Image, Dimensions } from "react-native";

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        bottom: (ScreenHeight * -0.20)
    },
    button : {
        margin: 6,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold'
    },
    logo: {
        width: ScreenWidth * 0.4,
        height: ScreenWidth * 0.4,
        alignItems: 'center'
    },
})

const image = require('./mudkip.png');

const Profile = () => {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => console.log("Updating profile picture....")}>
                <Image source={image} style={styles.logo}/>
            </TouchableOpacity>
            
            <TouchableOpacity
            style={[styles.button]}
            onPress={() => {console.log("Adding Library....");}}
            >
                <Text style={[styles.buttonText]}>Add New Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.button]}
            onPress={() => {console.log("Switching Library....");}}
            >
                <Text style={[styles.buttonText]}>Switch Library</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => console.log("Logging out....")}
            >
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>        
    )
};


export default Profile;