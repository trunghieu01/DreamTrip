import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function SubPlans({ navigation }) {

    const check = useSelector(state => state.interact);
    const [list, setList] = useState();
    const [userId, setUserId] = useState();

    AsyncStorage.getItem('userId').then((rs) => { setUserId(rs) })
    useEffect(() => {
        axios.get(`https://dreamtrip-sx68.onrender.com/tour/planed?userId=${userId}`)
            .then(res => {
                setList(res.data)
                // console.log(res.data)
            })
            .catch(error => console.log(error));
    }, [userId,check]);

    return (
        <View style={styles.container}>
            <FlatList
                data={list}
                renderItem={({ item }) =>

                    <TouchableOpacity style={styles.tou} onPress={() => navigation.navigate('PlannedTour', { item: item })}>
                        <View style={styles.imaView}>
                            <Image style={styles.ima} source={{ uri: item.hinhAnh[0] }} />
                        </View>
                        <Text style={styles.title}>{item.tenTour}</Text>
                    </TouchableOpacity>
                }
            />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center'
    },
    tou: {
        height: 190,
        width: width * 0.9,
        marginTop: 10,
        alignSelf: 'center',
        marginBottom: 10,
    },
    ima: {
        height: 160,
        width: width * 0.848,
        backgroundColor: '#fff',
        borderRadius: 20,
        alignSelf: 'center'
    },
    imaView: {
        height: 160,
        width: width * 0.85,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        shadowColor: '#000000',
        shadowOffset: {
            width: 5,
            height: 10
        },
        shadowRadius: 20,
        shadowOpacity: 3,
        elevation: 10,
        alignSelf: 'center'
    },
    title: {
        fontSize: 20,
        marginLeft: width * 0.04,
        fontWeight: '500',
        maxHeight: height * 0.03,
        maxWidth: width * 0.8
    }
});
