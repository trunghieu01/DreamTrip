import { StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIN } from '../redux/actions/UserAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Successfull({ navigation, route }) {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const email = route.params.email;
    const pass = route.params.pass;
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        axios.get(`https://dreamtrip-sx68.onrender.com/user/login?username=${email}&password=${pass}`)
            .then(res => {
                if (res.data != "") {
                    // setCheckLogin(true)
                    setCurrentUser(res.data)
                }
                // else setCheckLogin(false)
            }).catch(error => console.log(error));
    }, [])

    return (
        <ImageBackground source={require('../assets/bg_login.png')} style={styles.container}>
            <View style={{ flex: 4 }}>
                <Text style={{ alignSelf: 'center', paddingTop: '45%', width: '60%', textAlign: 'center', fontSize: 30, fontWeight: '600' }}>Hoàn thành!</Text>
                <TouchableOpacity style={{ alignSelf: 'center', marginTop: '7%' }}>
                    <Image style={{ height: 170, width: 170, resizeMode: 'cover' }} source={require('../assets/successfull.png')}></Image>
                </TouchableOpacity>
                <Text style={{ alignSelf: 'center', width: '80%', textAlign: 'center', fontSize: 20, fontWeight: '300' }}>Đặt lại mật khẩu thành công</Text>
            </View>
            <View style={{ flex: 5 }}>
                <TouchableOpacity style={styles.tou_OTP} onPress={() => {
                    if (currentUser != undefined) {
                        setTimeout(() => {
                            console.log(currentUser.ten)
                            const action = logIN(currentUser);
                            AsyncStorage.setItem('userId', currentUser.document_id);
                            AsyncStorage.setItem('name', currentUser.ten);
                            AsyncStorage.setItem('sdt', currentUser.diaChi);
                            AsyncStorage.setItem('email', currentUser.email);
                            AsyncStorage.setItem('firstLogin', 'false');
                            dispatch(action);
                        }, 500);
                    }
                    // navigation.navigate('Login')
                }}>
                    <Text style={styles.textOTP}>OKAY</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    tou_OTP: {
        justifyContent: 'center',
        backgroundColor: '#39ACFF',
        borderRadius: 16,
        marginTop: '90%',
        width: '85%',
        height: '15%',
        alignSelf: 'center',
    },
    input: {
        flex: 0.7,
        alignSelf: 'center',
        borderRadius: 15,
        width: '85%',
        height: '7%',
        marginTop: '15%',
        fontSize: 24,
        backgroundColor: '#fff',
        textAlign: 'center'
    },
    textOTP: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600'
    }
});
