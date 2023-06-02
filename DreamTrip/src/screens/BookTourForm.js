import { StyleSheet, TouchableOpacity, View, TextInput, Text, Image, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import DatePicker from 'react-native-date-picker'
import { CHANGE } from '../redux/actions/InteractiveAction';

export default function BookTourForm({ navigation, route }) {

    const tourId = route.params.tourId
    const chech = useSelector(state => state.interact);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [ngayDi, setNgayDi] = useState(new Date());
    const [sdt, setSDT] = useState();
    const [nguoiLon, setNguoiLon] = useState();
    const [treEm, setTreEm] = useState();
    const [message, setMessage] = useState("Dữ liệu không hợp lệ")
    const [check, setCheck] = useState(true)
    const [userId, setUserId] = useState();

    AsyncStorage.getItem('userId').then((rs) => { setUserId(rs) })

    useEffect(() => {
        axios.get(`http://192.168.1.2:8080/datTour/check`, {
            params: {
                tourId: tourId,
                userId: userId
            }
        }).then((response) => {
            if (response.data != null)
                setCheck(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thông tin hành khách</Text>
            <View style={styles.view1}>
                <TextInput style={styles.input1} placeholder='Ngày đi mong muốn' value={ngayDi.toLocaleDateString()} editable={false} onChangeText={(txt) => setNgayDi(txt)} />
                <TouchableOpacity style={{ justifyContent: 'center', marginRight: 60 }} onPress={() => setOpen(true)}>
                    <Image source={require('../assets/calendar.jpg')} style={{ height: 60, width: 60 }} />
                </TouchableOpacity>
            </View>
            <DatePicker
                modal
                open={open}
                date={ngayDi}
                mode='date'
                locale='vi'
                onConfirm={(date) => {
                    setOpen(false)
                    setNgayDi(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
            <TextInput style={styles.input} placeholder='Số điện thoại' keyboardType='number-pad' maxLength={10} onChangeText={(txt) => setSDT(txt)} />
            <TextInput style={styles.input} placeholder='Số người lớn' keyboardType='numeric' onChangeText={(txt) => setNguoiLon(txt)} />
            <TextInput style={styles.input} placeholder='Số trẻ em' keyboardType='numeric' onChangeText={(txt) => setTreEm(txt)} />
            <View style={styles.btnView}>
                <TouchableOpacity style={styles.btnCancel} onPress={() => navigation.goBack()}>
                    <Text style={styles.btnText}>Hủy</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnSubmit} onPress={() => {
                    if (ngayDi > new Date() && /(0[3|5|7|8|9])+([0-9]{8})\b/g.test(sdt) && nguoiLon > 0 && treEm >= 0) {
                        if (check) {
                            const info = {
                                nguoiDungId: userId,
                                tourId: tourId,
                                sdt: sdt,
                                nguoiLon: nguoiLon,
                                treEm: treEm,
                                ngayDi: ngayDi,
                                status: false
                            }


                            axios.post(`https://dreamtrip-sx68.onrender.com/datTour/insert`, info).then(function (response) {
                                // if(response)
                                setMessage("Đặt tour thành công")
                                console.log(response);
                            }).catch((error) => {
                                console.log(error);
                            })
                            dispatch(CHANGE(Math.floor(Math.random() * 100000)))
                            Alert.alert("Thông báo", "Đặt tour thành công");
                            navigation.goBack();
                        } else {
                            Alert.alert("Thông báo", "Yêu cầu đặt tour trước đó của bạn vẫn chưa được xác nhận");
                        }
                    } else {
                        Alert.alert("Thông báo", "Dữ liệu không hợp lệ");
                    }
                }}>
                    <Text style={styles.btnText}>Gửi</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        // flex:1,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f3f3'
    },
    input: {
        height: '9%',
        borderRadius: 15,
        marginVertical: '3%',
        backgroundColor: '#fff',
        width: '80%',
        alignSelf: 'center',
        paddingLeft: 20,
        fontSize: 17
    },
    input1: {
        borderRadius: 15,
        marginVertical: '3%',
        backgroundColor: '#fff',
        width: '80%',
        alignSelf: 'center',
        paddingLeft: 20,
        fontSize: 17,
        color: 'black'
    },
    title: {
        fontSize: 30,
        fontWeight: '500',
        marginVertical: 5,
        alignSelf: 'center',
        marginBottom: '20%',
        marginTop: '20%'
    },
    btnText: {
        fontSize: 26,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'black'
    },
    btnView: {
        flexDirection: 'row',
        marginTop: '30%',
        resizeMode: 'cover',
        justifyContent: 'space-around',
        height: '7%'
    },
    btnSubmit: {
        borderWidth: 1,
        backgroundColor: 'green',
        borderRadius: 15,
        width: '30%',
        justifyContent: 'center'
    },
    btnCancel: {
        borderWidth: 1,
        backgroundColor: 'red',
        borderRadius: 15,
        width: '30%',
        justifyContent: 'center'
    },
    view1: {
        flexDirection: 'row',
        height: '9%',
        borderRadius: 15,
        marginVertical: '3%',
        backgroundColor: '#fff',
        width: '80%',
        alignSelf: 'center',
    }
})

