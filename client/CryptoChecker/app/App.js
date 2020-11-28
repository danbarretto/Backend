import 'react-native-gesture-handler';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Provider as PaperProvider,
  DefaultTheme,
  Appbar,
  Modal,
  Text,
} from 'react-native-paper';
import AuthContext from './components/AuthContext';
import {createStackNavigator} from '@react-navigation/stack';
import MainLogged from './pages/MainLogged';
import Main from './pages/Main';
import SignUp from './pages/Signup';
import {app} from './config/firebase';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import SInfo from 'react-native-sensitive-info';
import { forceRefresh } from './config/getToken';

const Stack = createStackNavigator();

const useComponentWillMount = (func) => {
  const willMount = useRef(true);

  if (willMount.current) {
    console.log('working');
    func();
  }

  willMount.current = false;
};

export default App = ({}) => {
  const [visible, setVisible] = useState(false);
  const hideModal = () => setVisible(false);
  const [errorMessage, setErrorMessage] = useState('');
  const showModal = (message) => {
    setErrorMessage(message);
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

  const bootstrapAsync = async () => {
    let userToken;
    try {
      userToken = await SInfo.getItem('token', {});
      const config = {
        headers: {Authorization: `Bearer ${userToken}`},
      };
      //Checks token validation
      axios
        .get(
          'https://us-central1-flukebackend.cloudfunctions.net/app/user/',
          config,
        )
        .then((res) => {
          //token is valid
          dispatch({type: 'RESTORE_TOKEN', token: userToken});
        })
        .catch(async (e) => {
          //Renews token
          if (app.auth().currentUser !== null) {
            userToken = await forceRefresh();
            await SInfo.setItem('token', userToken, {});
            dispatch({type: 'RESTORE_TOKEN', token: userToken});
          } else {
            dispatch({type: 'SIGN_OUT'});
          }
        });
    } catch (e) {
      console.log(e.message);
      dispatch({type: 'SIGN_OUT'});
    }
  };

  useComponentWillMount(bootstrapAsync);

  const authContext = useMemo(
    () => ({
      signIn: async (email, password) => {
        app
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(async (userRecord) => {
            const token = await forceRefresh(userRecord.user);
            SInfo.setItem('token', token, {})
              .then(() => {
                dispatch({type: 'SIGN_IN', token: token});
              })
              .catch((err) => {
                showModal('Erro ao fazer login!');
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
        SInfo.deleteItem('token', {})
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
            const token = await forceRefresh(userRecord.user);;
            const config = {
              headers: {Authorization: `Bearer ${token}`},
            };

            axios
              .post(
                'https://us-central1-flukebackend.cloudfunctions.net/app/user/addUserToDb',
                {uid: userRecord.user.uid, userName: user},
                config,
              )
              .then((result) => {
                console.log(result);
                showModal(result.data.message);
                dispatch({type: 'SIGN_IN', token: token});
              })
              .catch((err) => {
                showModal('Erro ao guardar informações no banco de dados!');
              });
          })
          .catch((err) => {
            showModal('Erro ao registrar novo usuário! ' + err.message);
          });
      },
      showErrorModal: (message) => {
        setErrorMessage(message);
        setVisible(true);
      },
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
                <Stack.Screen name="Crypto Checker" component={Main} />
                <Stack.Screen name="Criar Conta" component={SignUp} />
              </>
            ) : (
              <Stack.Screen
                options={{headerShown: false}}
                name="Home"
                component={MainLogged}
              />
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
