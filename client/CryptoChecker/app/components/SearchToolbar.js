import React, {useEffect, useState} from 'react';
import {Searchbar} from 'react-native-paper';

const SearchToolBar = ({visible, setVisible, setSearch, setCoinHistory}) => {
  const [text, setText] = useState('');

  useEffect(()=>{
    setSearch('')
  },[visible])

  return visible ? (
    <Searchbar
      onKeyPress={() => {}}
      style={{elevation: 0}}
      placeholder="Pesquisar"
      onChangeText={() => {}}
      icon="arrow-left"
      onIconPress={() => {
        setText('');
        setSearch('');
        setCoinHistory('')
        setVisible(false);
      }}
      onChangeText={(query) => {
        setText(query);
      }}
      onSubmitEditing={() => {
        if(text!=='')
          setSearch(text);
      }}
    />
  ) : null;
};

export default SearchToolBar;
