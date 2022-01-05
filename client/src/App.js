import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';

import ResourceService from './Services/ResourceService';
import EditableResourceService from './Services/EditableResourceService';
import PostView from './Views/PostView';
import PostList from './Views/PostList';
import PostEdit from './Views/PostEdit';
import Header from './Components/Header';
import Home from './Views/Home';
import UserView from './Views/UserView';
import UserEdit from './Views/UserEdit';
import UserList from './Views/UserList';

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
          </Toolbar>
        </AppBar>
        <Header />
        <Container maxWidth='xl' sx={{ mt: 5, py: 2 }}>
          <Switch>
            <Route
              exact
              path='/users/new'
              render={(props) => {
                return (
                  <EditableResourceService
                    resourcePath='/users'
                    resourceName='user'
                    pathExtras=''
                    {...props}>
                    <UserEdit />
                  </EditableResourceService>
                );
              }}
            />
            <Route
              exact
              path='/users/:id'
              render={(props) => {
                return (
                  <ResourceService
                    resourcePath='/users'
                    resourceName='user'
                    resourceId={props.match.params.id}
                    pathExtras=''
                    {...props}>
                    <UserView />
                  </ResourceService>
                );
              }}
            />
            <Route
              exact
              path='/users/:id/edit'
              render={(props) => {
                return (
                  <EditableResourceService
                    resourcePath='/users'
                    resourceName='user'
                    resourceId={props.match.params.id}
                    {...props}>
                    <UserEdit />
                  </EditableResourceService>
                );
              }}
            />
            <Route
              exact
              path='/users'
              render={(props) => {
                return (
                  <ResourceService
                    {...props}
                    resourcePath='/users'
                    resourceName='users'>
                    <UserList />
                  </ResourceService>
                );
              }}
            />
            <Route
              exact
              path='/posts/new'
              render={(props) => {
                return (
                  <EditableResourceService
                    resourcePath='/posts'
                    resourceName='post'
                    {...props}>
                    <PostEdit />
                  </EditableResourceService>
                );
              }}
            />
            <Route
              exact
              path='/posts/:id'
              render={(props) => {
                return (
                  <ResourceService
                    resourcePath='/posts'
                    resourceName='post'
                    resourceId={props.match.params.id}
                    pathExtras='/summary'
                    {...props}>
                    <PostView />
                  </ResourceService>
                );
              }}
            />
            <Route
              exact
              path='/posts/:id/edit'
              render={(props) => {
                return (
                  <EditableResourceService
                    resourcePath='/posts'
                    resourceId={props.match.params.id}
                    resourceName='post'
                    {...props}>
                    <PostEdit />
                  </EditableResourceService>
                );
              }}
            />

            <Route
              exact
              path='/posts'
              render={(props) => {
                return (
                  <ResourceService
                    resourcePath='/posts'
                    pathExtras='/summary'
                    resourceName='posts'
                    {...props}>
                    <PostList />
                  </ResourceService>
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
