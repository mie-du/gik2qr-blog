import './App.css';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import Posts from './views/Posts';
import Users from './views/Users';

function App() {
  return (
    <div className='App'>
      <h1>Blogg</h1>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/posts/' component={Posts} />
          <Route exact path='/users/' component={Users} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
