import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Appbar, Text} from 'react-native-paper';
import AppBarMenu from '../components/AppBarMenu';
import BottomBar from '../components/BottomBar';
import CoinHistory from './CoinHistory';
import SearchToolBar from '../components/SearchToolbar';
import SearchResults from '../components/SearchResults';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const MainLogged = ({}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [coinHistory, setCoinHistory] = useState('');

  const closeMenu = () => setMenuVisible(false);
  return (
    <>
      <Appbar.Header>
        <SearchToolBar
          visible={searchVisible}
          setVisible={setSearchVisible}
          setSearch={setSearch}
          setCoinHistory={setCoinHistory}
        />
        <Appbar.Content title="Crypto Checker" />
        <Appbar.Action
          icon="magnify"
          onPress={() => {
            setSearchVisible(true);
          }}
        />
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
      {searchVisible ? (
        coinHistory === '' ? (
          <SearchResults search={search} setCoinHistory={setCoinHistory} />
        ) : (
          <CoinHistory coinName={coinHistory} setCoinName={setCoinHistory}/>
        )
      ) : (
        <BottomBar />
      )}
    </>
  );
};

export default MainLogged;
