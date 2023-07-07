import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store ,persistor} from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ChakraProvider } from "@chakra-ui/react";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </PersistGate>
    </Provider>

  </React.StrictMode>
);


