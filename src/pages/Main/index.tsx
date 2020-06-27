import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { renderImage } from '../../utils/renderImage';

interface GithubData {
    id: number;
    html_url: string;
    name: string;
    description: string;
    language: string;
};

interface Params {
    repo: GithubData[];
    user: string;
}

const Main: React.FC = () => {
    const [githubData, setGithubData] = useState<GithubData[]>([]);
    const [user, setUser] = useState('');
    const navigation = useNavigation();

    const route = useRoute();
    const routeParams = route.params as Params;

    useEffect(() => {
        console.log(route.params);
        setGithubData(routeParams.repo);
        setUser(routeParams.user);
    }, []);

    function handleNavigate(screen: string) {
        navigation.navigate(screen);
    }

    function handleNavigateDetail(url: string) {
        navigation.navigate('Detail', { url: url })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.areaUser}>
                <Text style={styles.textUser}>User: /{user}</Text>
                <TouchableOpacity onPress={() => handleNavigate('Home')}>
                    <Text style={styles.textUser}>Alterar</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={githubData}
                style={styles.flatList}
                keyExtractor={(item: GithubData) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handleNavigateDetail(item.html_url)}
                        activeOpacity={0.6}
                        style={styles.card}
                    >
                        {renderImage(item.language)}

                        <View style={styles.areaProject}>
                            <View style={styles.areaTitle}>
                                <Text style={styles.title}>{item.name}</Text>
                                {item.language && (
                                    <View style={styles.areaTag}>
                                        <Text style={styles.tag}>{item.language}</Text>
                                    </View>
                                )}
                            </View>
                            <Text style={styles.description}>{item.description}</Text>
                        </View>
                    </TouchableOpacity>
                )} />


        </SafeAreaView>
    );
}

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    areaUser: {
        paddingVertical: 25,
        marginHorizontal: 25,
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    areaProject: {
        marginLeft: 20,
        width: "75%",
    },

    areaTitle: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },

    areaTag: {
        marginLeft: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 2,
        paddingHorizontal: 5,
        backgroundColor: "#cecece30"
    },

    flatList: {
        paddingHorizontal: 25,
    },

    card: {
        backgroundColor: "#282A36",
        padding: 20,
        borderRadius: 15,
        flexDirection: "row",
        marginBottom: 15,
    },

    title: {
        color: "#fff",
        fontFamily: 'Roboto_500Medium',
        fontSize: 18,
    },

    description: {
        color: "#fff",
        fontSize: 16
    },

    tag: {
        color: "#fff",
    },

    textUser: {
        fontFamily: 'Roboto_500Medium',
        color: "#fff",
        fontSize: 20,
    },
});