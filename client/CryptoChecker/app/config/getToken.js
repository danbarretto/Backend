import SInfo from 'react-native-sensitive-info';
import {app} from './firebase';

/**
 * Refreshes the user's token and save it on Safe Store 
 * @param {firebase.User} user User to get new token 
 * @returns User's token
 */
export const forceRefresh = async (user = app.auth().currentUser) => {
  const token = await user.getIdToken(true);
  const promisses = [
    SInfo.setItem('token', token, {}),
    SInfo.setItem('tokenTime', Date.now().toString(), {}),
  ];
  await Promise.all(promisses);
  return token;
};

/**
 * Gets or refreshes user's token
 * @returns user's token
 */
export const getToken = async () => {
  const tokenTime = await SInfo.getItem('tokenTime', {});
  if (tokenTime === undefined || tokenTime === null) {
      return await forceRefresh()
  }
  const tokenDate = new Date(tokenTime);
  const currDate = Math.abs(((Date.now() - tokenDate) / 60000)); // diff in miliseconds
  //token expired
  if (currDate >= 60) {
      return await forceRefresh()
  }
  return await SInfo.getItem('token', {});
};
