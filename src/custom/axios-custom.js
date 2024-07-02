import axios from 'axios';

const customAxios = axios.create({
    baseURL: process.env.VUE_APP_URL + '/app/apiWtaOnline/',
});

export default customAxios;