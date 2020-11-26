import React from 'react';
import {View} from 'react-native';
import {Searchbar} from 'react-native-paper';

const AppBarSearch = ({visible, closeMenu, anchorButton}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
      <Searchbar
        placeholder="Pesquisar Moedas"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
  );
};

export default AppBarSearch;
