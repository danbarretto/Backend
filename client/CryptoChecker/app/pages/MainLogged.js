import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Appbar} from 'react-native-paper';
import AppBarMenu from '../components/AppBarMenu';
import BottomBar from '../components/BottomBar'
import CoinHistory from './CoinHistory';


const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const MainLogged = ({}) => {
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
      <BottomBar />
    </>
  );
};

export default MainLogged;
