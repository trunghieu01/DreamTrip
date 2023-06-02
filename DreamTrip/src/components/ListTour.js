import { StyleSheet, TouchableOpacity, View, ImageBackground, FlatList, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import axios from 'axios';


const starImageFilled = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
const starImageCorner = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

export default function ListTour(status) {
    const navigation = useNavigation();

    const [list, setList] = useState();
    const maxRating = [1, 2, 3, 4, 5]
 
    useEffect(() => {
        axios.get(`https://dreamtrip-sx68.onrender.com/tour/${status.status}`)
            .then(res => {
                setList(res.data)
                // console.log(list)
            })
            .catch(error => console.log(error));
    }, []);

    // console.log(status.status)
    return (
        <View>
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={list}
                renderItem={({ item }) =>
                    <TouchableOpacity
                        style={styles.tou}
                        onPress={() => navigation.navigate('TourDetail', {item: item})}
                        source={require('../assets/back_item.png')}
                    >
                        <ImageBackground style={{ height: 200, width: 140, borderRadius: 30 }} source={require('../assets/back_item.png')}>
                            <Image style={styles.image} source={{ uri: item.hinhAnh[0] }} />
                            <Text style={styles.title}>{item.tenTour}</Text>
                            <View style={{flexDirection:'row'}}>
                                <Image style={{height:20, width:20, marginLeft:5}} source={require('../assets/loca_icon.png')}/>
                                <Text style={styles.loca}>{item.viTri}</Text>
                            </View>
                            <View style={{ flexDirection: 'row',alignSelf:'flex-end', marginRight:15 }}>
                                {maxRating.map((i, key) => {
                                    return (
                                        <View
                                            activeOpacity={0.5}
                                            key={i}>
                                            <Image
                                                style={styles.starImageStyle}
                                                source={
                                                    i <= item.danhGia
                                                        ? { uri: starImageFilled }
                                                        : { uri: starImageCorner }
                                                }
                                            />
                                        </View>
                                    );
                                })}
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    tou: {
        height: 200,
        width: 140,
        marginLeft: 5,
        marginTop: 15
    },
    image: {
        height: 100,
        width: 127,
        borderRadius: 15,
        marginLeft: 1.7
    },
    title: {
        fontSize: 15,
        fontWeight: '500',
        width: 120,
        height: 20,
        marginLeft: 5,
        marginVertical:5
    },
    loca: {
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 5,
        height:20,
        maxWidth:100
    },
    starImageStyle: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
    },
})

