import { StyleSheet, Text, Button, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE } from '../redux/actions/InteractiveAction';
import axios from 'axios';

const starImageFilled = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
const starImageCorner = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

export default function Reviews({ navigation, route }) {

    const maxRating = [1, 2, 3, 4, 5];
    const [rating, setRating] = useState(5);
    const feeling = ['Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời']
    const [comment, setComment] = useState('');
    const id = route.params.id
    const tourId = route.params.tourId
    const hdId = route.params.hdId
    const dispatch = useDispatch()

    console.log(id, tourId)


    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, marginLeft: '5%', fontWeight: '500' }}>Đánh giá trải nghiệm của bạn</Text>
            <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                <Text style={{ fontSize: 16, marginLeft: '3%', fontWeight: '400', textDecorationLine: 'underline' }}>Mức độ hài lòng:</Text>
                <View style={{ flexDirection: 'row', marginLeft: '2%' }}>
                    {maxRating.map((i, key) => {
                        return (
                            <View
                                activeOpacity={0.5}
                                key={i}>
                                <TouchableOpacity onPress={() => setRating(i)}>
                                    <Image
                                        style={styles.starImageStyle}
                                        source={
                                            i <= rating
                                                ? { uri: starImageFilled }
                                                : { uri: starImageCorner }
                                        }
                                    />
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
                <Text style={{ fontSize: 16, marginLeft: '2%', fontWeight: '500', color: '#FFA500' }}>{feeling[rating - 1]}</Text>
            </View>
            <Text style={styles.txt}>Bình luận:</Text>
            <TextInput
                // placeholder={comment == '' ? 'Tối đa 100 ký tự' : comment}
                placeholder={'Tối đa 100 ký tự'}
                maxLength={100}
                multiline={true}
                style={styles.textInput}
                value={comment}
                onChangeText={(txt) => setComment(txt)}
            />
            <View style={{ flexDirection: 'row', marginTop: '1%', justifyContent: 'flex-end' }}>
                <View style={{ marginRight: '2%', width: '20%' }}>
                    <Button title='Hủy' onPress={() => navigation.goBack()} />
                </View>

                <View style={{ marginRight: '3%', width: '20%' }}>
                    <Button title='Gửi' color={'#FF6347'} onPress={() => {
                        axios.put(`https://dreamtrip-sx68.onrender.com/danhGia/update?id=${id}&comment=${comment}&tourId=${tourId}&rate=${rating}&hdId=${hdId}`)
                            .then()
                            .catch(error => console.log(error));
                        dispatch(CHANGE(Math.floor(Math.random() * 1000000)))
                        navigation.goBack()
                    }} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    starImageStyle: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
    },
    textInput: {
        fontSize: 16,
        fontWeight: '400',
        marginTop: '1%',
        height: '20%',
        backgroundColor: '#fff',
        width: '95%',
        alignSelf: 'center',
        borderRadius: 15
    },
    txt: {
        fontSize: 16,
        marginLeft: '3%',
        fontWeight: '400',
        textDecorationLine: 'underline',
        marginTop: '3%'
    }
});
