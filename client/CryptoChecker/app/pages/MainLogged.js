import 'react-native-gesture-handler';
import React, {useState} from 'react';
import BottomBar from '../components/BottomBar';
import CoinHistory from './CoinHistory';
import SearchResults from '../components/SearchResults';
import TopBar from '../components/TopBar';


const MainLogged = ({}) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [coinHistory, setCoinHistory] = useState('');

  return (
    <>
      <TopBar
        setCoinHistory={setCoinHistory}
        searchVisible={searchVisible}
        setSearch={setSearch}
        setSearchVisible={setSearchVisible}
      />
      {searchVisible ? (
        coinHistory === '' ? (
          <SearchResults search={search} setCoinHistory={setCoinHistory} />
        ) : (
          <CoinHistory coinName={coinHistory} setCoinName={setCoinHistory} />
        )
      ) : (
        <BottomBar />
      )}
    </>
  );
};

export default MainLogged;
