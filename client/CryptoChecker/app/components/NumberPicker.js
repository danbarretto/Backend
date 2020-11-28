import React, { useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Menu} from 'react-native-paper';

const NumberPicker = ({ number, setNumber, values, label, style}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(
      values.map((val) => (
        <Menu.Item
          key={val}
          title={val}
          onPress={() => {
            setNumber(val);
            setMenuVisible(false)
          }}
        />
      )),
    );
  }, []);

  return (
    <Menu
      visible={menuVisible}
      onDismiss={()=>setMenuVisible(false)}
      anchor={
        <Button
          style={{...styles.picker, ...style}}
          mode={'outlined'}
          onPress={() => setMenuVisible(true)}
          label={label}>
          {number}
        </Button>
      }>
      {items}
    </Menu>
  );
};

const styles = StyleSheet.create({
  picker: {
    //marginTop: 15,
    marginBottom: 15,
    height:40
  },
});

export default NumberPicker;
