import { Image, ImageBackground, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScreensAccount, ScreensHome, ScreensPlans } from '../screens';
import Profile from '../navigation/Profile';
const Tab = createBottomTabNavigator();

export default function Tabbar() {

    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { marginLeft: '3%', width: '94%', height: '7%', paddingTop: '2%', paddingBottom: '2%', borderRadius: 25, position: 'absolute', marginBottom: '1%' } }}>
            <Tab.Screen name="Trang chủ" component={ScreensHome} options={{
                tabBarIcon: ({ focused }) => (focused ? <Image source={require('../assets/blue_home.png')} style={{ width: 24, height: 24 }} /> : <Image source={require('../assets/home.png')} style={{ width: 24, height: 24 }} />),
                tabBarLabelStyle: { fontSize: 13, fontWeight: '700' }
            }} />
            <Tab.Screen name="Plans" component={ScreensPlans} options={{
                tabBarIcon: ({ focused }) => (focused ? <Image source={require('../assets/blue_heart.png')} style={{ width: 24, height: 21 }} /> : <Image source={require('../assets/heart.png')} style={{ width: 24, height: 21 }} />),
                tabBarLabel: 'Kế hoạch',
                tabBarLabelStyle: { fontSize: 13, fontWeight: '700' }
            }} />
            <Tab.Screen name="Cá nhân" component={ScreensAccount} options={{
                tabBarIcon: ({ focused }) => (focused ? <Image source={require('../assets/blue_profile.png')} style={{ width: 19, height: 23 }} /> : <Image source={require('../assets/profile.png')} style={{ width: 19, height: 23 }} />),
                tabBarLabelStyle: { fontSize: 13, fontWeight: '700' }
            }} />
        </Tab.Navigator>
    )
}
