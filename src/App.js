import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import Checkout from './pages/Checkout';
import store from './store';

const App = () => {
  return <Provider store={store}>
      <Checkout />;
    </Provider>
};

export default App;
