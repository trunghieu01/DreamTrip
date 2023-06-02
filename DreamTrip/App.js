import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './src/redux/store';
import { NavigationMain, NavigationAccount, NavigationFirstLogin } from './src/navigation/index';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logIN } from './src/redux/actions/UserAction';

const AppScreen = () => {
  const isLogin = useSelector(state => state.user.user);
  // const isFirstLogin = useSelector(state => state.user.firstLogIn);
  const dispatch = useDispatch()
  const [userId, setUserId] = useState(null)
  const [firstLogin, setFirstLogin] = useState('true')
  console.log(isLogin)
  useEffect(() => {
    AsyncStorage.getItem('firstLogin').then((rs) => setFirstLogin(rs))
    AsyncStorage.getItem('userId').then((rs) => setUserId(rs))
    console.log('userApp:' + userId)
    console.log('first:' + firstLogin)
  }, [isLogin])

  dispatch(logIN(userId))

  return firstLogin == 'true' ? <NavigationFirstLogin /> : userId == null ? <NavigationAccount /> : <NavigationMain />
};

export default function App() {

  return (
    <Provider store={store}>
      <AppScreen />
    </Provider>
  );
}
