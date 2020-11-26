import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Text} from 'react-native';
import {Appbar, Button, ThemeProvider} from 'react-native-paper';
import AuthContext from '../components/AuthContext';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import YourCoins from './YourCoins';
import AppBarMenu from '../components/AppBarMenu';
import TopCurrencies from './TopCurrencies';
const Tab = createBottomTabNavigator();

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const MainLogged = ({navigation}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const closeMenu = () => setMenuVisible(false);
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Crypto Checker" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <AppBarMenu
          visible={menuVisible}
          closeMenu={closeMenu}
          anchorButton={
            <Appbar.Action
              color={'#ffffff'}
              icon={MORE_ICON}
              onPress={() => {
                setMenuVisible(true);
              }}
            />
          }
        />
      </Appbar.Header>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={YourCoins} />
        <Tab.Screen name="Top Moedas" component={TopCurrencies} />
      </Tab.Navigator>
    </>
  );
};

export default MainLogged;
