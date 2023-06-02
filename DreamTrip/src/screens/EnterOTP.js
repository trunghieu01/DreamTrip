import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, StatusBar, Linking } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function EnterOTP({ navigation, route }) {

    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();
    const [actualOTP, setActualOTP] = useState('');
    const [check, setCheck] = useState(true);
    const [otp1, setOtp1] = useState("");
    const [otp2, setOtp2] = useState("");
    const [otp3, setOtp3] = useState("");
    const [otp4, setOtp4] = useState("");
    var otp = otp1 + otp2 + otp3 + otp4
    const email = route.params.email;

    useEffect(() => {
        axios.get(`https://dreamtrip-sx68.onrender.com/otp/get?email=${email}`).then((res) => { setActualOTP(res.data.otp) })

    })

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <TouchableOpacity style={styles.tou_back} onPress={() => navigation.navigate('ForgotPassword')}>
                <Image style={{ height: 40, width: 40, resizeMode: 'cover' }} source={require('../assets/back_icon.png')}></Image>
            </TouchableOpacity>
            <View style={{ flex: 2 }}>
                <Text style={{ alignSelf: 'center', paddingTop: '15%', width: '60%', textAlign: 'center', fontSize: 30, fontWeight: '600' }}>Xác minh OTP</Text>
                <Text style={{ alignSelf: 'center', marginTop: '5%', width: '80%', textAlign: 'center', fontSize: 22, fontWeight: '300' }}>Chúng tôi sẽ gửi cho bạn một mã xác thực vào địa chỉ này.</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: '10%' }}>
                <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={firstInput}
                    onChangeText={text => {
                        setOtp1(text);
                        text && secondInput.current.focus();
                    }}
                />
                <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={secondInput}
                    onChangeText={text => {
                        setOtp2(text);
                        text ? thirdInput.current.focus() : firstInput.current.focus();
                    }}
                />
                <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={thirdInput}
                    onChangeText={text => {
                        setOtp3(text);
                        text ? fourthInput.current.focus() : secondInput.current.focus();
                    }}
                />
                <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={fourthInput}
                    onChangeText={text => {
                        setOtp4(text);
                        !text && thirdInput.current.focus();
                    }}
                />
            </View>

            <View style={{ flex: 2 }}>
                <Text style={{ color: 'red', alignSelf: 'center' }}>{check ? null : 'Không hợp lệ'}</Text>
                <TouchableOpacity style={styles.tou_OTP}
                    onPress={() => {
                        setTimeout(() => {
                            console.log(otp + ':' + actualOTP)
                            if (actualOTP == otp) {
                                navigation.navigate('ResetPassword', {email, email})
                                setCheck(true)
                            }
                            else setCheck(false)
                        }, 500);
                    }}>
                    <Text style={styles.textOTP}>XÁC NHẬN</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 3 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
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
    tou_back: {
        flex: 1,
        alignSelf: 'flex-start',
        paddingTop: '15%',
        width: '20%',
        marginLeft: '3%'
    },
    input: {
        borderRadius: 10,
        height: '70%',
        width: '15%',
        margin: '3%',
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '600'
    },
    textOTP: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600'
    }
});
