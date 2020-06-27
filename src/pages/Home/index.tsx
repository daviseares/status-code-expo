import React, { useState, useEffect, useRef, createRef } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, Image, Alert } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

interface GithubData {
    id: number;
    html_url: string;
    name: string;
    description: string;
    language: string;
};


const Home: React.FC = () => {
    const inputRef = createRef<TextInput>();
    const navigation = useNavigation();
    const [githubUsername, setGithubUsername] = useState('');
    const [repositories, setRepositories] = useState<GithubData[]>([]);

    useEffect(() => {
        if (repositories.length > 0) {
            if (inputRef.current) {
                inputRef.current.clear();
            };

            navigation.navigate("Main", { repo: repositories, user: githubUsername });
        };
    }, [repositories]);

    function handleTextOnChange(text: string) {
        setGithubUsername(text);
    }

    async function handleGetGithubData() {
        if (githubUsername.length > 0) {
            try {
                const response = await api.get<GithubData[]>(`users/${githubUsername}/repos`);
                console.log(response.data);
                const result = response.data;

                const repo = result.map(repo => (
                    {
                        id: repo.id,
                        html_url: repo.html_url,
                        name: repo.name,
                        description: repo.description,
                        language: repo.language
                    }));

                setRepositories(repo);

            } catch (error) {
                console.log(error);
                Alert.alert("Usuário não encontrado! Tente novamente.");
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <View style={styles.area}>
                    <Text style={styles.logo}>
                        {"<StatusCode/>"}
                    </Text>
                </View>

                <View style={styles.area}>
                    <Text style={styles.description}>
                        Explore os seus repositórios no github de maneira prática.
                    </Text>
                    <TextInput
                        ref={inputRef}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={(text) => handleTextOnChange(text)}
                        placeholderTextColor="#6C63FF"
                        placeholder="Github Username"
                        style={styles.input}
                    />
                    <RectButton style={styles.button} onPress={handleGetGithubData}>
                        <Text style={styles.buttonText}>
                            EXPLORAR
                    </Text>
                        <View style={styles.buttonIcon}>
                            <Icon name="log-in" size={24} color="#FFF" />
                        </View>

                    </RectButton>
                </View>

                <View style={styles.area}>
                    <Image source={require('../../assets/home.png')} />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    main: {
        flex: 1,
        padding: 25,
        justifyContent: "space-between"
    },

    area: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    logo: {
        fontFamily: 'Roboto_500Medium',
        color: "#fff",
        fontSize: 40,
    },

    description: {
        fontFamily: 'Roboto_500Medium',
        color: "#fff",
        fontSize: 25,
        marginBottom: 40,
    },

    input: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 24,
        fontSize: 18,
        color: "#6C63FF",
        width: "100%",
    },

    button: {
        backgroundColor: '#6C63FF',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    },
});