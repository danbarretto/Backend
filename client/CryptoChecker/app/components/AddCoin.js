import axios from 'axios';
import React, {useState} from 'react';
import {TextInput, Dialog, Button} from 'react-native-paper';
import SInfo from 'react-native-sensitive-info';
const AddCoin = ({visibleInit, hideDialog, refreshData}) => {
  const [code, setCode] = useState('');
  const [qtd, setQtd] = useState('');

  const sendData = async () => {
    if (code === '' || qtd === '') {
      alert('Preencha todos os campos!')
      return;
    }
    const token = await SInfo.getItem('token', {});
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
        console.log(err);
      });
  };

  return (
    <Dialog visible={visibleInit} onDismiss={hideDialog}>
      <Dialog.Title>Adicionar Moeda</Dialog.Title>
      <Dialog.Content>
        <TextInput
          label="Código"
          onChangeText={(text) => setCode(text)}></TextInput>
        <TextInput
          keyboardType="numeric"
          label="Quantidade"
          style={{marginTop:10}}
          onChangeText={(text) => setQtd(text)}></TextInput>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={hideDialog}>Cancelar</Button>
        <Button onPress={() => sendData()}>OK</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default AddCoin;
