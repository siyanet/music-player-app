import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto-mono';
import '@fontsource/roboto-slab';
import '@fontsource/lora';
import { ThemeProvider } from '@emotion/react';
import lightTheme from './Themes/lightTheme';
import { rootReducer } from './Reducers/RootReducer';
import rootSaga from './Sagas/RootSaga';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'


const sagaMiddleWare = createSagaMiddleware();
const store = configureStore({reducer: rootReducer,
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleWare ),});


sagaMiddleWare.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
    <ThemeProvider theme = {lightTheme}>
    <App />
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
