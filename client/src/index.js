import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      light: '#bdbddb',
      main: '#9c9cc9',
      dark: '#474785',
      contrastText: '#fff'
    },
    neutral: {
      main: '#333',
      contrastText: '#fff'
    },
    secondary: {
      light: '#bddbc7',
      main: '#47855c',
      dark: '#122117',
      contrastText: '#fff'
    },
    danger: {
      dark: red[900],
      main: red[600],
      ligth: red[200],
      contrastText: '#ffffff'
    }
  },
  typography: {
    fontFamily: ['Fira Sans', 'sans-serif'].join(','),
    h5: {
      fontSize: '1.5rem',
      marginBottom: '2rem',
      component: 'h3'
    }
  },
  textField: {
    left: {
      variant: 'filled',
      style: { width: '99%' }
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
