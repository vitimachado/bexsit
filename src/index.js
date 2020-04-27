import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/reducers';
import 'bootstrap/dist/css/bootstrap.css';
import { axiosConfig } from './ConfigureAxiosHandler';

export const store = createStore(rootReducer);
axiosConfig();

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));