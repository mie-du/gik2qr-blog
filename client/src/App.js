import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

import Home from './ViewModels/Home';
import User from './ViewModels/User';
import Posts from './ViewModels/Posts';

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
            <Typography variant='body1' component='p' sx={{ mr: 2 }}>
              <Link to='/users'>Users</Link>
            </Typography>
            <Typography variant='body1' component='p'>
              <Link to='/users/1'>My profile</Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Container
          maxWidth='lg'
          sx={{
            mt: 5,
            py: 2
          }}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/users' component={User} />
            <Route path='/users/:id/:action' component={User} />
            <Route path='/users/:id' component={User} />
            <Route exact path='/users/new' component={User} />
            <Route exact path='/posts' component={Posts} />
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
