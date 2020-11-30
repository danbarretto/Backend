# Processo seletivo Fluke

Esse repositório abriga os códigos utilizados para o processo seletivo da Fluke para a vaga de desenvolvedor Back-End

## Exercício Encontre o número sem par

Para executar este programa, utilize o seguinte comando:

`node arr.js`

## React-Native App Crypto Checker
### Executar Android
Para executar este programa em modo de debug android, utilize os seguintes comandos:

```
cd client/CryptoChecker &&
rm -rf $TMPDIR/react-* && rm -rf $TMPDIR/metro-* && rm -rf $TMPDIR/haste-* && watchman watch-del-all && rm -rf node_modules/ && npm install && npm start -- --reset-cache
```

Em seguida, em outro terminal execute:

```
react-native run android
```

### Build
Para compilar o app para android execute os seguintes comandos:
```
    cd cd client/CryptoChecker/android
    ./gradlew app:assembleRelease
```

Author: Daniel Sá Barretto Prado Garcia
