import { StyleSheet, Text, Button, View, Image, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const starImageFilled = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
const starImageCorner = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

export default function Rated({ navigation }) {
    // const user = useSelector(state => state.user);
    const check = useSelector(state => state.interact)
    const [listTour, setListTour] = useState();
    const maxRating = [1, 2, 3, 4, 5]
    const [listRating, setListRating] = useState()
    const userId = useSelector(state => state.user.user)

    // if (userId == null)
    //     AsyncStorage.getItem('userId').then((rs) => { setUserId(rs) })


    useEffect(() => {
        axios.get(`https://dreamtrip-sx68.onrender.com/hoatdong/rate?userId=${userId}&status=true`)
            .then(res => {
                setListTour(res.data)
                // console.log(res.data)
            })
            .catch(error => console.log(error));

        axios.get(`https://dreamtrip-sx68.onrender.com/danhGia/getForUser?userId=${userId}&status=true`)
            .then(res => {
                setListRating(res.data)
            })
            .catch(error => console.log(error));
    }, [check, {}]);

    return (
        <View style={styles.container}>
            <FlatList
                data={listRating}
                renderItem={({ item }) =>
                    <View style={styles.tou}>
                        <View style={{  flexDirection: 'row' }}>
                            <Image style={styles.ima} source={{
                                uri: listRating != null ?
                                    listTour != null ?
                                        listTour.find(e => e.id === item.hoatDongID) != undefined ?
                                            listTour.find(e => e.id === item.hoatDongID).hinhAnh[0] :
                                            'https://upload.wikimedia.org/wikipedia/commons/3/38/Solid_white_bordered.png' :
                                        'https://upload.wikimedia.org/wikipedia/commons/3/38/Solid_white_bordered.png' :
                                    'https://upload.wikimedia.org/wikipedia/commons/3/38/Solid_white_bordered.png'
                            }} />
                            <Text style={styles.title}>{
                                listRating != null ?
                                    listTour != null ?
                                        listTour.find(e => e.id === item.hoatDongID) != undefined ?
                                            listTour.find(e => e.id === item.hoatDongID).tieuDe :
                                            null : null : null
                            }</Text>
                        </View>
                        {/* <View style={{ flex: 2 }}> */}
                            {/* <View style={{ flexDirection: 'row', marginLeft: '5%', height: 15 }}> */}
                                    {/* {maxRating.map((i, key) => {
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
                                    })} */}

                                    <Text style={{ marginLeft: '5%' }}>{item.danhGia}⭐ - {new Date(item.thoiGian).toLocaleDateString()}</Text>
                            {/* </View> */}

                            <View style={{ marginLeft: '3%' }}>
                                <Text style={{ textDecorationLine: "underline" }}>Bình luận:</Text>
                                <View style={{ width: '95%' }}>
                                    <Text>{item.binhLuan}</Text>
                                </View>
                                <View style={{ height: 5 }} />
                            </View>
                        {/* </View> */}
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center'
    },
    tou: {
        minHeight: 80,
        width: '85%',
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderRadius: 15,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowColor: '#008080',
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 10,
        justifyContent: 'space-around'
    },
    ima: {
        height: '90%',
        width: 60,
        backgroundColor: 'grey',
        borderRadius: 8,
        margin: '1%'
    },
    title: {
        fontSize: 18,
        width: '80%',
        fontWeight: '500',
        color: 'black',
        height: 45,
        marginRight: '5%'
    },
    starImageStyle: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
    },
});
