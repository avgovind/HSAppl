/**
 * Created by govind on 7/16/16.
 */

import React from 'react';
import { Provider } from 'react-redux';
import routes from './config/routes';

import ReactDOM from 'react-dom';
import configureStore from './store'

const store = configureStore({});

// ReactDOM.render(routes, document.getElementById('app'));

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app')
);