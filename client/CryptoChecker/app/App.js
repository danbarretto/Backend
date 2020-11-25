import 'react-native-gesture-handler';
import React, {useEffect, useMemo, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import {StyleSheet, ToastAndroid} from 'react-native';
import {
  Provider as PaperProvider,
  DefaultTheme,
  Appbar,
  Modal,
  Text
} from 'react-native-paper';
import AuthContext from './components/AuthContext';
import {createStackNavigator} from '@react-navigation/stack';
import MainLogged from './pages/MainLogged';
import Main from './pages/Main';
import SignUp from './pages/Signup';
import {app} from './config/firebase';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
const Stack = createStackNavigator();

export default App = ({}) => {
  const [visible, setVisible] = useState(false);
  const hideModal = () => setVisible(false);
  const [errorMessage, setErrorMessage] = useState('');
  const showModal = (message) => {
    setErrorMessage(message)
    setVisible(true);
  };

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
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        dispatch({type: 'SIGN_OUT'});
      }
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (email, password) => {
        app
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(async (userRecord) => {
            const token = await userRecord.user.getIdToken(true);
            SecureStore.setItemAsync('userToken', token)
              .then(() => {
                dispatch({type: 'SIGN_IN', token: token});
              })
              .catch((err) => {
                ToastAndroid.show(err.message, ToastAndroid.LONG);
                showModal('Erro ao fazer login!')
                dispatch({type: 'SIGN_OUT'});
              });
          })
          .catch((err) => {
            showModal('Erro ao fazer login!');
            dispatch({type: 'SIGN_OUT'});
          });
      },
      signOut: () => {
        app.auth().signOut();
        SecureStore.deleteItemAsync('userToken')
          .then(() => {
            dispatch({type: 'SIGN_OUT'});
          })
          .catch((err) => {
            showModal('Erro ao realizar logout!');
          });
      },
      signUp: async (email, password, user) => {
        app
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(async (userRecord) => {
            const token = await userRecord.user.getIdToken();
            axios
              .post(
                'http://192.168.15.16:5000/flukebackend/us-central1/app/user/addUserToDb',
                {uid: userRecord.user.uid, userName: user},
              )
              .then((result) => {
                console.log(result);
                showModal(result.data.message)
                dispatch({type: 'SIGN_IN', token: token});
              })
              .catch((err) => {
                showModal("Erro ao guardar informações no banco de dados!")
              });
          })
          .catch((err) => {
            showModal('Erro ao registrar novo usuário! '+ err.message)
          });
      },
      showErrorModal: (message)=>{
        setErrorMessage(message);
        setVisible(true);
      }
    }),
    [],
  );
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
          <Stack.Navigator>
            {state.userToken == null ? (
              <>
                <Stack.Screen
                  name="Crypto Checker"
                  component={Main}
                />
                <Stack.Screen
                  name="SignUp"
                  component={SignUp}
                />
              </>
            ) : (
              <Stack.Screen name="Home" component={MainLogged} />
            )}
          </Stack.Navigator>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <Text>{errorMessage}</Text>
          </Modal>
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
