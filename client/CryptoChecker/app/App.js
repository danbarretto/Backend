/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Login from './Login';
import Main from './components/Main';
import {
  Appbar,
  Provider as PaperProvider,
  DefaultTheme,
  Button,
} from 'react-native-paper';
import SignUp from './Signup';

const App = () => {
  const [backAction, setBackAction] = useState(null);
  const [isChild, setIsChild] = useState(false);
  const main = (
    <Main
      showSignUp={() => {
        setRendered(<SignUp />);
        setBackAction(
          <Appbar.BackAction
            onPress={() => {
              setRendered(main);
              setBackAction(null)
            }}
          />,
        );
      }}
    />
  );

  const [rendered, setRendered] = useState(main);

  return (
    <>
      <PaperProvider theme={theme}>
        <Appbar.Header>
          {backAction}
          <Appbar.Content title="Crypto Checker" />
        </Appbar.Header>
        <View style={styles.container}>{rendered}</View>
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    borderWidth: 3,
    borderColor: 'red',
    margin: 20,
  },
  main: {
    width: '100%',
  },
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0c3c4c',
    accent: '#7a7985',
  },
};
export default App;
