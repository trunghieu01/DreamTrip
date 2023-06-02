import { StyleSheet, View, Dimensions, Image, TouchableOpacity, PermissionsAndroid, Platform, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Sound from 'react-native-sound';
import MapViewDirections from 'react-native-maps-directions';
import getDistance from 'geolib/es/getPreciseDistance';
import Geolocation from '@react-native-community/geolocation';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE } from '../redux/actions/InteractiveAction';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const data = [
    { lable: '100m', value: 100 },
    { lable: '200m', value: 200 },
    { lable: '300m', value: 300 },
    { lable: '500m', value: 500 },
    { lable: '1000m', value: 1000 },
    { lable: '1500m', value: 1500 },
    { lable: '1000km', value: 1000000 },
];
const listType = [
    { label: 'Âm thanh', value: 'audio' },
    { label: 'Đoạn phim', value: 'video' }
];

export default function TourActivity({ navigation, route }) {

    const check = useSelector(state => state.interact)
    const dispatch = useDispatch()

    const activity = route.params.item
    const [userId, setUserId] = useState();
    AsyncStorage.getItem('userId').then((rs) => { setUserId(rs) })

    const [isPlay, setIsPlay] = useState(false)
    const [sound, setSound] = useState();
    const [distance, setDistance] = useState()
    const [di, setD] = useState(500);
    const [type, setType] = useState('audio');
    const [isFocus, setIsFocus] = useState(false);
    const [currentLongitude, setCurrentLongitude] = useState(106.68683709126789);
    const [currentLatitude, setCurrentLatitude] = useState(10.822145603925385);
    const [locationStatus, setLocationStatus] = useState('');
    const currentLocation = { latitude: currentLatitude, longitude: currentLongitude };
    const [checkRate, setCheckRate] = useState(false);

    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'ios') {
                getOneTimeLocation();
                subscribeLocationLocation();
            } else {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Access Required',
                            message: 'This App needs to Access your location',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //To Check, If Permission is granted
                        getOneTimeLocation();
                        subscribeLocationLocation();
                    } else {
                        setLocationStatus('Permission Denied');
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        };
        requestLocationPermission();
        return () => {
            Geolocation.clearWatch(watchID);
        };
    }, []);

    const getOneTimeLocation = () => {
        setLocationStatus('Getting Location ...');
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                setLocationStatus('You are Here');

                //getting the Longitude from the location json
                const currentLongitude = position.coords.longitude;

                //getting the Latitude from the location json
                const currentLatitude = position.coords.latitude;

                //Setting Longitude state
                setCurrentLongitude(currentLongitude);

                //Setting Longitude state
                setCurrentLatitude(currentLatitude);
            },
            (error) => {
                setLocationStatus(error.message);
            },
            { enableHighAccuracy: false, maximumAge: 1000 },
        );
    };

    const subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
            (position) => {
                //Will give you the location on location change

                setLocationStatus('You are Here');
                console.log(position);

                //getting the Longitude from the location json        
                const currentLongitude = position.coords.longitude;

                //getting the Latitude from the location json
                const currentLatitude = position.coords.latitude;

                //Setting Longitude state
                setCurrentLongitude(currentLongitude);

                //Setting Latitude state
                setCurrentLatitude(currentLatitude);

                const d = getDistance(
                    { latitude: position.coords.latitude, longitude: position.coords.longitude },
                    // { latitude: 10.816622, longitude: 106.684208 },
                    { latitude: activity.latitude, longitude: activity.longitude }
                )
                setDistance(d)
            },
            (error) => {
                setLocationStatus(error.message);
            },
            { enableHighAccuracy: false, maximumAge: 500, distanceFilter: 1 },
        );
    };

    useEffect(() => {
        if (isPlay == false && distance <= di) {
            if (type == 'audio') {
                console.log(activity.amThanh)
                var whoosh = new Sound(activity.amThanh, null, (error) => {
                    if (error) {
                        console.log('failed to load the sound', error);
                        return;
                    }
                    // Play the sound with an onEnd callback
                    whoosh.play((success) => {
                        if (success) {
                            console.log('successfully finished playing');
                        } else {
                            console.log('playback failed due to audio decoding errors');
                        }
                    });
                    setIsPlay(true)
                });
                setSound(whoosh)
            }
            else navigation.navigate('PlayVideo', { video: activity.doanPhim })
        }
        if (distance > di) {
            if (sound)
                sound.stop()
        }
        if (distance <= 20) {
            setCheckRate(true)
        }
        console.log(isPlay)
    }, [currentLongitude, di])

    const playBack = () => {
        if (distance <= di && type == 'video') {
            navigation.navigate('PlayVideo', { video: activity.doanPhim })
            sound.stop()
        } else
            if (distance <= di && type == 'audio') {
                sound.stop(() => {
                    sound.play();
                    console.log('Play back')
                });
            }
    }
    console.log(di + activity.doanPhim)

    return (
        <View style={styles.container}>
            <MapView
                style={{ height: '100%', width }}
                region={{
                    latitude: currentLatitude,
                    longitude: currentLongitude,
                    latitudeDelta: 0.8,
                    longitudeDelta: 1.5,
                }}
                showsUserLocation
                followUserLocation
            >
                <Marker
                    coordinate={{
                        latitude: activity.latitude,
                        longitude: activity.longitude,
                    }}
                    icon={require('../assets/pinLocation.png')}
                />
                {/* <Marker
                    // coordinate={{ latitude: currentLatitude, longitude: currentLongitude }}
                    coordinate={currentLocation}
                /> */}
                <MapViewDirections
                    origin={currentLocation}
                    destination={currentLocation}
                    // apikey='AIzaSyAqT35-kt0gv18cw42StN0wbwagmt3blmQ'
                    apikey='AIzaSyBLQ4GaTx9FyY8DxaIAqlrPKOrZOiZzCWg'
                    strokeColor="#0080ff"
                    strokeWidth={5}
                />
            </MapView>
            <View style={{ position: 'absolute', top: height * 0.03, flexDirection: 'row' }}>
                {/* <TouchableOpacity style={{ position: 'absolute', top: height * 0.005 }} onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/back_icon.png')} style={{ height: 50, width: width * 0.1 }} />
                </TouchableOpacity> */}
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={data}
                    maxHeight={300}
                    labelField="lable"
                    valueField="value"
                    placeholder={"500m"}
                    value={di}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setD(item.value);
                        setIsFocus(false);
                    }}
                />
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={listType}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={"Âm thanh"}
                    value={type}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setType(item.value);
                        setIsFocus(false);
                    }}
                />

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <View style={distance <= di ? styles.button : {}}>
                    <Button onPress={playBack} title='Phát lại'></Button>
                </View>

                <View style={{ bottom: 45, width: width * 0.25, marginRight: 5 }}>
                    <Button
                        onPress={() => {
                            const info = {
                                nguoiDungID: userId,
                                tourId: activity.tourId,
                                binhLuan: "",
                                danhGia: 0,
                                hoatDongID: activity.id,
                                thoiGian: new Date(),
                                status: false
                            }
                            if (isPlay)
                                sound.stop()
                            axios.post(`https://dreamtrip-sx68.onrender.com/danhGia/add`, info).then(function (response) {
                                if (response.data == undefined)
                                    setCheckRate(false)
                            }).catch((error) => {
                                console.log(error);
                            })
                            navigation.navigate("TourActivity", {
                                item: activity,
                                check: checkRate
                            })
                            dispatch(CHANGE(Math.floor(Math.random() * 100000)))
                        }
                        }
                        title='Kết thúc' color={'#DC143C'}
                    />
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    map: {
        flex: 2,
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: 'black',
        overflow: 'hidden'
    },
    button: {
        bottom: 45,
        width: width * 0.25,
        marginRight: 5
    },
    dropdown: {
        height: 45,
        width: width * 0.36,
        borderColor: 'gray',
        borderWidth: 1.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginLeft: width * 0.1,
        marginTop: height * 0.01,
    },
    placeholderStyle: {
        fontSize: 17,
        fontWeight: '500'
    },
    selectedTextStyle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FF8000'
    }
});
