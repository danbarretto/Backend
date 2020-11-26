import React, {useContext} from 'react';
import {Menu} from 'react-native-paper';
import AuthContext from './AuthContext';

const AppBarMenu = ({visible, closeMenu, anchorButton}) => {
  const {signOut} = useContext(AuthContext);
  return (
    <Menu visible={visible} onDismiss={closeMenu} anchor={anchorButton}>
      <Menu.Item
        title="Logout"
        onPress={() => {
          signOut();
          closeMenu()
        }}
      />
    </Menu>
  );
};

export default AppBarMenu;
