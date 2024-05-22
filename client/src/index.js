import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import reduxStore from './redux';
import { BrowserRouter } from 'react-router-dom';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
// import * as mdb from 'mdb-ui-kit'; // lib
// window.mdb = mdb;

const { store, persistor } = reduxStore()

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <Provider store={store} >
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId="964767878243-leueetuu4nqfp1tn5is8ai30qhvtq8g3.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
