import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper'

const Main = (props) => {
  const [rendered, setRendered] = useState(null)

  return (
    <View style={styles.container}>
      <Button onPress={props.showLogin} style={styles.button} mode="contained">
        Login
      </Button>
      <Button onPress={props.showSignin} style={styles.button} mode="contained">
        Registrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        width:'100%'
    },
    button:{
        marginBottom:10
    }
})

export default Main