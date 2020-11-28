import React, { useState } from 'react'
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import AppBarMenu from './AppBarMenu';
import SearchToolBar from './SearchToolbar';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';


const TopBar = ({searchVisible, setSearchVisible, setSearch, setCoinHistory}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const closeMenu = () => setMenuVisible(false);

  return (
    <View>
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
    </View>
  );
};

export default TopBar