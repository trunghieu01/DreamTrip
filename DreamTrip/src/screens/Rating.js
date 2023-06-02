import { StyleSheet, Text, TouchableOpacity, View, Image, StatusBar, Dimensions } from 'react-native';
import RatingTopTabbar from '../tab/RatingTopTabbar';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height

export default function Rating({navigation}) {

    return (
        <View style={styles.container}>
            {/* <StatusBar translucent={false} backgroundColor={'transparent'} /> */}
            <View style={{flexDirection:'row', marginTop:'10%'}}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/back_icon.png')} style={styles.head} />
                </TouchableOpacity>
                <Text style={{  alignSelf: 'center', textAlign: 'center', marginBottom: '2%', fontSize: 24, fontWeight: '600' }}>Đánh giá của tôi</Text>
            </View>
            <RatingTopTabbar />
            <View style={{ height: '7%' }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center'
    },
    head: {
        width: width * 0.12,
        height: width * 0.12
    },
    back: {
        width: width * 0.15,
        height: width * 0.15,
    },
});
