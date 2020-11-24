import React, {useState} from 'react';
import {Text, View, StyleSheet, ToastAndroid} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {app} from '../config/firebase';
import axios from 'axios';
import AuthContext from '../components/AuthContext'

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const {signUp} = React.useContext(AuthContext)
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
        <Button
          mode="contained"
          onPress={() => {
            app
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then(async (userRecord) => {
                await axios
                  .post(
                    'http://localhost:5000/flukebackend/us-central1/app/user/addUserToDb',
                    {uid: userRecord.user.uid, userName: user},
                  )
                  .then((res) => {
                    ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
                  }).catch(err=>{
                    ToastAndroid.show(err.message, ToastAndroid.SHORT)
                  });
              });
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
