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
              <Link to='/'>GIK2QR Blog</Link>
            </Typography>
            <Typography variant='body1' component='p' sx={{ mr: 2 }}>
              <Link to='/posts'>Inlägg</Link>
            </Typography>
            <Typography variant='body1' component='p' sx={{ mr: 2 }}>
              <Link to='/users'>Användare</Link>
            </Typography>
            <Typography variant='body1' component='p' sx={{ mr: 2 }}>
              <Link to='/users/new'>Skapa Användare</Link>
            </Typography>
            <Typography variant='body1' component='p' sx={{ mr: 2 }}>
              <Link to='/users/1'>Min profil</Link>
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
