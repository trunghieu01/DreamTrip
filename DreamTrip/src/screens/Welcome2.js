import { StyleSheet, Text, TouchableOpacity, View, Image, Animated, StatusBar } from 'react-native';
import { useRef, useEffect } from 'react';

export default function Welcome2({ navigation }) {

    const anim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(
            anim,
            {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true
            }
        ).start();
    }, [])


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'white'} barStyle='dark-content' />

            <View style={{ flex: 1 }}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
                <Animated.Text style={[styles.text, { opacity: anim }]}>Đăng nhập vào ứng dụng{'\n'}để thưởng thức!</Animated.Text>
            </View>

            <Animated.View style={{ opacity: anim, flex: 1, alignItems: 'center' }}>
                <TouchableOpacity style={styles.tou_login} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.textLogin}>ĐĂNG NHẬP</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tou_singup} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.textSignup}>ĐĂNG KÝ</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    logo: {
        alignSelf: 'center',
        marginTop: '30%',
        height: '50%',
        width: '60%',
        resizeMode: 'cover'
    },
    tou_login: {
        justifyContent: 'center',
        backgroundColor: '#1EABFF',
        borderRadius: 15,
        marginTop: '20%',
        width: '80%',
        height: '12%'
    },
    tou_singup: {
        justifyContent: 'center',
        borderColor: '#1EABFF',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: '10%',
        width: '80%',
        height: '12%'
    },
    text: {
        marginTop: '5%',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '300'
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
    }
});
