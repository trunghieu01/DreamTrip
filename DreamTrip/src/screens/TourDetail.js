import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { CHANGE } from '../redux/actions/InteractiveAction';
import ListActivityTour from '../components/ListActivityTour';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height
const likeIcon = require('../assets/pink_heart.png')
const unlikeIcon = require('../assets/silve_heart.png')

export default function TourDetail({ navigation, route }) {

    const [check, setCheck] = useState(useSelector(state => state.interact))
    const dispatch = useDispatch()
    const [imgActive, setImgActive] = useState(0)
    const item = route.params.item;
    const [like, setLike] = useState(false);
    const [show, setShow] = useState(false);
    const [userId, setUserId] = useState();

    AsyncStorage.getItem('userId').then((rs) => { setUserId(rs) })

    const onchange = (nativeEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
            if (slide != imgActive)
                setImgActive(slide)
        }
    }

    useEffect(() => {
        axios.get(`https://dreamtrip-sx68.onrender.com/tuongtac/check?userId=${userId}&tourId=${item.document_id}`).then((res) => {
            setLike(res.data)
            // console.log(res.data)
        }).catch((error) => {
            console.log(error);
        })
    }, [userId])

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <View style={{ width, height: width * 0.9 }}>
                <ScrollView
                    onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    horizontal
                >
                    {
                        item.hinhAnh.map((e, index) =>
                            <TouchableOpacity key={index}>
                                <Image
                                    resizeMode='cover'
                                    source={{ uri: e }}
                                    style={{ width, height: width * 0.9, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
                                />
                            </TouchableOpacity>
                        )
                    }

                </ScrollView>
                <View style={{ flexDirection: 'row', position: 'absolute', alignSelf: 'auto', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/back_icon1.png')} style={styles.head} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.back, { marginLeft: width * 0.68 }]}
                        onPress={() => {
                            if (like)
                                axios.put(`https://dreamtrip-sx68.onrender.com/tuongtac/unlike?userId=${userId}&tourId=${item.document_id}`)
                                    .then(res => {
                                        // console.log(res.data)
                                    })
                                    .catch(error => console.log(error));
                            // console.log('true')
                            else if (!like)
                                axios.put(`https://dreamtrip-sx68.onrender.com/tuongtac/like?userId=${userId}&tourId=${item.document_id}`)
                                    .then(res => {
                                        console.log(res)
                                    })
                                    .catch(error => console.log(error));
                            // console.log('false')
                            setTimeout(() => {
                                axios.get(`https://dreamtrip-sx68.onrender.com/tuongtac/check`, {
                                    params: {
                                        tourId: item.document_id,
                                        userId: userId
                                    }
                                }).then((res) => {
                                    setLike(res.data)
                                }).catch((error) => {
                                    console.log(error);
                                })
                            }, 100);

                            setTimeout(() => {
                                setShow(true)
                            }, 300);
                            setTimeout(() => {
                                setShow(false);
                            }, 1300);
                            dispatch(CHANGE(Math.floor(Math.random() * 100000)))
                        }}
                    >
                        <Image source={like ? likeIcon : unlikeIcon} style={styles.head} />
                    </TouchableOpacity>
                </View>

                <View style={{ position: 'absolute', alignSelf: 'center', top: width * 0.78, flexDirection: 'row' }}>
                    {
                        item.hinhAnh.map((e, index) =>
                            <Text
                                key={index}
                                style={imgActive == index ? styles.dotActive : styles.dot}
                            >
                                ●
                            </Text>
                        )
                    }
                </View>

            </View>

            <View style={styles.top}>
                <Text style={styles.title}>{item.tenTour}</Text>
                <Text style={styles.price}>Miễn phí</Text>
            </View>
            <View style={{ flex: 10 }}>
                <Text style={styles.loca}>Địa chỉ : {item.viTri}</Text>
                <ScrollView style={styles.main}>
                    <View style={{}}>
                        <Text style={{ marginLeft: '8%', fontSize: 20, fontWeight: '500' }}>Mô tả chuyến đi</Text>
                        <Text style={{ width: '80%', alignSelf: 'center', marginTop: '3%', fontSize: 16.5 }}>{item.thongTin}</Text>
                        <Text style={{ marginLeft: '8%', fontSize: 18, fontWeight: '500', marginTop: 10 }}>Các hoạt động trong chuyến đi:</Text>
                        <ListActivityTour id={item.document_id} />
                    </View>
                    <View style={{ height: 0.3 * height, width: width * 0.9, alignSelf: 'center', borderRadius: 20, overflow: 'hidden', marginVertical: '5%' }}>
                        <MapView
                            style={{ height: 0.3 * height, width: width * 0.9 }}
                            initialRegion={{
                                latitude: item.latitude,
                                longitude: item.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker coordinate={{ latitude: item.latitude, longitude: item.longitude }} />
                        </MapView>
                    </View>

                    <TouchableOpacity style={styles.btn_add} onPress={() => {
                        axios.put(`https://dreamtrip-sx68.onrender.com/tuongtac/plan?userId=${userId}&tourId=${item.document_id}`)
                            .then(res => {
                                console.log(res)
                                dispatch(CHANGE)
                            })
                            .catch(error => console.log(error));
                        dispatch(CHANGE(Math.floor(Math.random() * 100000)))
                        Alert.alert("Thông báo", "Đã thêm vào kế hoạch", [
                            {
                                text: 'ở lại',
                                style: 'cancel'
                            },
                            {
                                text: 'Chuyển đến kế hoạch',
                                onPress: () => navigation.navigate("Main", { screen: 'Plans', params: { screen: 'Kế hoạch' } }),
                            },
                        ]);

                    }}>
                        <Text style={styles.txt_btn}>Thêm vào kế hoạch</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn_book} onPress={() => navigation.navigate('BookTour', { tourId: item.document_id })}>
                        <Text style={styles.txt_btn}>Đặt chuyến đi</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            {show ?
                <View style={styles.noti}>
                    <Text style={{ alignSelf: 'center' }}>{like ? 'Đã thích' : 'Đã bỏ thích'}</Text>
                </View> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    dotActive: {
        margin: 5,
        color: 'black',
        fontSize: 23,
    },
    dot: {
        margin: 3,
        color: 'white',
        fontSize: 18
    },
    head: {
        width: width * 0.12,
        height: width * 0.12,
        top: height * 0.05
    },
    back: {
        width: width * 0.15,
        height: width * 0.15,
        // backgroundColor:'black'
        // top: -width * 0.75
    },
    top: {
        flex: 1.7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: height * 0.01
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        left: width * 0.07,
        top: '1%',
        width: width * 0.7,
        maxHeight: height * 0.07
    },
    price: {
        fontSize: 18,
        fontWeight: '500',
        left: -width * 0.07,
        top: '2.5%',
        color: 'grey'
    },
    loca: {
        flex: 0.1,
        fontSize: 15,
        fontWeight: '500',
        width: '85%',
        color: 'grey',
        alignSelf: 'center'
    },
    main: {
        flex: 1,
        // backgroundColor: 'black'
    },
    btn_book: {
        backgroundColor: '#00cc66',
        height: height * 0.065,
        width: width * 0.9,
        margin: height * 0.01,
        alignSelf: 'center',
        borderRadius: 15,
        justifyContent: 'center'
    },
    btn_add: {
        backgroundColor: '#4EB8FF',
        height: height * 0.065,
        width: width * 0.9,
        margin: height * 0.01,
        alignSelf: 'center',
        borderRadius: 15,
        justifyContent: 'center'
    },
    txt_btn: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 22,
        fontWeight: '700'
    },
    bookTourForm: {
        position: 'absolute'
    },
    noti: {
        width: width * 0.3,
        position: 'absolute',
        top: height * 0.6,
        alignSelf: 'center',
        backgroundColor: '#f5f5f5',
        opacity: 0.7,
        borderRadius: 20,
    }
});
