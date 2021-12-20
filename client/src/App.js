import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';

import Home from './Home';
import User from './User';
import Posts from './Posts';

function App() {
  return (
    <>
      <Router>
        <AppBar component='nav' position='static'>
          <Toolbar component='ul'>
            <Typography variant='li' component='p' sx={{ flexGrow: 1 }}>
              <Link to='/'>Home</Link>
            </Typography>
            <Typography variant='body2' component='li'>
              <Link to='/posts'>Posts</Link>
            </Typography>
            <Typography variant='body2' component='li'>
              <Link to='/user'>Profile</Link>
            </Typography>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/user' component={User} />
          <Route exact path='/posts' component={Posts} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
