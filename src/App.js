import React from 'react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import './App.css';
import Checkout from './pages/Checkout';
import store from './store';
import './config/firebase';

const App = () => {
  return <Provider store={store}>
      <SnackbarProvider 
         anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        maxSnack={3}>
        <Checkout />
      </SnackbarProvider>
    </Provider>
};

export default App;
