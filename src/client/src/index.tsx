import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { rootStore } from './core/store/store';
let baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
baseUrl = baseUrl == null ? '' : baseUrl

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={rootStore}>
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>,
  document.querySelector('#root'),
);
