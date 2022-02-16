import './App.css';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './views/Home';
import Posts from './views/Posts';
import PostEdit from './views/PostEdit';
import PostDetail from './views/PostDetail';

function App() {
  return (
    <div className='App'>
      <Router>
        <Typography
          variant='h1'
          sx={{
            fontFamily: ['Parisienne', 'Fira Sans', 'sans-serif'].join(',')
          }}
          color='secondary.dark'
          marginLeft={5}>
          Blogg
        </Typography>

        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              <Link to='/'>Hem</Link>
            </Typography>
            <Button color='inherit'>
              <Link to='/posts/'>Visa alla inlägg</Link>
            </Button>
            <Button color='inherit'>
              <Link to='/posts/new'>Skapa inlägg</Link>
            </Button>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            maxWidth: '60rem',
            margin: '1rem auto'
          }}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/posts/new' component={PostEdit} />
            <Route exact path='/posts/:id' component={PostDetail} />
            <Route exact path='/posts/:id/edit' component={PostEdit} />
            <Route exact path='/posts/' component={Posts} />
            <Route exact path='/tags/:name/posts' component={Posts} />
            <Route exact path='/users/:id/posts' component={Posts} />
          </Switch>
        </Box>
      </Router>
    </div>
  );
}

export default App;
