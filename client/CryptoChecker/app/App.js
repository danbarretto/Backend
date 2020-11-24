import 'react-native-gesture-handler'
import React, {useEffect, useMemo} from 'react';
import * as SecureStore from 'expo-secure-store';
import {StyleSheet, ToastAndroid} from 'react-native';
import {
  Provider as PaperProvider,
  DefaultTheme,
  Appbar,
} from 'react-native-paper';
import AuthContext from './components/AuthContext';
import {createStackNavigator} from '@react-navigation/stack';
import MainLogged from './pages/MainLogged';
import Main from './pages/Main';
import SignUp from './pages/Signup';
import {app} from './config/firebase';
import {NavigationContainer} from '@react-navigation/native';
const Stack = createStackNavigator();

export default App = ({}) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );
  /*useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
        console.log(userToken)
      } catch (e) {
        dispatch({type:'SIGN_OUT'})
      }
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };
    bootstrapAsync();
  }, []);*/

  const authContext = useMemo(
    () => ({
      signIn: async (email, password) => {
        app
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(async (userRecord) => {
            const token = await userRecord.user.getIdToken(true);
            console.log(token)
            SecureStore.setItemAsync('userToken', token).then(()=>{
              dispatch({type: 'SIGN_IN', token: token});
            }).catch(err=>{
              ToastAndroid.show(err.message, ToastAndroid.LONG)
              dispatch({type:'SIGN_OUT'})
            })
          })
          .catch(() => {
            dispatch({type: 'SIGN_OUT'});
          });
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async () => {
        //firebase create user
        dispatch({type: 'SIGN_IN', token: 'dummy'});
      },
    }),
    [],
  );

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
          <Stack.Navigator>
            {state.userToken == null ? (
              <>
                <Stack.Screen name="Crypto Checker" component={Main} />
                <Stack.Screen name="SignUp" component={SignUp} />
              </>
            ) : (
              <Stack.Screen name="Home" component={MainLogged} />
            )}
          </Stack.Navigator>
        </AuthContext.Provider>
      </PaperProvider>
    </NavigationContainer>
  );
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0c3c4c',
    accent: '#7a7985',
  },
};
