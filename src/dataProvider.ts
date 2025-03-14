import simpleRestProvider from 'ra-data-simple-rest';
import { DataProvider } from 'react-admin';

const API_URL = 'http://localhost:8080';

const dataProvider: DataProvider = simpleRestProvider(API_URL);

export default dataProvider;
