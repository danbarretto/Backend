import React, {useState} from 'react';
import {BottomNavigation} from 'react-native-paper';
import CoinHistory from '../pages/CoinHistory';
import TopCurrencies from '../pages/TopCurrencies';
import YourCoins from '../pages/YourCoins';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const BottomBar = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const [coinName, setCoinName] = useState('');
  const [history, setHistory] = useState(false);
  const [routes] = useState([
    {key: 'your', title: 'Suas Moedas', icon: 'bitcoin'},
    {key: 'top', title: 'Top Moedas', icon: 'podium'},
    //{key: 'history', title: 'Histórico', icon: 'chart-line'},
  ]);

  const openHistory = (coin) => {
    setCoinName(coin);
    setHistory(true);
  };

  const TopRankRoute = () => (
    coinName === '' ? <TopCurrencies setCoinName={setCoinName}/> : <CoinHistory setCoinName={setCoinName} coinName={coinName}/>
  );
  const YourCoinsRoute = () =>
    coinName === '' ? (
      <YourCoins setCoinName={setCoinName} />
    ) : (
      <CoinHistory setCoinName={setCoinName} coinName={coinName} />
    );
  //const TopRankRoute = () => <TopCurrencies />;

  const renderScene = BottomNavigation.SceneMap({
    top: TopRankRoute,
    your: YourCoinsRoute,
    //history:HistoryRoute
  });

  return (
    <>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
};

export default BottomBar;
