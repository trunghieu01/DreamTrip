import { StyleSheet, TouchableOpacity, View, FlatList, Image, Text } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const starImageFilled = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
const starImageCorner = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

export default function Booked({ navigation }) {

    const check = useSelector(state => state.interact)
    const maxRating = [1, 2, 3, 4, 5]
    const [list, setList] = useState();
    const [userId, setUserId] = useState();

    AsyncStorage.getItem('userId').then((rs) => { setUserId(rs) })

    useEffect(() => {
        axios.get(`https://dreamtrip-sx68.onrender.com/tour/booked?userId=${userId}`)
            .then(res => {
                setList(res.data)
            })
            .catch(error => console.log(error));
    }, [userId,check]);
    // console.log(list)
    return (
        <View style={styles.container}>
            <FlatList
                data={list}
                renderItem={({ item }) =>
                    <TouchableOpacity style={styles.tou} onPress={() => navigation.navigate('BookedTour', { item: item })}>
                        <Image style={styles.ima} source={{ uri: item.hinhAnh[0] }} />
                        <View style={styles.vie}>
                            <Text style={styles.title}>{item.tenTour}</Text>
                            <Text style={styles.location}>{item.viTri}</Text>
                            <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                                {maxRating.map((i, key) => {
                                    return (
                                        <View
                                            activeOpacity={0.7}
                                            key={i}>
                                            <Image
                                                style={styles.starImageStyle}
                                                source={
                                                    i <= item.danhGia
                                                        ? { uri: starImageFilled }
                                                        : { uri: starImageCorner }
                                                }
                                            />
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    </TouchableOpacity>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        marginTop: 10
    },
    tou: {
        height: 150,
        width: '85%',
        marginBottom: 17,
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
        marginLeft: '3%'
    },
    title: {
        fontSize: 18,
        width: '100%',
        fontWeight: '500',
        maxHeight:65
    },
    location: {
        fontSize: 15,
        width: '100%',
        color: 'grey',
        marginLeft:5, 
        maxWidth:150,
        maxHeight:40
    },
    starImageStyle: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
    },
});
