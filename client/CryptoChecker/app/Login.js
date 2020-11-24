import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Appbar, Button, TextInput} from 'react-native-paper';
import App from './App';

const Login = (props) => {
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
        <Button mode='contained'>Login</Button>
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
