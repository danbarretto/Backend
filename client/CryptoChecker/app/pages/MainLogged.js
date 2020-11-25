import 'react-native-gesture-handler';
import React from 'react';
import {Text} from 'react-native';
import {Button} from 'react-native-paper';
import AuthContext from '../components/AuthContext';

const MainLogged = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext)
  return (
    <>
      <Button onPress={()=>{signOut()}}>Pls work</Button>
      <Text>Ayyyyy</Text>
    </>
  );
};

export default MainLogged