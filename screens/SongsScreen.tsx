import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


export default function Songs() {
    return (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <Text>Howdy!!</Text>
            <StatusBar style="auto" />
          </View>
        </SafeAreaView >
    );
  }
  
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });