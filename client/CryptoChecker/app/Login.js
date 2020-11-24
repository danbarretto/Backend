import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Alert, ToastAndroid} from 'react-native';
import {Appbar, Button, TextInput} from 'react-native-paper';
import {app} from './config/firebase';

const Login = ({firebase}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <View style={styles.form}>
        <TextInput
          label="Email"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          label="Senha"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <Button
          mode="contained"
          onPress={() => {
            app.auth().signInWithEmailAndPassword(email, password).then(user=>{
              ToastAndroid.show(user.user.uid, ToastAndroid.SHORT)
            }).catch(err=>{
              ToastAndroid.show(err.message, ToastAndroid.SHORT);
            })
          }}>
          Login
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: '#C6C6C6',
    borderWidth: 2,
    marginTop: 3,
    marginBottom: 10,
  },
  form: {
    width: '100%',
  },
});

export default Login;
