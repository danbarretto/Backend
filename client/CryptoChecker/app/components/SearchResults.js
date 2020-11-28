import React, {useEffect, useState} from 'react';
import {ActivityIndicator, DataTable} from 'react-native-paper';
import axios from 'axios';
import SInfo from 'react-native-sensitive-info';
import { getToken } from '../config/getToken';

const SearchResults = ({search, setCoinHistory}) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const url = `https://us-central1-flukebackend.cloudfunctions.net/app/api/searchCurrency?coinName=${search}`;
    const token = await getToken()
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(url, config)
      .then((res) => {
        const currencyInfo = res.data;
        const row = [
          <DataTable.Row key={currencyInfo.currency} onPress={()=>setCoinHistory(currencyInfo.currency)}>
            <DataTable.Cell>{currencyInfo.currency}</DataTable.Cell>
            <DataTable.Cell>{currencyInfo.price.toFixed(2)}</DataTable.Cell>
            <DataTable.Cell>{currencyInfo.median.toFixed(2)}</DataTable.Cell>
            <DataTable.Cell>
              {currencyInfo.bestPriceToday.toFixed(2)}
            </DataTable.Cell>
          </DataTable.Row>,
        ];
        setRows(row);
      })
      .catch((err) => {
        alert('Moeda não encontrada!');
      });
    setLoading(false);
  };

  useEffect(() => {
    if (search !== '') fetchData();
  }, [search]);

  return (
    <>
      {!loading && search !== '' && (
        <DataTable>
          <DataTable.Header >
            <DataTable.Title>Moeda</DataTable.Title>
            <DataTable.Title>Valor (R$)</DataTable.Title>
            <DataTable.Title style={{flexDirection:'row'}} numberOfLines={2}>
              Mediana
            </DataTable.Title>
            <DataTable.Title  numberOfLines={2}>
              Maior Preço 24h
            </DataTable.Title>
          </DataTable.Header>
          {rows}
        </DataTable>
      )}
      {search !== '' && <ActivityIndicator animating={loading} size="large" />}
    </>
  );
};

export default SearchResults;
