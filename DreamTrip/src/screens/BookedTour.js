import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import ListActivityTour from '../components/ListActivityTour';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height

export default function BookedTour({ navigation, route }) {


    const [imgActive, setImgActive] = useState(0)

    const item = route.params.item
    const img = [
        item.hinhAnh[0],
        'https://heritagecruises.com/wp-content/uploads/2021/05/File1-768x437.jpg',
        'https://heritagecruises.com/wp-content/uploads/2021/05/DJI_0787-768x512.jpg',
        'https://heritagecruises.com/wp-content/uploads/2020/05/Lan-Ha-Bay-768x511.jpg'
    ]
    const onchange = (nativeEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
            if (slide != imgActive)
                setImgActive(slide)
        }
    }
    const handleShowItem = () => {
        console.log(item)
    }
    useEffect(() => {
        handleShowItem()
    }, [])
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
                        img.map((e, index) =>
                            <TouchableOpacity key={e}>
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
                    {/* <TouchableOpacity style={styles.back}>
                        <Image source={require('../assets/silve_heart.png')} style={[styles.head, { left: width * 0.68 }]} />
                    </TouchableOpacity> */}
                </View>

                <View style={{ position: 'absolute', alignSelf: 'center', top: width * 0.78, flexDirection: 'row' }}>
                    {
                        img.map((e, index) =>
                            <Text
                                key={e}
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
                        <Text style={{ marginLeft: '8%', fontSize: 20, fontWeight: '500', marginTop:'5%' }}>Mô tả chuyến đi</Text>
                        <Text style={{ width: '80%', alignSelf: 'center', marginTop: '3%', fontSize: 16.5 }}>{item.thongTin}</Text>
                    </View>
                    <ListActivityTour id={item.document_id} />
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
                </ScrollView>
            </View>
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
        alignSelf: 'center',
        maxHeight:height*0.025
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
    }
});
