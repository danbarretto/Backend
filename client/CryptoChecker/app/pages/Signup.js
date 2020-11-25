import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Text, View, StyleSheet, ToastAndroid} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {app} from '../config/firebase';
import axios from 'axios';
import AuthContext from '../components/AuthContext';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const {signUp, showErrorModal} = React.useContext(AuthContext);
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
          label="Usuário"
          onChangeText={(text) => {
            setUser(text);
          }}
        />
        <TextInput
          label="Senha"
          secureTextEntry={true}
          passwordRules={
            'required: upper; required: lower; required: digit; minlength: 8;'
          }
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <Button
          mode="contained"
          onPress={() => {
            if (email === '' || password === '' || user === '')
              showErrorModal('Preencha todos os campos!');
            else signUp(email, password, user);
          }}>
          SignUp
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

export default SignUp;
