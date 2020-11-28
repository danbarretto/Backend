import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import AuthContext from './AuthContext';

const Login = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn, showErrorModal} = useContext(AuthContext);
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
            if(email === '' || password === '') showErrorModal('Preencha todos os campos!')
            else signIn(email, password);
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
