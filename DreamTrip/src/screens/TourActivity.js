import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useState, useMemo } from 'react';
import axios from 'axios';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { useSelector } from 'react-redux';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function TourActivity({ navigation, route }) {

    const activity = route.params.item;
    const check = route.params.check;

    {
        check != undefined ?
            check ?
                Alert.alert("Thông báo", 'Hãy cho chúng tôi biết trải nghiệm của bạn', [
                    {
                        text: 'Ở lại',
                        style: 'cancel'
                    },
                    {
                        text: 'Đánh giá',
                        onPress: () => navigation.navigate('Main', { screen: 'Cá nhân'})
                    }
                ])
                :
                Alert.alert("Thông báo", 'Hãy tiếp tục trải nghiệm')
            : null
    }

    return (
        <View style={styles.container}>
            <View style={styles.map}>
                <MapView
                    style={{ height: '100%', width }}
                    region={{
                        latitude: activity.latitude,
                        longitude: activity.longitude,
                        latitudeDelta: 1,
                        longitudeDelta: 0.65,
                    }}
                >
                    <Marker coordinate={{
                        latitude: activity.latitude,
                        longitude: activity.longitude
                    }} />
                </MapView>

                <TouchableOpacity style={{ position: 'absolute', top: height * 0.03 }} onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/back_icon.png')} style={{ height: 50, width: width * 0.1 }} />
                </TouchableOpacity>
            </View>


            <View style={{ flex: 1 }}>
                <View style={{ maxHeight: height * 0.15, width: width * 0.9, alignSelf: 'center', marginTop: height * 0.01 }}>
                    <View style={{}}>
                        <Text style={styles.title}>{activity.tieuDe}</Text>
                        <View style={{ flexDirection: 'row', height: 30, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 18, color: 'grey', maxWidth: width * 0.7 , maxHeight:20}}>{activity.viTri}</Text>
                            <TouchableOpacity style={styles.btnStart}
                                onPress={() => navigation.navigate('GGMap', { item: activity, })}>
                                <Text style={{ fontSize: 20, color: '#FFFFE0', alignSelf: 'center', fontWeight: '500' }}>Bắt đầu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <ScrollView style={{ backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: 10 }}>
                    <Text style={{ width: width * 0.9, alignSelf: 'center' }}>{activity.thongTin}</Text>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9'
    },
    map: {
        flex: 2,
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: 'black',
        overflow: 'hidden'
    },
    zoomIcon: {
        height: 25,
        width: 25
    },
    btnZoom: {
        position: 'absolute',
        top: height * 0.65,
        marginLeft: width * 0.9,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        maxWidth: width * 0.9,
        maxHeight: 60,
        marginLeft: -5
    },
    btnStart: {
        backgroundColor: '#1E90FF',
        justifyContent: 'center',
        borderRadius: 3,
        width: width * 0.22,
    }
});
