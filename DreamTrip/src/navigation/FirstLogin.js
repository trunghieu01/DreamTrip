import { StyleSheet } from 'react-native';
import { ScreensLogin, ScreensWelcome1, ScreensWelcome2, ScreensSignUp, ScreensForgotPassword, ScreensEnterOTP, ScreensCheck, ScreensSuccessfull, ScreensResetPassword } from '../screens/index'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

export default function Account() {
  return (
    < NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome1" component={ScreensWelcome1} />
        <Stack.Screen name="Welcome2" component={ScreensWelcome2} />
        <Stack.Screen name="Login" component={ScreensLogin} />
        <Stack.Screen name="SignUp" component={ScreensSignUp} />
        <Stack.Screen name="ForgotPassword" component={ScreensForgotPassword} />
        <Stack.Screen name="Check" component={ScreensCheck} />
        <Stack.Screen name="EnterOTP" component={ScreensEnterOTP} />
        <Stack.Screen name="ResetPassword" component={ScreensResetPassword} />
        <Stack.Screen name="Successfull" component={ScreensSuccessfull} />
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
