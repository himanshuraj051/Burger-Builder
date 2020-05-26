import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-31c51.firebaseio.com/'
});

export default instance;