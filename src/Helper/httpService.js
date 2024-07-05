import axios from 'axios';

const httpService = axios.create({
	baseURL: process.env.REACT_APP_API_URL
});

export default httpService;
