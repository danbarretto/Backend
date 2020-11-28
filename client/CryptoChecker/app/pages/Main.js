import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import Login from '../components/Login';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Main = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Icon size={256} name="bitcoin" color="#0c3c4c" />
      <Login />
      <Button
        onPress={() => {
          navigation.navigate('Criar Conta');
        }}
        style={styles.button}
        mode="contained">
        Registrar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
  backgroundVideo: {
    height: '100%',
    width: '100%',
  },
});

export default Main;
