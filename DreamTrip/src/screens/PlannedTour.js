import { StyleSheet, Text, View, Dimensions, StatusBar, Image, TouchableOpacity } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import ListActivity from '../components/ListActivity';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE } from '../redux/actions/InteractiveAction';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height

export default function PlannedTour({ navigation, route }) {

    const tour = route.params.item
    const userId = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} />

            <View style={styles.map}>
                <MapView
                    style={{ height: '100%', width }}
                    region={{
                        latitude: tour.latitude,
                        longitude: tour.longitude,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.7,
                    }}
                >
                    <Marker coordinate={{ latitude: tour.latitude, longitude: tour.longitude }} />
                </MapView>

                <TouchableOpacity style={{ position: 'absolute', top: height * 0.03 }} onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/back_icon.png')} style={{ height: 50, width: width * 0.1 }} />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 2 }}>
                <View style={{ flex: 1, width: '90%', alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', maxHeight: 50 }}>{tour.tenTour}</Text>
                        <Text style={{ fontSize: 18, color: 'grey', maxHeight: 25, marginLeft: 15 }}>{tour.viTri}</Text>
                    </View>
                </View>
                <View style={{ flex: 6 }}>
                    <ListActivity id={tour.document_id} />
                </View>
            </View>
            <TouchableOpacity style={styles.btnOut}
                onPress={() => {
                    axios.put(`https://dreamtrip-sx68.onrender.com/tuongtac/dropOurPlan?userId=${userId}&tourId=${tour.document_id}`)
                        .then(() => {
                            dispatch(CHANGE(Math.floor(Math.random() * 100000)))
                            navigation.goBack()
                        })
                        .catch(error => console.log(error));

                }}
            >
                <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold', }}>Xóa kế hoạch</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    map: {
        flex: 1,
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: 'black',
        overflow: 'hidden'
    },
    btnOut: {
        justifyContent: 'center',
        backgroundColor: '#FF6347',
        position: 'absolute',
        top: '94%', left: '60%',
        height: '4.5%',
        width: '37%',
        borderRadius: 15
    }
});
