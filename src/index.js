import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {store} from "./redux/store";
import { Provider } from 'react-redux'

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
      <Provider store={store}>
    <App />
      </Provider>
  </BrowserRouter>,
);
