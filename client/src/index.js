import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#474785'
    },
    neutral: {
      main: '#333',
      contrastText: '#fff'
    },
    secondary: {
      main: '#47855c'
    }
  },
  typography: {
    fontFamily: ['Fira Sans', 'sans-serif'].join(',')
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
