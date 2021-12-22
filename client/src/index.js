import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    text: {
      primary: 'primary.dark'
    },
    background: {
      primary: 'primary.dark'
    },
    primary: {
      light: '#bdbddb',
      main: '#9c9cc9',
      dark: '#474785'
    },
    neutral: {
      main: '#333',
      contrastText: '#fff'
    },
    secondary: {
      light: '#bddbc7',
      main: '#47855c',
      dark: '#122117'
    }
  },
  typography: {
    fontFamily: ['Fira Sans', 'sans-serif'].join(','),
    title: {
      fontSize: '1.7rem'
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
