import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { amber, cyan, red, teal } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: amber[50]
    },
    secondary: {
      main: teal[100]
    }
  },
  typography: {
    fontFamily: ['PT Sans', 'sans-serif'].join(','),
    h1: {
      fontFamily: ['Parisienne', 'Fira Sans', 'sans-serif'].join(',')
    },
    h6: {
      fontFamily: ['Montserrat', 'Fira Sans', 'sans-serif'].join(',')
    }
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
