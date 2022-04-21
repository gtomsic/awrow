import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: 'http://192.168.68.54:8000',
});
