import { StyleSheet, Text, Button, View, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';


export default function NotRated({ navigation }) {

    const check = useSelector(state => state.interact)
    const userId = useSelector(state => state.user.user)
    const [listTour, setListTour] = useState();
    const maxRating = [1, 2, 3, 4, 5];
    const [rating, setRating] = useState(5);
    const feeling = ['Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời']
    const [comment, setComment] = useState('');
    const [listRating, setListRating] = useState();
    const [id, setId] = useState();
    const [tourId, setTourId] = useState()


    useEffect(() => {
        axios.get(`https://dreamtrip-sx68.onrender.com/danhGia/getForUser?userId=${userId}&status=false`)
            .then(res => {
                setListRating(res.data)
                // console.log(res.data)
            })
            .catch(error => console.log(error));
        axios.get(`https://dreamtrip-sx68.onrender.com/hoatdong/rate?userId=${userId}&status=false`)
            .then(res => {
                setListTour(res.data)
                // console.log(res.data)
            })
            .catch(error => console.log(error));
    }, [check, {}]);


    return (
        <View style={styles.container}>
            <FlatList
                style={{ flex: 1 }}
                data={listRating}
                renderItem={({ item }) =>
                    <View style={styles.tou}>
                        <Image style={styles.ima}
                            source={{
                                uri: listRating != null ?
                                    listTour != null ?
                                        listTour.find(e => e.id === item.hoatDongID) != undefined ?
                                            listTour.find(e => e.id === item.hoatDongID).hinhAnh[0] :
                                            'https://upload.wikimedia.org/wikipedia/commons/3/38/Solid_white_bordered.png' :
                                        'https://upload.wikimedia.org/wikipedia/commons/3/38/Solid_white_bordered.png' :
                                    'https://upload.wikimedia.org/wikipedia/commons/3/38/Solid_white_bordered.png'
                            }} />
                        <View style={{ flex: 1.5 }}>
                            <View style={{ flex: 2, flexDirection: 'row' }}>
                                <View style={styles.vie}>
                                    <Text style={styles.title}>{
                                        listRating != null ?
                                            listTour != null ?
                                                listTour.find(e => e.id === item.hoatDongID) != undefined ?
                                                    listTour.find(e => e.id === item.hoatDongID).tieuDe :
                                                    null : null : null
                                    }</Text>
                                    <Text style={styles.location}>{
                                        listRating != null ?
                                        listTour != null ?
                                            listTour.find(e => e.id === item.hoatDongID) != undefined ?
                                                listTour.find(e => e.id === item.hoatDongID).viTri :
                                                null : null :null
                                    }</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, width: '45%', alignSelf: 'flex-end', marginRight: '10%', marginTop: '7%' }}>
                                <Button title='Đánh giá' color={"#FF8C00"} onPress={() => navigation.navigate('Reviews', {id: item.id, tourId: item.tourId, hdId: item.hoatDongID})} />
                            </View>
                        </View>
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
        height: 140,
        width: '85%',
        marginTop: 15,
        marginBottom: 10,
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
        flex: 1,
        // height:'90%',
        // width:'40%',
        backgroundColor: 'grey',
        borderRadius: 15,
        margin: '2%'
    },
    vie: {
        flex: 1,
        marginLeft: '3%',
        marginTop: '5%'
    },
    title: {
        fontSize: 18,
        width: '100%',
        fontWeight: '500',
        color: 'black',
        maxHeight: 45,
        maxWidth: '95%'
    },
    location: {
        fontSize: 15,
        width: '100%',
        color: 'grey',
        maxHeight: 40,
        maxWidth: '95%'
    },
    starImageStyle: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
    },
    ratingForm: {
        position: 'absolute',
        height: '35%',
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    textInput: {
        fontSize: 16,
        fontWeight: '400',
        marginTop: '1%',
        height: '40%',
        backgroundColor: '#F5F5F5',
        width: '95%',
        alignSelf: 'center',
        borderRadius: 5
    },
    txt: {
        fontSize: 16,
        marginLeft: '3%',
        fontWeight: '400',
        textDecorationLine: 'underline',
        marginTop: '3%'
    }
});
