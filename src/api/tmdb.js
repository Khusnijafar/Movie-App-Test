import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Accept: 'application/json',
  },
  params: {
    api_key: '9adc6e0823c3b3575ade52ee21e8a63a',
    query: '',
  },
});
