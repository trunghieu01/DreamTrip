import { StyleSheet, Text, TouchableOpacity, View, Image, StatusBar } from 'react-native';
import PlansTopTabbar from '../tab/PlansTopTabbar';

export default function Plans() {

    return (
        <View style={styles.container}>
            {/* <StatusBar translucent={false} backgroundColor={'transparent'}/> */}
            <Text style={{ marginTop: '10%', height: '5%', alignSelf: 'center', textAlign: 'center', fontSize: 24, fontWeight: '600' }}>Kế hoạch</Text>
            <PlansTopTabbar />
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
});
