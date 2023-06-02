import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, StatusBar } from 'react-native';

export default function Welcome1({ navigation }) {
    return (
        <ImageBackground source={require('../assets/Wel_background.png')} style={styles.container}>
            <StatusBar backgroundColor={'#6EBBFF'} barStyle={'white'}/>

            <View style={styles.view_text}>
                <Text style={styles.text1}>Hành trình đến</Text>
                <Text style={styles.text2}>Chuyến đi trong mơ của bạn</Text>
                <Text style={styles.text3}>Đăng nhập vào ứng dụng</Text>
                <Text style={styles.text4}>để thưởng thức</Text>
            </View>
            <Image source={require('../assets/Wel_human.png')} style={styles.img_human} />
            <TouchableOpacity style={styles.tou_batdau} onPress={() => navigation.navigate('Welcome2')}>
                <Text style={styles.text5}> Bắt đầu </Text>
                <Image source={require('../assets/Wel_next.png')} style={styles.img_next} resizeMode="cover" />
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop:'-10%'
    },
    view_text: {
        flex: 2,
    },
    text1: {
        marginLeft: "10%",
        marginTop: '25%',
        color: '#fff',
        fontSize: 35
    },
    text2: {
        marginLeft: "10%",
        color: '#fff',
        fontSize: 25
    },
    text3: {
        marginLeft: "10%",
        marginTop: '5%',
        color: '#fff',
        fontSize: 18
    },
    text4: {
        marginLeft: "10%",
        color: '#fff',
        fontSize: 18
    },
    text5: {
        color: '#1EABFF',
        fontWeight: 'bold',
        fontSize: 22
    },
    img_human: {
        flex: 4,
        height: '50%',
        width: '50%',
        alignSelf: 'flex-end',
        marginRight: '10%',
        resizeMode: 'cover'
    },
    img_next: {
        height: 21,
        width: 24
    },
    tou_batdau: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        alignSelf: 'center'
    }
});
