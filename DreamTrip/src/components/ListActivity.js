import { StyleSheet, View, FlatList, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ListActivity(key) {

    const [listActivity, setListActivity] = useState()
    useEffect(() => {
        axios.get(`https://dreamtrip-sx68.onrender.com/hoatdong/find?tourID=${key.id}`)
            .then(res => {
                setListActivity(res.data)
                // console.log(listActivity)
            })
            .catch(error => console.log(error));
    }, []);

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <FlatList
                data={listActivity}
                renderItem={({ item }) =>
                    <TouchableOpacity style={styles.tou} onPress={() => navigation.navigate('TourActivity', { item: item })}>
                        <Image style={styles.ima} source={{ uri: item.hinhAnh[0] }} />
                        <View style={styles.vie}>
                            <Text style={styles.title}>{item.tieuDe}</Text>
                            <Text style={styles.location}>{item.viTri}</Text>
                        </View>
                    </TouchableOpacity>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    tou: {
        height: 150,
        width: '85%',
        marginTop: 5,
        marginBottom:15,
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowColor: '#008080',
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1
    },
    ima: {
        flex: 3,
        // height:'90%',
        // width:'40%',
        backgroundColor: 'grey',
        borderRadius: 15,
        margin: '2%'
    },
    heart: {
        height: '40%',
        flex: 1
    },
    vie: {
        flex: 3,
        marginLeft: '3%',
        marginTop: '5%'
    },
    title: {
        fontSize: 18,
        width: '100%',
        fontWeight: '500'
    },
    location: {
        fontSize: 15,
        width: '100%',
        color: 'grey'
    },
    starImageStyle: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
    },
});
