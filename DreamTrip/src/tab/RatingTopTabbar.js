import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScreensNotRated, ScreensRated } from '../subScreens'

const Tab = createMaterialTopTabNavigator();

export default function PRatingTopTabbar() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: { backgroundColor: '#f5f5f5', width: '70%', elevation: 0 },
            tabBarLabelStyle: { fontSize: 14, fontWeight: '700' },
        }} >
            <Tab.Screen name="Chưa đánh giá" component={ScreensNotRated} />
            <Tab.Screen name="Đã đánh giá" component={ScreensRated} />
        </Tab.Navigator>
    );
}