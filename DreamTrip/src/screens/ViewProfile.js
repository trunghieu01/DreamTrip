import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default function ViewProfile({ navigation }) {

    const [ten, setTen] = useState(null);
    const [email, setEmail] = useState(null)
    const [sdt, setSDT] = useState(null)
    const [diaChi, setDiaChi] = useState(null)
    if (ten == null)
        AsyncStorage.getItem('name').then((rs) => { setTen(rs) })
    if (email == null)
        AsyncStorage.getItem('email').then((rs) => { setEmail(rs) })
    if (sdt == null)
        AsyncStorage.getItem('sdt').then((rs) => { setSDT(rs) })
    if (diaChi == null)
        AsyncStorage.getItem('diaChi').then((rs) => { setDiaChi(rs) })

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                <TouchableOpacity style={{ height: height * 0.1, width: width * 0.1, marginLeft: width * 0.05, alignSelf: 'flex-end' }} onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/back_icon.png')} style={{ height: height * 0.05, width: width * 0.05, top: -height * 0.01 }} />
                </TouchableOpacity>
                <Text style={styles.title}>Hồ sơ của bạn</Text>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', left: -width * 0.1 }}>
                    <Text style={{ marginLeft: '5%', alignSelf: 'center', fontSize: 22 }}>Chào! {ten}</Text>
                    <Image style={{ width: 70, height: 70, borderRadius: 30, marginLeft: '3%', alignSelf: 'center' }} source={require('../assets/duck.png')} />
                </View>
            </View>
            <View style={{ flex: 4 }}>
                <View style={{ flex: 1, width: width * 0.8, alignSelf: 'center', fontSize: 22, fontWeight: '500' }}>
                    <Text style={styles.txt1}>Họ và tên</Text>
                    <Text style={styles.txt2}>{ten}</Text>
                </View>
                <View style={{ flex: 1, width: width * 0.8, alignSelf: 'center', fontSize: 22, fontWeight: '500' }}>
                    <Text style={styles.txt1}>Email</Text>
                    <Text style={styles.txt2}>{email}</Text>
                </View>
                <View style={{ flex: 1, width: width * 0.8, alignSelf: 'center', fontSize: 22, fontWeight: '500' }}>
                    <Text style={styles.txt1}>Số điện thoại</Text>
                    <Text style={styles.txt2}>{sdt}</Text>
                </View>
                <View style={{ flex: 1, width: width * 0.8, alignSelf: 'center', fontSize: 22, fontWeight: '500' }}>
                    <Text style={styles.txt1}>Địa chỉ</Text>
                    <Text style={styles.txt2}>{diaChi}</Text>
                </View>
                <View style={{ flex: 2, justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.tou_edit} onPress={() => navigation.navigate('EditProfile')}>
                        <Text style={styles.txt_edit}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }} />
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
        marginLeft: '5%',
        fontWeight: '600'
    },
    tou_edit: {
        flex: 0.25,
        backgroundColor: '#52BBFF',
        width: width * 0.85,
        alignSelf: 'center',
        borderRadius: 15,
        justifyContent: 'center'
    },
    txt_edit: {
        color: 'white',
        fontWeight: '600',
        fontSize: 22,
        alignSelf: 'center'
    },
    txt1: {
        flex: 0.35,
        fontSize: 21,
        fontWeight: '500',
        color: 'grey'
    },
    txt2: {
        flex: 0.3,
        fontSize: 19,
        fontWeight: '500',
        borderBottomWidth: 2,
        borderColor: '#f1f1f1'
    }
});
