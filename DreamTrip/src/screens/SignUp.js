import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ImageBackground, StatusBar, Linking } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import axios from 'axios';

export default function SignUp({ navigation }) {
    const [isChecked, setChecked] = React.useState(false)
    const [ten, setTen] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [sdt, setSDT] = React.useState('')
    const [diaChi, setDiaChi] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [rePass, setRePass] = React.useState('')
    const [isValid, setIsValid] = React.useState(true)
    const [status, setStatus] = React.useState()

    return (
        <ImageBackground source={require('../assets/bg_login.png')} style={styles.container}>
            <StatusBar backgroundColor={'#f9f9f9'} />

            <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', marginTop: '5%' }}>
                <TouchableOpacity style={{ alignSelf: 'center', width: '15%' }} onPress={() => navigation.goBack()}>
                    <Image style={{ height: "40%", width: '40%', resizeMode: 'cover', alignSelf: 'center' }} source={require('../assets/back_icon.png')}></Image>
                </TouchableOpacity>
                <Text style={{ alignSelf: 'center', width: '70%', textAlign: 'center', fontSize: 30, fontWeight: '600' }}>Đăng ký Tài khoản</Text>
                <View style={{ alignSelf: 'center', width: '15%' }} />
            </View>

            <TextInput style={styles.input} placeholder='Họ và tên' onChangeText={txt => setTen(txt)} />
            <TextInput style={styles.input} placeholder='Email' keyboardType='email-address' onChangeText={txt => setEmail(txt)} />
            <TextInput style={styles.input} placeholder='Số điện thoại' keyboardType='number-pad' onChangeText={txt => setSDT(txt)} />
            <TextInput style={styles.input} placeholder='Địa chỉ' onChangeText={txt => setDiaChi(txt)} />
            <TextInput style={styles.input} placeholder='Mật khẩu(>=8)' secureTextEntry={true} onChangeText={txt => setPass(txt)} />
            <TextInput style={styles.input} placeholder='Nhập lại mật khẩu' secureTextEntry={true} onChangeText={txt => setRePass(txt)} />

            <View style={{ flex: 4, alignItems: 'center' }}>

                <View style={{ flexDirection: 'row', marginTop: '7%' }}>
                    <CheckBox style={{ marginLeft: '2%', marginTop: '1%' }} value={isChecked} onValueChange={(value) => setChecked(value)} />
                    <Text style={{ paddingLeft: '5%', width: '80%', paddingRight: '5%', fontSize: 16 }}>Bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của chúng tôi</Text>
                </View>
                <Text style={{ color: isValid ? 'white' : '#FF4500', marginTop: '3%' }}>Thông tin không hợp lệ</Text>
                <TouchableOpacity style={styles.tou_login} onPress={() => {
                    if (pass == rePass && ten != '' && pass.length >= 8 && /(0[3|5|7|8|9])+([0-9]{8})\b/g.test(sdt) && Linking.canOpenURL('mailto:' + email) && diaChi != '') {
                        axios.get(`https://dreamtrip-sx68.onrender.com/taikhoan/loggin?username=${email}`)
                            .then((res) => {
                                if (res.data != null)
                                    setStatus(res.data.status)
                            })

                        setTimeout(() => {
                            if (status != true) {
                                axios.post(`https://dreamtrip-sx68.onrender.com/taikhoan/register`, {
                                    params: {
                                        tk: {
                                            userName: email,
                                            password: pass,
                                            isAdmin: false,
                                            status: false
                                        },
                                        nguoiDung: {
                                            ten: ten,
                                            sdt: sdt,
                                            email: email,
                                            diaChi: diaChi,
                                            avatar: "https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/duck.png?alt=media&token=90dacf0c-342f-4276-9976-26aabb53e5fd"
                                        }
                                    }
                                })
                                navigation.navigate('EnterOTP')
                            }
                        }, 200);


                    } else
                        setIsValid(false)
                }}>
                    <Text style={styles.textLogin}>ĐĂNG KÝ</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                    <Text style={{ fontSize: 18 }}>Bạn đã có tài khoản? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ fontSize: 18, color: '#4D94FF' }}> Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
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
    tou_login: {
        justifyContent: 'center',
        backgroundColor: '#39ACFF',
        borderRadius: 16,
        marginTop: '5%',
        width: '80%',
        height: '22%'
    },
    input: {
        flex: 0.8,
        paddingLeft: 8,
        alignSelf: 'center',
        borderRadius: 15,
        width: '85%',
        height: '7%',
        marginTop: '5%',
        fontSize: 18,
        backgroundColor: '#fff'
    },
    textLogin: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600'
    }
});
