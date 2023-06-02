import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import axios from 'axios';

const starImageFilled = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
const starImageCorner = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

export default function ListFilter(params) {
    const navigation = useNavigation();
    console.log(params)
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`https://dreamtrip-sx68.onrender.com/tour/findFilter?name=${params.name}&cate=${params.cate}`)
            .then(res => {
                setList(res.data)
                console.log(list)
                // console.log(list[0].danhGia)
            })
            .catch(error => console.log(error));
    }, [params]);

    const maxRating = [1, 2, 3, 4, 5]

    return (
        <View>
            <FlatList
                data={list}
                renderItem={({ item }) =>
                    <TouchableOpacity style={styles.tou} onPress={() => navigation.navigate('TourDetail', { item: item })}>
                        <Image style={styles.ima} source={{ uri: item.hinhAnh[0] }} />
                        <View style={styles.vie}>
                            <Text style={styles.title}>{item.tenTour}</Text>
                            <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                                <Image style={{ height: 20, width: 20, marginLeft: 5 }} source={require('../assets/loca_icon.png')} />
                                <Text style={styles.location}>{item.viTri}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: '8%', alignSelf: 'flex-end' }}>
                                {maxRating.map((i, key) => {
                                    return (
                                        <View
                                            activeOpacity={0.5}
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
                        <Image source={require('../assets/white_heart.png')} style={styles.heart} />
                    </TouchableOpacity>}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    tou: {
        height: 200,
        width: 140,
        marginLeft: 5,
        marginTop: 15
    },
    tou: {
        height: 150,
        width: '90%',
        marginTop: 15,
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
        marginTop: '3%'
    },
    title: {
        fontSize: 18,
        width: '100%',
        fontWeight: '500',
        maxHeight: 45,
    },
    location: {
        fontSize: 15,
        width: '100%',
        color: 'grey',
        maxHeight: 40,
        marginLeft: '5%'
    },
    starImageStyle: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
    },
})

