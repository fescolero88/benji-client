import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import GlobalStyles from '@iso/assets/styles/globalStyle';
import {store, persistor} from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Routes from './router';
import AppProvider from './AppProvider';

const App = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AppProvider>
                <>
                  <ToastContainer />
                  <GlobalStyles/>
                  <Routes/>
                </>
            </AppProvider>
        </PersistGate>
    </Provider>
);

export default App;
