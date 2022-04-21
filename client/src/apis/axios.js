import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: 'https://api.awrow.com',
});
