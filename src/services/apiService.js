import axios from 'axios';
import {BASE_URL} from '../constants/apiUrl';

export const getCall = endpoint => {
  return axios.get(BASE_URL + endpoint);
};

export const postCall = (endpoint, data) => {
  return axios.post(BASE_URL + endpoint, data);
};

export const deleteCall = endpoint => {
  return axios.delete(BASE_URL + endpoint);
};

export const putCall = (endpoint, data) => {
  return axios.put(BASE_URL + endpoint, data);
};
