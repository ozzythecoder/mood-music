import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";

type SongSearchType = {
    librarySearch: string;
    setLibrarySearch: Dispatch<SetStateAction<string>>;
};

const SongSearch = ({
    librarySearch,
    setLibrarySearch,
}: SongSearchType) => {
    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <Feather
                    name="search"
                    size={20}
                    color="black"
                />
                {/* search input field */}
                <TextInput
                    style={styles.inputText}
                    placeholder="Search"
                    value={librarySearch}
                    clearButtonMode="always"
                    onChangeText={(text) => setLibrarySearch(text)}
                />
            </View>
        </View>
    );
};

export default SongSearch;

// styles
const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        alignItems: "center",
    },
    input: {
        padding: 10,
        width: "90%",
        alignItems: "center",
        flexDirection: "row",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 7,
    },
    inputText: {
        width: "90%",
        marginLeft: 5,

        fontSize: 20,
    },
});
