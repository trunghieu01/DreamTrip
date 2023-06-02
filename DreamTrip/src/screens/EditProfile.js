import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default function EditProfile({ navigation }) {

    const [ten, setTen] = useState('')
    const [dc, setDC] = useState('')
    const [email, setEmail] = useState(null)
    const [sdt, setSDT] = useState('')
    const [id, setID] = useState(null)
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState(true)
    const [saved, setSaved] = useState(false)

    if (email == null)
        AsyncStorage.getItem('email').then((rs) => { setEmail(rs) })
    if (id == null)
        AsyncStorage.getItem('userId').then((rs) => { setID(rs) })

    const HideKeyboard = ({ children }) => (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );

    const save = () => {
        if (ten.length > 0 && dc.length > 0 && /(0[3|5|7|8|9])+([0-9]{8})\b/g.test(sdt)) {
            const info = {
                document_id: id,
                sdt: sdt,
                ten: ten,
                diaChi: dc,
                email: email,
                avatar: 'https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/duck.png?alt=media&token=90dacf0c-342f-4276-9976-26aabb53e5fd'
            }

            axios.put(`https://dreamtrip-sx68.onrender.com/user/update`, info).then(function (response) {
                // if(response)
                setMessage("Lưu thành công")
                setStatus(true)
                setSaved(true)
            }).catch((error) => {
                setStatus(false)
                setSaved(false)
                console.log(error);
            })
        } else {
            setMessage('Không hợp lệ')
            setStatus(false)
        }
    }
    console.log(ten+sdt+dc)

    return (
        <HideKeyboard>
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'transparent'} />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <TouchableOpacity style={{ height: height * 0.1, width: width * 0.1, marginLeft: width * 0.05, alignSelf: 'flex-end' }} onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/back_icon.png')} style={{ height: height * 0.05, width: width * 0.05, top: -height * 0.01 }} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Chỉnh sửa hồ sơ</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Image style={{ width: width * 0.3, height: width * 0.3, borderRadius: 30, marginLeft: '3%', alignSelf: 'center' }} source={require('../assets/duck.png')} />
                </View>
                <View style={{ flex: 4 }}>
                    <TextInput style={styles.txtInput} placeholder='Họ và tên' onEndEditing={(text) => setTen(text.nativeEvent.text)} defaultValue={ten}/>
                    <TextInput style={styles.txtInput} placeholder='Số điện thoại' keyboardType='number-pad' onEndEditing={(text) => setSDT(text.nativeEvent.text)} defaultValue={sdt}/>
                    <TextInput style={styles.txtInput} placeholder='Địa chỉ' onEndEditing={(text) => setDC(text.nativeEvent.text)} defaultValue={dc}/>

                    <Text style={{ left: "15%", color: status ? saved ? "blue" : 'white' : 'red' }}>{message}</Text>

                    <View style={{ flex: 3, justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.tou_edit} onPress={save}>
                            <Text style={styles.txt_edit}>Lưu</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 0.5 }} />
                </View>
            </View>
        </HideKeyboard>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
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
        flex: 0.3,
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
    txtInput: {
        flex: 0.7,
        backgroundColor: 'white',
        fontSize: 21,
        fontWeight: '400',
        width: width * 0.85,
        alignSelf: 'center',
        borderRadius: 20,
        margin: height * 0.02,
        paddingLeft: 20
    }
});
