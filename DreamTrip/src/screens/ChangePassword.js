import { StyleSheet, Text, TouchableOpacity, View, StatusBar, TextInput, ImageBackground } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChangePassword({ navigation, route }) {
    const [email, setEmail] = useState(null)
    const [acc, setAcc] = useState()
    const [pass, setPass] = useState("")
    const [rePass, setRePass] = useState("")
    const [check, setCheck] = useState(true)

    if (email == null)
        AsyncStorage.getItem('email').then((rs) => setEmail(rs))

    useEffect(() => {
        axios.get(`https://dreamtrip-sx68.onrender.com/taikhoan/loggin?username=${email}`)
            .then(res => {
                setAcc(res.data)
            })
            .catch(error => console.log(error))
    }, [email])

    console.log(acc)

    return (
        <ImageBackground source={require('../assets/bg_login.png')} style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
            <View style={{ flex: 2, marginTop: '20%' }}>
                <Text style={{ alignSelf: 'center', paddingTop: '15%', width: '60%', textAlign: 'center', fontSize: 30, fontWeight: '600' }}>Đặt lại mật khẩu</Text>
                <Text style={{ alignSelf: 'center', marginTop: '5%', width: '50%', textAlign: 'center', fontSize: 22, fontWeight: '300' }}>Nhập mật khẩu mới của bạn</Text>
            </View>
            <TextInput style={styles.input} placeholder='Nhập mật khẩu mới' secureTextEntry={true} onChangeText={txt => setPass(txt)} />
            <TextInput style={styles.input1} placeholder='Nhập lại mật khẩu mới' secureTextEntry={true} onChangeText={txt => setRePass(txt)} />
            <View style={{ flex: 2 }}>
                <Text style={{ color: 'red', marginLeft: '15%', marginTop: '3%' }}>{check ? null : 'Không hợp lệ'}</Text>
                <TouchableOpacity style={styles.tou_OTP} onPress={() => {
                    if (pass == rePass && pass.length >= 8) {
                        setCheck(true)
                        axios.put(`https://dreamtrip-sx68.onrender.com/taikhoan/update`, {
                            userName: acc.userName,
                            password: pass,
                            status: true,
                            admin: false,
                        }).then(res => {
                            console.log(res.data + 'Go')
                            navigation.goBack();
                        })
                            .catch(error => console.log(error))
                    } else setCheck(false)
                }}>
                    <Text style={styles.textOTP}>ĐẶT LẠI</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 3 }} />
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
        marginTop: '7%',
        width: '85%',
        height: '35%',
        alignSelf: 'center'
    },
    input: {
        flex: 0.7,
        paddingLeft: 8,
        alignSelf: 'center',
        borderRadius: 15,
        width: '85%',
        height: '75%',
        marginTop: '15%',
        fontSize: 20,
        backgroundColor: '#fff'
    },
    input1: {
        flex: 0.7,
        paddingLeft: 8,
        alignSelf: 'center',
        borderRadius: 15,
        width: '85%',
        height: '75%',
        marginTop: '5%',
        fontSize: 20,
        backgroundColor: '#fff'
    },
    textOTP: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600'
    }
});
