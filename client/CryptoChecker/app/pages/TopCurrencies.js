import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  DataTable,
  Text,
  TextInput,
} from 'react-native-paper';
import axios from 'axios';
import SInfo from 'react-native-sensitive-info';
import {Dimensions, StyleSheet, View} from 'react-native';
import NumberPicker from '../components/NumberPicker';
const {width} = Dimensions.get('window');
import {Col, Grid, Row} from 'react-native-easy-grid';
import {ScrollView} from 'react-native-gesture-handler';

const TopCurrencies = ({setCoinName}) => {
  const [number, setNumber] = useState(10);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);


  const fetchData = async () => {
    setLoading(true);
    const token = await SInfo.getItem('token', {});
    const config = {
      headers: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    };
    axios
      .get(
        `http://192.168.15.16:5000/flukebackend/us-central1/app/api/topList?&number=${number}`,
        config,
      )
      .then((res) => {
        let rank = 0;
        const newRows = res.data.topList.map((curr) => {
          return (
            <DataTable.Row key={curr.name} onPress={()=>{
              setCoinName(curr.name)
            }}>
              <DataTable.Cell>{++rank}</DataTable.Cell>
              <DataTable.Cell>{curr.fullName}</DataTable.Cell>
              <DataTable.Cell>{curr.name}</DataTable.Cell>
              <DataTable.Cell>{curr.price}</DataTable.Cell>
            </DataTable.Row>
          );
        });
        setRows(newRows);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Rank</DataTable.Title>
          <DataTable.Title>Moeda</DataTable.Title>
          <DataTable.Title>Código</DataTable.Title>
          <DataTable.Title>Valor</DataTable.Title>
        </DataTable.Header>
        {!loading && rows}
      </DataTable>
      <ActivityIndicator animating={loading} size={'large'} />
      <Text style={{paddingLeft: 15}}>Tamanho do Rank</Text>
      {!visible && <Grid style={{padding: 15}}>
        <Col>
          <NumberPicker
            closeMenu={() => setMenuVisible(false)}
            values={[10, 20, 30]}
            label="Tamanho do Rank"
            number={number}
            setNumber={setNumber}
          />
        </Col>
        <Col>
          <Button
            mode="contained"
            style={styles.picker}
            onPress={() => fetchData()}>
            Carregar
          </Button>
        </Col>
      </Grid>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  picker: {
    //marginTop: 15,
    marginBottom: 15,
  },
});

export default TopCurrencies;
