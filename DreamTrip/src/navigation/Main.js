import { StyleSheet, Text, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MainTabbar } from '../tab';
import { ScreensTourDetail, ScreensBookedTour, ScreensSearch_Filter, ScreensGGMap, ScreensChangePassword, ScreensPlannedTour, ScreensTourActivity, ScreensPlayVideo, ScreensBookTour,ScreensViewProfile, ScreensEditProfile, ScreensRating, ScreensReviews } from '../screens/index';

const Stack = createStackNavigator();

export default function Main() {
  return (
    < NavigationContainer >
      <StatusBar backgroundColor={'#f9f9f9'} barStyle={'dark-content'} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabbar} />
        <Stack.Screen name="TourDetail" component={ScreensTourDetail} />
        <Stack.Screen name="Search_Filter" component={ScreensSearch_Filter} />
        <Stack.Screen name="GGMap" component={ScreensGGMap} />
        <Stack.Screen name="BookedTour" component={ScreensBookedTour} />
        <Stack.Screen name="PlannedTour" component={ScreensPlannedTour} />
        <Stack.Screen name="TourActivity" component={ScreensTourActivity} />
        <Stack.Screen name="PlayVideo" component={ScreensPlayVideo} />
        <Stack.Screen name="BookTour" component={ScreensBookTour} />
        <Stack.Screen name="ViewProfile" component={ScreensViewProfile} />
        <Stack.Screen name="EditProfile" component={ScreensEditProfile} />
        <Stack.Screen name="Rating" component={ScreensRating} />
        <Stack.Screen name="Reviews" component={ScreensReviews} />
        <Stack.Screen name="ChangePW" component={ScreensChangePassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
