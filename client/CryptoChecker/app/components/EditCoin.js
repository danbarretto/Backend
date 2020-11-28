import axios from 'axios';
import React, {useState} from 'react';
import {Col, Grid} from 'react-native-easy-grid';
import {TextInput, Dialog, Button} from 'react-native-paper';
import SInfo from 'react-native-sensitive-info';
import {getToken} from '../config/getToken';

const EditCoin = ({visibleInit, hideDialog, refreshData, code}) => {
  const [qtd, setQtd] = useState('');

  const editCoin = async () => {
    if (qtd === '') {
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
        'https://us-central1-flukebackend.cloudfunctions.net/app/user/editCurrency',
        {currency: code, qtd},
        config,
      )
      .then((res) => {
        if (res.data.message === undefined) {
          alert('Moeda editada com sucesso!');
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

  const deleteCoin = async () => {
    const token = await getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        'https://us-central1-flukebackend.cloudfunctions.net/app/user/deleteCurrency',
        {currency: code},
        config,
      )
      .then((res) => {
        if (res.data.message === undefined) {
          alert('Moeda removida com sucesso!');
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
      <Dialog.Title>Editar ou Remover Moeda</Dialog.Title>
      <Dialog.Content>
        <TextInput
          keyboardType="numeric"
          label="Quantidade"
          style={{marginTop: 10}}
          onChangeText={(text) => setQtd(text)}></TextInput>
      </Dialog.Content>
      <Dialog.Actions>
        <Grid>
          <Col>
            <Button mode="outlined" onPress={() => deleteCoin()}>
              Remover
            </Button>
          </Col>
          <Col>
            <Button mode="contained" onPress={() => editCoin()}>
              OK
            </Button>
          </Col>
        </Grid>
      </Dialog.Actions>
    </Dialog>
  );
};

export default EditCoin;
