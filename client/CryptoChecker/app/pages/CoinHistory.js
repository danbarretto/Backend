import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {ActivityIndicator, Button, Text, Title} from 'react-native-paper';
import {LineChart} from 'react-native-chart-kit';
import SInfo from 'react-native-sensitive-info';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import NumberPicker from '../components/NumberPicker';
import { getToken } from '../config/getToken';
const {width} = Dimensions.get('window')

const CoinHistory = ({coinName, setCoinName}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [number, setNumber] = useState(10);

  const fetchData = async () => {
    setLoading(true);
    const token = await getToken()
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `https://us-central1-flukebackend.cloudfunctions.net/app/api/historicalData?coinName=${coinName}&time=${number}`;
    axios
      .get(url, config)
      .then((res) => {
        //console.log(res.data)
        const labels = res.data.historic.map((el) => el.time);
        const data = res.data.historic.map((el) => el.price.toFixed(2));
        setData(data);
        setLabels(labels);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{padding: 15}}>
      <Title>
        Histórico de {coinName} em {number} dias
      </Title>

      {!loading && (
        <ScrollView horizontal={true}>
          <LineChart
            data={{
              labels: labels,
              datasets: [{data}],
            }}
            width={1000 * (number / 10)} // from react-native
            height={430}
            yAxisLabel="R$"
            verticalLabelRotation={50}
            ver={45}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#2c2443',
              backgroundGradientTo: '#0c3c4c',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              paddingRight: 14,

              style: {
                borderRadius: 16,
                paddingLeft: 100,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
              alignSelf: 'flex-start',
            }}
          />
        </ScrollView>
      )}
      <ActivityIndicator animating={loading} size="large" />
      <View style={styles.frame}>
        <NumberPicker
          closeMenu={() => setMenuVisible(false)}
          values={[10, 20, 30]}
          style={styles.picker}
          label="Número de dias"
          number={number}
          setNumber={setNumber}
        />
        <Button
          mode="contained"
          style={styles.picker}
          onPress={() => fetchData()}>
          Carregar
        </Button>
        <Button
          mode="outlined"
          style={styles.picker}
          onPress={() => setCoinName('')}>
          Voltar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: width/3,
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  frame: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: width,
  },
});

export default CoinHistory;
