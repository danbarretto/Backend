import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
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
          label="Usuário"
          onChangeText={(text) => {
            setUser(text);
          }}
        />
        <TextInput
          label="Senha"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <Button mode="contained">SignUp</Button>
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
