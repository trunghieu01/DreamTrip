import { StyleSheet, TouchableOpacity, View, FlatList, Image, Text, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const starImageFilled = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
const starImageCorner = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Liked({ navigation }) {

    const check = useSelector(state => state.interact)
    const maxRating = [1, 2, 3, 4, 5]
    const [list, setList] = useState();
    const [userId, setUserId] = useState();

    AsyncStorage.getItem('userId').then((rs) => { setUserId(rs) })
    useEffect(() => {
        axios.get(`https://dreamtrip-sx68.onrender.com/tour/liked?userId=${userId}`)
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
                refreshing={true}
                renderItem={({ item }) =>
                    <TouchableOpacity style={styles.tou} onPress={() => navigation.navigate('TourDetail', { item: item })}>
                        <Image style={styles.ima} source={{ uri: item.hinhAnh[0] }} />
                        <View style={styles.vie}>
                            <Text style={styles.title}>{item.tenTour}</Text>
                            <Text style={styles.location}>{item.viTri}</Text>
                            <View style={{ flexDirection: 'row', marginTop: '10%' }}>
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
                        <TouchableOpacity
                            style={{ width: width * 0.1, height: height * 0.06, justifyContent: 'center', marginLeft: -width * 0.02, marginTop: height * 0.005 }}
                            onPress={() => {
                                console.log('asfa')
                                axios.put(`https://dreamtrip-sx68.onrender.com/tuongtac/unlike?userId=${userId}&tourId=${item.document_id}`)
                                    .then(res => {
                                        console.log(res)
                                    })
                                    .catch(error => console.log(error));

                                setTimeout(() => {
                                    axios.get(`https://dreamtrip-sx68.onrender.com/tour/liked?userId=${userId}`)
                                        .then(res => {
                                            setList(res.data)
                                            console.log(res.data)
                                        })
                                        .catch(error => console.log(error))
                                }, 1000);
                            }}
                        >
                            <Image source={require('../assets/red_heart.png')} style={styles.heart} />
                        </TouchableOpacity>
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
        marginTop: 15,
    },
    tou: {
        height: 160,
        width: width * 0.85,
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
        // justifyContent: 'space-around',
        flex: 1
    },
    ima: {
        width: width * 0.35,
        // height:'90%',
        // width:'40%',
        backgroundColor: 'grey',
        borderRadius: 15,
        margin: '2%'
    },
    heart: {
        alignSelf: 'center',
        height: '120%',
        resizeMode: 'contain',
        // marginLeft: -width * 0.13
        // flex: 1
    },
    vie: {
        width: width * 0.35,
        marginLeft: '3%',
        marginTop: '5%'
    },
    title: {
        fontSize: 18,
        width: '100%',
        fontWeight: '500',
        color: 'black',
        maxHeight: 43
    },
    location: {
        marginTop: 5,
        fontSize: 15,
        width: '100%',
        color: 'grey',
        maxHeight: 40
    },
    starImageStyle: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
    },
});
