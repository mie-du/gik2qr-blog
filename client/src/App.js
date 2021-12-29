import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';

import User from './ViewModels/User';
/* import Posts from './Posts'; */
import Blog from './ViewModels/Blog';

import UserEdit from './Views/UserEdit';
import UserView from './Views/UserView';
import Home from './Views/Home';

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
          </Toolbar>
        </AppBar>
        <Container maxWidth='lg' sx={{ mt5: 5, py: 2 }}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/users' component={User} />
            <Route exact path='/users/:id' component={UserView} />
            <Route exact path='/users/:id/edit' component={UserEdit} />
            <Route exact path='/posts' component={Blog} />
            <Route exact path='/posts/:id' component={Blog} />
            <Route exact path='/posts/:id/edit' component={Blog} />
            <Route exact path='/posts/:id/new' component={Blog} />
          </Switch>
        </Container>
        '
      </Router>
    </>
  );
}

export default App;
