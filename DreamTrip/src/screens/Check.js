import { StyleSheet, Text, TouchableOpacity, View, Image, StatusBar, ImageBackground } from 'react-native';

export default function Check({ navigation, route }) {
    const email = route.params.email
    return (
        <ImageBackground source={require('../assets/bg_login.png')} style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'}/>
            <View style={{ flex: 4 }}>
                <Text style={{ alignSelf: 'center', paddingTop: '35%', width: '60%', textAlign: 'center', fontSize: 30, fontWeight: '600' }}>Kiểm tra hộp thư của bạn</Text>
                <TouchableOpacity style={{ alignSelf: 'center', marginTop:'7%'}}>
                    <Image style={{ height: 170, width: 170, resizeMode: 'cover' }} source={require('../assets/successfull.png')}></Image>
                </TouchableOpacity>
                <Text style={{ alignSelf: 'center', width: '80%', textAlign: 'center', fontSize: 20, fontWeight: '300' }}>Kiểm tra Email hoặc Số điện thoại của bạn để lấy OTP</Text>
            </View>
            <View style={{ flex: 5 }}>
                <TouchableOpacity style={styles.tou_OTP} onPress={() => navigation.navigate('EnterOTP', {email:email})}>
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
