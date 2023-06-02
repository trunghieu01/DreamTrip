import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView, StatusBar } from 'react-native';
import { default as ListFilter } from '../components/ListFilter';
import { useRef, useState } from 'react';

export default function Search_Filter({ navigation, route }) {
    const [scrollRef, setScrollRef] = useState(0);
    const [txtTemp, setTxtTemp] = useState();
    const [searchName, setSearchName] = useState(route.params.name);
    const [category, setCategory] = useState(route.params.cate)

    const HideKeyboard = ({ children }) => (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );

    return (

        <View style={styles.container} >
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <HideKeyboard>
                <View style={styles.header}>
                    <View style={{}}>
                        <View style={{ flexDirection: 'row', marginLeft: '-12%' }}>
                            <TouchableOpacity style={{ height: '45%', width: '15%', alignSelf: 'flex-end' }} onPress={() => navigation.goBack()}>
                                <Image source={require('../assets/back_icon.png')} style={{ height: '100%', width: '100%', resizeMode: 'cover', }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 22, alignSelf: 'flex-end' }}>Ở đâu</Text>
                        </View>
                        <Text style={{ fontSize: 26, fontWeight: '600' }}>Bạn muốn đi đâu?</Text>
                    </View>
                    <Image source={require('../assets/duck.png')} style={{ height: 60, width: 62, borderRadius: 30 }} />
                </View>

            </HideKeyboard>

            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={styles.view_search}>
                    <TextInput
                        style={{ fontSize: 18, marginLeft: '8%', width: "75%" }}
                        placeholder={searchName== undefined ? 'Khám phá những điều thú vị': searchName}
                        onChangeText={(text) => setTxtTemp(text)}
                    />
                    <HideKeyboard>
                        <TouchableOpacity style={{ justifyContent: 'flex-end' }} onPress={() => setSearchName(txtTemp)}>
                            <Image style={{ height: 30, width: 30 }} source={require('../assets/search_icon.png')} />
                        </TouchableOpacity>
                    </HideKeyboard>
                </View>
            </View>

            <View style={{ flex: 5, marginTop: '-2%' }}>
                <Text style={{ fontSize: 22, fontWeight: '500', flex: 1, marginLeft: '7%', marginTop: '-3%' }}>Thể loại</Text>
                <ScrollView
                    contentOffset={{ x: scrollRef, y: 0 }}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={'normal'}
                    horizontal={true}
                    style={{ flexDirection: 'row', flex: 1, marginLeft: '6%', marginTop: '-15%', marginRight: '2%' }}
                >
                    <View style={styles.cate_view}>
                        <TouchableOpacity
                            style={[styles.tou_cate, { backgroundColor: category == "all" ? '#5EC2FF' : '#fff' }]}
                            onPress={() => {
                                setCategory("all")
                                setScrollRef(0)
                            }}
                        >
                            <Image source={require('../assets/all.png')} style={{ height: 40, width: 40, alignSelf: 'center' }} />
                        </TouchableOpacity>
                        <Text>Tất cả</Text>
                    </View>
                    <View style={styles.cate_view}>
                        <TouchableOpacity
                            style={[styles.tou_cate, { backgroundColor: category == "thien nhien" ? '#5EC2FF' : '#fff' }]}
                            onPress={() => {
                                setCategory("thien nhien")
                                setScrollRef(0)
                            }}
                        >
                            <Image source={require('../assets/sinhthai.png')} style={{ height: 35, width: 30, alignSelf: 'center' }} />
                        </TouchableOpacity>
                        <Text>Thiên nhiên</Text>
                    </View>
                    <View style={styles.cate_view}>
                        <TouchableOpacity
                            style={[styles.tou_cate, { backgroundColor: category == "the thao" ? '#5EC2FF' : '#fff' }]}
                            onPress={() => {
                                setCategory("the thao")
                                setScrollRef(90)
                            }}
                        >
                            <Image source={require('../assets/nhaydu.png')} style={{ height: 30, width: 40, alignSelf: 'center' }} />
                        </TouchableOpacity>
                        <Text>Thể thao</Text>
                    </View>
                    <View style={styles.cate_view}>
                        <TouchableOpacity
                            style={[styles.tou_cate, { backgroundColor: category == "tham quan" ? '#5EC2FF' : '#fff' }]}
                            onPress={() => {
                                setCategory("tham quan")
                                setScrollRef(180)
                            }}
                        >
                            <Image source={require('../assets/thangcanh.png')} style={{ height: 40, width: 20, alignSelf: 'center' }} />
                        </TouchableOpacity>
                        <Text>Thắng cảnh</Text>
                    </View>
                    <View style={styles.cate_view}>
                        <TouchableOpacity
                            style={[styles.tou_cate, { backgroundColor: category == "nghi duong" ? '#5EC2FF' : '#fff' }]}
                            onPress={() => {
                                setCategory("nghi duong")
                                setScrollRef(180)
                            }}
                        >
                            <Image source={require('../assets/nghiduong.png')} style={{ height: 40, width: 40, alignSelf: 'center' }} />
                        </TouchableOpacity>
                        <Text>Nghỉ dưỡng</Text>
                    </View>
                    <View style={styles.cate_view}>
                        <TouchableOpacity
                            style={[styles.tou_cate, { backgroundColor: category == "bien" ? '#5EC2FF' : '#fff' }]}
                            onPress={() => {
                                setCategory("bien")
                                setScrollRef(180)
                            }}
                        >
                            <Image source={require('../assets/sea.png')} style={{ height: 40, width: 40, alignSelf: 'center' }} />
                        </TouchableOpacity>
                        <Text>Biển</Text>
                    </View>
                </ScrollView>
                <View style={{ flex: 5 }}>
                    <ListFilter cate={category} name={searchName} />
                </View>
            </View>
        </View>
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
        height: '80%',
        width: '70%',
        backgroundColor: '#fff',
        borderRadius: 15,
        justifyContent: 'center'
    },
    cate_view: {
        height: 80, width: 90, alignItems: 'center'
    }
});
