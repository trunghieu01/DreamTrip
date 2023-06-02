import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreensAccount, ScreensViewProfile, ScreensEditProfile, ScreensRating } from '../screens/index';

const Stack = createStackNavigator();

export default function Profile() {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}} backBehavior="history">
        <Stack.Screen name="Account" component={ScreensAccount} />
        <Stack.Screen name="ViewProfile" component={ScreensViewProfile} />
        <Stack.Screen name="EditProfile" component={ScreensEditProfile} />
        <Stack.Screen name="Rating" component={ScreensRating} />
      </Stack.Navigator>
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
