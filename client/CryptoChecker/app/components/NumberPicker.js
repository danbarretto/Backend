import React, {useContext} from 'react';
import {Menu} from 'react-native-paper';

const NumberPicker = ({visible, closeMenu, anchorButton, setNumber}) => {
  return (
    <Menu visible={visible} onDismiss={closeMenu} anchor={anchorButton}>
      <Menu.Item
        title="10"
        onPress={() => {
          setNumber(10);
          closeMenu();
        }}
      />
      <Menu.Item
        title="20"
        onPress={() => {
          setNumber(20);
          closeMenu();
        }}
      />
      <Menu.Item
        title="30"
        onPress={() => {
          setNumber(30);
          closeMenu();
        }}
      />
    </Menu>
  );
};

export default NumberPicker;
