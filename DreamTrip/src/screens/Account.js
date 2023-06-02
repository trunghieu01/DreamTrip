import { StyleSheet, Text, TouchableOpacity, View, Image, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import { logOut } from '../redux/actions/UserAction'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Account({ navigation }) {

    const check = useSelector(state => state.interact)
    const [userId, setUserId] = useState(null);
    const [ten, setTen] = useState(null);
    const dispatch = useDispatch();
    const [countRate, setCountRate] = useState(0)

    if (userId == null)
        AsyncStorage.getItem('userId').then((rs) => { setUserId(rs) })
    if (ten == null)
        AsyncStorage.getItem('name').then((rs) => { setTen(rs) })

    useEffect(() => {
        axios.get(`https://dreamtrip-sx68.onrender.com/hoatdong/rate?userId=${userId}&status=false`)
            .then(res => {
                setCountRate(res.data.length)
                console.log(res.data.length)
            })
            .catch(error => console.log(error));
    }, [check, {}]);

    const handleLogOut = () => {
        // auth()
        //     .signOut()
        //     .then(() => console.log('User signed out!'));
        // const action = logOut();
        dispatch(logOut());
        AsyncStorage.setItem('userId', '');
        AsyncStorage.setItem('name', '');
        AsyncStorage.setItem('sdt', '');
        AsyncStorage.setItem('email', '');
        AsyncStorage.setItem('firstLogin', 'false');
        AsyncStorage.getItem('userId').then(res => console.log('userId: ' + res))
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <View style={{ flex: 1.2, flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Text style={styles.title}>Tài khoản</Text>
            </View>
            <View style={{ flex: 0.8 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ width: 70, height: 70, borderRadius: 30, marginLeft: '10%', alignSelf: 'center' }} source={require('../assets/duck.png')} />
                    <Text style={{ marginLeft: '5%', alignSelf: 'center', fontSize: 22 }}>{ten}</Text>
                </View>
            </View>
            <View style={{ flex: 4 }}>
                <TouchableOpacity style={styles.touRating} onPress={() => navigation.navigate('Rating')}>
                    <Image style={{ height: 30, width: 30, alignSelf: 'center' }} source={require('../assets/rating.png')} />
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 22, alignSelf: 'center', marginLeft: '4%' }}>Đánh giá</Text>
                        {countRate != 0 ?
                            <Text style={styles.rate}>{countRate}</Text>
                            : <Text></Text>
                        }
                    </View>
                </TouchableOpacity>


                <Text style={{ flex: 1, marginLeft: '10%', fontSize: 22, fontWeight: '500' }}>Cài đặt</Text>
                <TouchableOpacity style={styles.tou} onPress={() => navigation.navigate('ViewProfile')}>
                    <Image style={{ height: 30, width: 30, alignSelf: 'center' }} source={require('../assets/info.png')} />
                    <Text style={{ fontSize: 22, alignSelf: 'center', marginLeft: '4%' }}>Thông tin cá nhân</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tou}>
                    <Image style={{ height: 30, width: 35, alignSelf: 'center' }} source={require('../assets/payment.png')} />
                    <Text style={{ fontSize: 22, alignSelf: 'center', marginLeft: '3%' }}>Phương thức thanh toán</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tou} onPress={() => navigation.navigate('ChangePW')}>
                    <Image style={{ height: 30, width: 31, alignSelf: 'center' }} source={require('../assets/changePW.png')} />
                    <Text style={{ fontSize: 22, alignSelf: 'center', marginLeft: '3%' }}>Đổi mật khẩu</Text>
                </TouchableOpacity>

                <View style={{ flex: 4, marginLeft: '10%' }} />

                <TouchableOpacity style={styles.tou} onPress={handleLogOut}>
                    <Image style={{ height: 30, width: 30, }} source={require('../assets/logout_icon.png')} />
                    <Text style={{ fontSize: 22, color: 'red', marginLeft: '3%' }}>Đăng xuất</Text>
                </TouchableOpacity>

                <View style={{ flex: 1, marginLeft: '10%' }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    title: {
        width: '80%',
        alignSelf: 'center',
        textAlign: 'left',
        fontSize: 28,
        marginLeft: '15%',
        fontWeight: '600'
    },
    tou: {
        flex: 1.5,
        flexDirection: 'row',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 3,
        width: '78%',
        marginLeft: '11%'
    },
    touRating: {
        flex: 3,
        flexDirection: 'row',
        width: '78%',
        marginLeft: '11%',
        marginTop: '-10%'
    },
    rate: {
        fontSize: 16,
        alignSelf: 'center',

        marginLeft: '4%',
        backgroundColor: '#FF6347',
        color: 'white',
        borderRadius: 25,
        height: 25,
        width: 25,
        textAlign: 'center'
    }
});
