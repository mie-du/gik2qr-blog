import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';

import Posts from './ViewModels/Posts';
import User from './ViewModels/User';

import UserEdit from './Views/UserEdit';
import UserView from './Views/UserView';
import ResourceLoader from './api/ResourceLoader';
import PostView from './Views/PostView';
import PostList from './Views/PostList';

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
          </Toolbar>
        </AppBar>
        <Container maxWidth='lg' sx={{ mt: 5, py: 2 }}>
          <Switch>
            <Route exact path='/users' component={User} />
            <Route exact path='/users/:id' component={UserView} />
            <Route exact path='/users/:id/edit' component={UserEdit} />

            <Route
              exact
              path='/posts/:id'
              render={(props) => {
                console.log('path /posts/:id');
                return (
                  <ResourceLoader
                    pathExtras='/summary'
                    resourceName='post'
                    {...props}>
                    <PostView />
                  </ResourceLoader>
                );
              }}
            />
            <Route exact path='/posts/:id/edit' component={Posts} />
            <Route exact path='/posts' component={Posts} />
            <Route
              exact
              path='/'
              render={(props) => {
                console.log('path /');
                return (
                  <ResourceLoader
                    pathExtras='posts/summary'
                    resourceName='posts'
                    {...props}>
                    <PostList />
                  </ResourceLoader>
                );
              }}
            />
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
