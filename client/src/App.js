import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

import Home from './ViewModels/Home';
import User from './ViewModels/User';
import Blog from './ViewModels/Blog';

function App() {
  return (
    <>
      <Router>
        <AppBar component='nav' position='static'>
          <Toolbar>
            <Typography variant='h7' component='p' sx={{ flexGrow: 1 }}>
              <Link to='/'>GIK2QR Blogg</Link>
            </Typography>
            <Typography variant='body1' component='p' sx={{ mr: 2 }}>
              <Link to='/posts'>Blogg</Link>
            </Typography>
            <Typography variant='body1' component='p' sx={{ mr: 2 }}>
              <Link to='/users'>Användare</Link>
            </Typography>
            <Typography variant='body1' component='p' sx={{ mr: 2 }}>
              <Link to='/posts/new'>Skapa inlägg</Link>
            </Typography>
            <Typography variant='body1' component='p' sx={{ mr: 2 }}>
              <Link to='/posts/1'>Visa inlägg</Link>
            </Typography>
            <Typography variant='body1' component='p'>
              <Link to='/posts/1/edit'>Ändra inlägg</Link>
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
            <Route exact path='/posts' component={Blog} />
            <Route path='/posts/:id/edit' component={Blog} />
            <Route path='/posts/:id' component={Blog} />
            <Route exact path='/posts/new' component={Blog} />
            <Route exact path='/users' component={User} />
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
