import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';



export function renderImage(language: string) {
    if (language == null) {
        return (
            <View style={[styles.view, { backgroundColor: "#3FC4FF" }]}>
                <Text style={styles.text}>N</Text>
            </View>
        )
    } else if (language == 'JavaScript') {
        return (
            <Image source={require('../assets/js.png')} />
        )
    } else if (language == 'TypeScript') {
        return (
            <Image source={require('../assets/ts.png')} />
        )
    } else if (language == 'Dart') {
        return (
            <View style={[styles.view, { backgroundColor: "#3FC4FF" }]}>
                <Text style={styles.text}>{language.substr(0, 1)}</Text>
            </View>
        )
    } else if (language == 'PHP') {
        return (
            <View style={[styles.view, { backgroundColor: "#617ab0" }]}>
                <Text style={styles.text}>{language.substr(0, 1)}</Text>
            </View>
        )
    } else if (language == 'HTML') {
        return (
            <View style={[styles.view, { backgroundColor: "#de4b26" }]}>
                <Text style={styles.text}>{language.substr(0, 1)}</Text>
            </View>
        )
    } else if (language == 'Java') {
        return (
            <View style={[styles.view, { backgroundColor: "#e62324" }]}>
                <Text style={styles.text}>{language.substr(0, 1)}</Text>
            </View>
        )
    } else if (language == 'CSS') {
        return (
            <View style={[styles.view, { backgroundColor: "#3e8abf" }]}>
                <Text style={styles.text}>{language.substr(0, 1)}</Text>
            </View>
        )

    } else {
        return (
            <View style={[styles.view, { backgroundColor: "#6C63FF" }]}>
                <Text style={styles.text}>{language.substr(0, 1)}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        width: 55,
        height: 55,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },

    text: {
        color: "#fff",
        fontFamily: 'Roboto_700Bold',
        fontSize: 40,
    }
});