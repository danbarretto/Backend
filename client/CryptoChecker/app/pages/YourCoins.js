import React, {useEffect, useState, useContext} from 'react';
import {Button, DataTable, ActivityIndicator} from 'react-native-paper';
import axios from 'axios';
import {StyleSheet, View} from 'react-native';
import AuthContext from '../components/AuthContext';
import SInfo from 'react-native-sensitive-info';

const YourCoins = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  let config;
  const {showErrorModal, signOut} = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      const token = await SInfo.getItem('token', {});
      config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .get(
          'http://192.168.15.16:5000/flukebackend/us-central1/app/user/getCurrencies',
          config,
        )
        .then(async (result) => {
          const coins = result.data.currencies.map((curr) => curr.Name);
          const prices = await axios.post(
            'http://192.168.15.16:5000/flukebackend/us-central1/app/api/getPrices',
            {names: coins},
            config,
          );
          let currencies = result.data.currencies;
          currencies = currencies.map((curr) => ({
            ...curr,
            price: prices.data[curr.Name].BRL,
          }));
          const newRows = currencies.map((currency) => {
            return (
              <DataTable.Row key={currency.Name}>
                <DataTable.Cell centered>{currency.FullName}</DataTable.Cell>
                <DataTable.Cell centered>{currency.Name}</DataTable.Cell>
                <DataTable.Cell centered>{currency.price}</DataTable.Cell>
                <DataTable.Cell centered>{currency.Quantidade}</DataTable.Cell>
                <DataTable.Cell centered>
                  {currency.Quantidade * currency.price}
                </DataTable.Cell>
              </DataTable.Row>
            );
          });
          setRows(newRows);
          setLoading(false)
        })
        .catch((err) => {
          showErrorModal(err.message);
        });
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <DataTable style={styles.table}>
        <DataTable.Header>
          <DataTable.Title>Moeda</DataTable.Title>
          <DataTable.Title>Código</DataTable.Title>
          <DataTable.Title>Valor Un.(R$)</DataTable.Title>
          <DataTable.Title numeric>Quantidade</DataTable.Title>
          <DataTable.Title>Total</DataTable.Title>
        </DataTable.Header>
        {rows}
      </DataTable>
      <ActivityIndicator animating={loading} size={'large'}/>
      <Button onPress={() => signOut()}>aaaa</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //padding: 30,
  },
  table: {
    //width: '100%',
  },
});

export default YourCoins;
