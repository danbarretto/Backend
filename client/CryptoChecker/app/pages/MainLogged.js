import 'react-native-gesture-handler';
import React from 'react';
import {Text} from 'react-native';
import {Button} from 'react-native-paper';
import AuthContext from '../components/AuthContext';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import YourCoins from './YourCoins';
const Tab = createBottomTabNavigator();

const MainLogged = ({navigation}) => {
  return (
      <Tab.Navigator>
        <Tab.Screen name='Home' component={YourCoins}/>
      </Tab.Navigator>
  );
};

export default MainLogged;
