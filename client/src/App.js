import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';

import Home from './Home';
import User from './User';
import Posts from './Posts';

function App() {
  return (
    <>
      <Router>
        <AppBar component='nav' position='static'>
          <Toolbar>
            <Typography variant='h7' component='p' sx={{ flexGrow: 1 }}>
              <Link to='/'>Home</Link>
            </Typography>
            <Typography variant='body1' component='p' sx={{ mr: 2 }}>
              <Link to='/posts'>Posts</Link>
            </Typography>
            <Typography variant='body1' component='p'>
              <Link to='/users'>Users</Link>
            </Typography>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/users' component={User} />
          <Route exact path='/posts' component={Posts} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
