import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { deepPurple, blueGrey, lime, pink } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

/* Theme for MUI is created as below. The <ThemeProvider> should then be added with this object in the ReactDOM.render-fuction */
const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[300]
    },
    secondary: {
      main: blueGrey[200]
    }
  },
  typography: {
    fontFamily: ['PT Sans', 'sans-serif'].join(','),
    h1: {
      fontFamily: ['Parisienne', 'Fira Sans', 'sans-serif'].join(','),
      color: blueGrey['A700'],
      fontSize: '9rem'
    },
    h3: {
      color: deepPurple[500]
    },
    h5: {
      fontFamily: ['Montserrat', 'Fira Sans', 'sans-serif'].join(','),
      color: pink[900]
    },
    h6: {
      fontFamily: ['Montserrat', 'Fira Sans', 'sans-serif'].join(','),
      color: deepPurple[800]
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
