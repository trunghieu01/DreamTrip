import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ImageBackground, ScrollView, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import { default as ListTour } from '../components/ListTour';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Home({ navigation }) {

    const user = useSelector(state => state.user);

    console.log(user)

    const [txtName, setTxtName] = useState("");

    const HideKeyboard = ({ children }) => (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );

    return (
        <ImageBackground source={require('../assets/home_background.png')} style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'}/>
            <HideKeyboard>
                <View style={styles.header}>
                    <View style={{}}>
                        <Text style={{ fontSize: 22 }}>Ở đâu</Text>
                        <Text style={{ fontSize: 26, fontWeight: '600' }}>Bạn muốn đi đâu?</Text>
                    </View>
                    <Image source={require('../assets/duck.png')} style={{ height: 60, width: 62, borderRadius: 30 }} />
                </View>
            </HideKeyboard>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={styles.view_search}>
                    <TextInput style={{ fontSize: 18, marginLeft: '8%' }}
                        placeholder='Khám phá những điều thú vị'
                        onChangeText={(text) => setTxtName(text)}
                    />
                    <TouchableOpacity style={{ marginLeft: '10%' }} onPress={() => navigation.navigate('Search_Filter', { cate: "all", name: txtName })}>
                        <Image style={{ height: 30, width: 30 }} source={require('../assets/search_icon.png')} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 4, marginLeft: '7%', marginTop: '-2%' }}>
                <ScrollView nestedScrollEnabled >
                    <Text style={{ fontSize: 22, fontWeight: '500', flex: 1 }}>Thể loại</Text>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        style={{ flexDirection: 'row', marginTop: '5%', flex: 1, marginLeft: '-3%' }}>
                        <View style={styles.cate_view}>
                            <TouchableOpacity style={styles.tou_cate} onPress={() => navigation.navigate('Search_Filter', { cate: "all", name: txtName })}>
                                <Image source={require('../assets/all.png')} style={{ height: 40, width: 40, alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <Text>Tất cả</Text>
                        </View>
                        <View style={styles.cate_view}>
                            <TouchableOpacity style={styles.tou_cate} onPress={() => navigation.navigate('Search_Filter', { cate: "thien nhien", name: txtName })}>
                                <Image source={require('../assets/sinhthai.png')} style={{ height: 35, width: 30, alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <Text>Thiên nhiên</Text>
                        </View>
                        <View style={styles.cate_view}>
                            <TouchableOpacity style={styles.tou_cate} onPress={() => navigation.navigate('Search_Filter', { cate: "the thao", name: txtName })}>
                                <Image source={require('../assets/nhaydu.png')} style={{ height: 30, width: 40, alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <Text>Thể thao</Text>
                        </View>
                        <View style={styles.cate_view}>
                            <TouchableOpacity style={styles.tou_cate} onPress={() => navigation.navigate('Search_Filter', { cate: "tham quan", name: txtName })}>
                                <Image source={require('../assets/thangcanh.png')} style={{ height: 40, width: 20, alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <Text>Tham quan</Text>
                        </View>
                        <View style={styles.cate_view}>
                            <TouchableOpacity style={styles.tou_cate} onPress={() => navigation.navigate('Search_Filter', { cate: "nghi duong", name: txtName })}>
                                <Image source={require('../assets/nghiduong.png')} style={{ height: 40, width: 40, alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <Text>Nghỉ dưỡng</Text>
                        </View>
                        <View style={styles.cate_view}>
                            <TouchableOpacity style={styles.tou_cate} onPress={() => navigation.navigate('Search_Filter', { cate: "bien", name: txtName })}>
                                <Image source={require('../assets/sea.png')} style={{ height: 40, width: 40, alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <Text>Biển</Text>
                        </View>
                    </ScrollView>

                    <Text style={{ fontSize: 22, fontWeight: '500', flex: 1, marginTop: '7%' }}>Chuyến đi phổ biến </Text>
                    <ListTour status={"findPopular"} />

                    <Text style={{ fontSize: 22, fontWeight: '500', flex: 1, marginTop: '7%' }}>Xu hướng</Text>
                    <ListTour status={"findTrending"} />
                    <View style={{ height: 70 }} />
                </ScrollView>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    view_search: {
        height: '45%',
        width: '85%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        marginBottom: '-4%'
    },
    tou_cate: {
        height: 60,
        width: '70%',
        backgroundColor: '#fff',
        borderRadius: 15,
        justifyContent: 'center'
    },
    cate_view: {
        height: 80, width: 90, alignItems: 'center'
    }
});
