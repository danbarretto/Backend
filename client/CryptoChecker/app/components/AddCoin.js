import axios from 'axios';
import React, {useState} from 'react';
import {TextInput, Dialog, Button, ActivityIndicator} from 'react-native-paper';
import SInfo from 'react-native-sensitive-info';
import {getToken} from '../config/getToken';
const AddCoin = ({visibleInit, hideDialog, refreshData}) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [qtd, setQtd] = useState('');

  const sendData = async () => {
    setLoading(true);
    if (code === '' || qtd === '') {
      alert('Preencha todos os campos!');
      return;
    }
    const token = await getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        'https://us-central1-flukebackend.cloudfunctions.net/app/user/addCryptoCurrency',
        {currency: code, qtd},
        config,
      )
      .then((res) => {
        setLoading(false);
        if (res.data.message === undefined) {
          alert('Moeda cadastrada com sucesso!');
          refreshData();
          hideDialog();
        } else {
          console.log(res.data);
          alert(res.data.message);
          hideDialog();
        }
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  return (
    <Dialog visible={visibleInit} onDismiss={hideDialog}>
      <Dialog.Title>Adicionar Moeda</Dialog.Title>
      {loading && <ActivityIndicator animating={loading} size="large" />}
      {!loading && (
        <>
          <Dialog.Content>
            <TextInput
              label="Código"
              onChangeText={(text) => setCode(text)}></TextInput>
            <TextInput
              keyboardType="numeric"
              label="Quantidade"
              style={{marginTop: 10}}
              onChangeText={(text) => setQtd(text)}></TextInput>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancelar</Button>
            <Button onPress={() => sendData()}>OK</Button>
          </Dialog.Actions>
        </>
      )}
    </Dialog>
  );
};

export default AddCoin;
