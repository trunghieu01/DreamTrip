import { StyleSheet, Text, View, Image, TextInput, ImageBackground, StatusBar, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { logIN } from '../redux/actions/UserAction'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Login({ navigation }) {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [userEmail, setUserEmail] = useState();
    const [checkLogin, setCheckLogin] = useState(true)
    const [currentUser, setUser] = useState(null)

    GoogleSignin.configure({
        webClientId: '985937528918-gbpr615u4ihuoi6h6les42r4p2144pj5.apps.googleusercontent.com',
    });

    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }

    // Handle user state changes
    function onAuthStateChanged(user) {
        // console.log(user)
        setUserEmail(user);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);


    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    console.log('user:  '+user.user)

    const handleLogIn = () => {
        axios.get(`https://dreamtrip-sx68.onrender.com/user/login?username=${username}&password=${password}`)
            .then(res => {
                if (res.data != "") {
                    setCheckLogin(true)
                    setUser(res.data)
                    console.log(res)
                }
                else setCheckLogin(false)
            }).catch(error => console.log(error));

        if (currentUser != null) {
            setTimeout(() => {
                // console.log(currentUser.ten)
                const action = logIN(currentUser);
                AsyncStorage.setItem('userId', currentUser.document_id);
                AsyncStorage.setItem('name', currentUser.ten);
                AsyncStorage.setItem('sdt', currentUser.sdt);
                AsyncStorage.setItem('email', currentUser.email);
                AsyncStorage.setItem('diaChi', currentUser.diaChi);
                AsyncStorage.setItem('firstLogin', 'false');
                dispatch(action);
            }, 500);
        }
        // AsyncStorage.getItem('userId').then(r=>console.log('user: '+r));
    }

    useEffect(() => {
        if (currentUser != null) {
            const action = logIN(currentUser);
            AsyncStorage.setItem('userId', currentUser.document_id);
            AsyncStorage.setItem('name', currentUser.ten);
            AsyncStorage.setItem('diaChi', currentUser.diaChi);
            AsyncStorage.setItem('sdt', currentUser.sdt);
            AsyncStorage.setItem('email', currentUser.email);
            AsyncStorage.setItem('firstLogin', 'false');
            dispatch(action);
        }
    }, [currentUser])

    return (
        <ImageBackground source={require('../assets/bg_login.png')} style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
            <View style={{ flex: 1.7, justifyContent: 'flex-end' }}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
                <TextInput style={styles.input} placeholder='Email' keyboardType='email-address' onChangeText={(text) => setUserName(text)} />
                <TextInput style={styles.input} placeholder='Mật khẩu' secureTextEntry={true} onChangeText={(text) => setPassword(text)} />

                <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPassword')}
                    style={styles.forgotPw}
                >
                    <Text style={styles.forgotPwTxt}>Quên mật khẩu?</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ color: 'red', marginLeft: '12%' }}>{checkLogin ? null : 'Email hoặc mật khẩu không chính xác'}</Text>
                <TouchableOpacity style={styles.tou_login} onPress={handleLogIn}>
                    <Text style={styles.textLogin}>ĐĂNG NHẬP</Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 14, marginTop: '15%' }}>____________ Hoặc tiếp tục với ____________</Text>

                <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                    <TouchableOpacity onPress={() => {
                        onGoogleButtonPress();
                        if (userEmail != undefined) {
                            // setTimeout(() => {
                            axios.get(`https://dreamtrip-sx68.onrender.com/user/loginEmail?email=${userEmail.email}&name=${userEmail.displayName}&avatar=${userEmail.photoURL}`)
                                .then(res => {
                                    setUser(res.data)
                                    console.log(res.data)
                                })
                                .catch(error => console.log(error));
                            // }, 300)

                            // setTimeout(() => {
                            if (currentUser != null) {
                                setTimeout(() => {
                                    // console.log(currentUser)
                                    const action = logIN(currentUser);
                                    AsyncStorage.setItem('userId', currentUser.document_id);
                                    AsyncStorage.setItem('name', currentUser.ten);
                                    AsyncStorage.setItem('sdt', currentUser.sdt);
                                    AsyncStorage.setItem('diaChi', currentUser.diaChi);
                                    AsyncStorage.setItem('email', currentUser.email);
                                    AsyncStorage.setItem('firstLogin', 'false');
                                    dispatch(action);
                                }, 1000);
                            }
                            // }, 300);
                        }
                    }}>
                        <Image style={{ height: 100, width: 100, resizeMode: 'cover' }} source={require('../assets/gg.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        auth()
                            .signOut()
                            .then(() => console.log('User signed out!'));
                    }}>
                        <Image style={{ height: 100, width: 100, resizeMode: 'cover' }} source={require('../assets/fb.png')} />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                    <Text style={{ fontSize: 18 }}>Chưa có tài khoản? </Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('SignUp') }}>
                        <Text style={{ fontSize: 18, color: '#4D94FF' }}> Đăng ký ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    logo: {
        // flex:3,
        alignSelf: 'center',
        // justifyContent:'center',
        height: '30%',
        width: '50%',
        resizeMode: 'cover'
    },
    tou_login: {
        justifyContent: 'center',
        backgroundColor: '#1EABFF',
        borderRadius: 16,
        width: windowWidth * 0.8,
        height: windowHeight * 0.07,
        // marginTop:'-7%'
    },
    input: {
        // flex:0.5,
        paddingLeft: 8,
        alignSelf: 'center',
        borderRadius: 15,
        width: '85%',
        height: '12%',
        marginTop: '7%',
        fontSize: 18,
        backgroundColor: '#fff'
    },
    textLogin: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600'
    },
    textSignup: {
        color: '#1EABFF',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600'
    },
    forgotPwTxt: {
        // flex:1,
        marginTop: '3%',
        color: '#918AB1',
        textDecorationLine: 'underline',
        fontStyle: 'italic',
        fontSize: 16,
        fontWeight: 500
    },
    forgotPw: {
        // flex:0.5,
        height: windowHeight * 0.06,
        width: windowWidth * 0.3,
        alignSelf: 'flex-end',
        marginRight: '8%',
        paddingTop: '3%',
    }
});
