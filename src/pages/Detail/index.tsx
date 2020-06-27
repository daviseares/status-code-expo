import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';


interface Params {
    url: string;
}

const Detail: React.FC = () => {
    const navigate = useNavigation();
    const route = useRoute();
    const routeParams = route.params as Params;

    function handleNavigate() {
        navigate.goBack();
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.toolbar}>
                <TouchableOpacity
                    style={styles.back}
                    activeOpacity={0.6}
                    onPress={handleNavigate}
                >
                    <Icon name="chevron-left" size={30} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.title}>
                    Details
                </Text>
            </View>
            <WebView source={{ uri: routeParams.url }} style={{ marginTop: 20 }} />
        </SafeAreaView>
    );
}

export default Detail;

const styles = StyleSheet.create({
    toolbar: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
    },

    title: {
        marginTop: 5,
        fontFamily: 'Roboto_500Medium',
        color: "#fff",
        fontSize: 22,
    },
    back: {
        position: "absolute",
        left: 15,
        top: 6
    }
});