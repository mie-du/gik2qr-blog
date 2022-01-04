import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';

import ResourceLoader from './api/ResourceLoader';
import EditableResourceLoader from './api/EditableResourceLoader';
import PostView from './Views/PostView';
import PostList from './Views/PostList';
import PostEdit from './Views/PostEdit';
import Header from './Components/Header';
import Home from './Views/Home';

function App() {
  return (
    <>
      <Router>
        <AppBar component='nav' position='static'>
          <Toolbar>
            <Typography variant='h7' component='p' sx={{ flexGrow: 1 }}>
              <Link to='/'>Hem</Link>
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
        <Header />
        <Container maxWidth='lg' sx={{ mt: 5, py: 2 }}>
          <Switch>
            <Route
              exact
              path='/posts/new'
              render={(props) => {
                return (
                  <EditableResourceLoader
                    path='/posts'
                    resourceName='post'
                    {...props}>
                    <PostEdit />
                  </EditableResourceLoader>
                );
              }}
            />
            <Route
              exact
              path='/posts/:id'
              render={(props) => {
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
            <Route
              exact
              path='/posts/:id/edit'
              render={(props) => {
                return (
                  <EditableResourceLoader
                    path='/posts'
                    resourceName='post'
                    {...props}>
                    <PostEdit />
                  </EditableResourceLoader>
                );
              }}
            />

            <Route
              exact
              path='/posts'
              render={(props) => {
                return (
                  <ResourceLoader
                    pathExtras='/summary'
                    resourceName='posts'
                    {...props}>
                    <PostList />
                  </ResourceLoader>
                );
              }}
            />
            <Route exact path='/' component={Home} />
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
