import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ImageBackground, StatusBar } from 'react-native';
import axios from 'axios';
import { useState } from 'react';

export default function ForgotPassword({ navigation }) {

    const [acc, setAcc] = useState();
    const [email, setEmail] = useState('');
    const [check, setCheck] = useState(false);
    const [show, setShow] = useState(false);

    return (
        <ImageBackground source={require('../assets/bg_login.png')} style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <TouchableOpacity style={{ flex: 1, alignSelf: 'flex-start', paddingTop: '15%', width: '20%' }} onPress={() => navigation.goBack()}>
                <Image style={{ height: 40, width: 40, resizeMode: 'cover' }} source={require('../assets/back_icon.png')}></Image>
            </TouchableOpacity>
            <View style={{ flex: 2 }}>
                <Text style={{ alignSelf: 'center', paddingTop: '15%', width: '60%', textAlign: 'center', fontSize: 30, fontWeight: '600' }}>Quên mật khẩu</Text>
                <Text style={{ alignSelf: 'center', marginTop: '5%', width: '80%', textAlign: 'center', fontSize: 22, fontWeight: '300' }}>Nhập email của bạn để đặt lại mật khẩu</Text>
            </View>
            <TextInput style={styles.input} placeholder='Nhập Email' onChangeText={txt => setEmail(txt)} keyboardType='email-address' />
            <View style={{ flex: 2 }}>
                <Text style={{ marginLeft: '12%', color: 'red', marginTop: '2%' }}>{show ? 'Email không hợp lệ' : null}</Text>
                <TouchableOpacity style={styles.tou_OTP} onPress={() => {
                    axios.get(`https://dreamtrip-sx68.onrender.com/taikhoan/loggin?username=${email}`)
                        .then((res) => {
                            if (res.data != null) {
                                setAcc(res.data)
                                // console.log(res.data)
                                setCheck(true)
                                setShow(false)
                            } else setShow(true)
                        })
                    setTimeout(() => {
                        if (check) {
                            axios.post(`https://dreamtrip-sx68.onrender.com/otp/create?email=${email}`)
                            navigation.navigate('Check', {email:email})
                        }
                    }, 300);
                }}>
                    <Text style={styles.textOTP}>GỬI OTP</Text>
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
        marginTop: '5%',
        width: '85%',
        flex: 0.45,
        alignSelf: 'center'
    },
    input: {
        flex: 0.55,
        paddingLeft: 15,
        alignSelf: 'center',
        borderRadius: 15,
        width: '85%',
        marginTop: '20%',
        fontSize: 18,
        backgroundColor: '#fff'
    },
    textOTP: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600'
    }
});
