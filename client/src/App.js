import './App.css';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Views/Home';
import Posts from './Views/Posts';
import PostEdit from './Views/PostEdit';
import PostDetail from './Views/PostDetail';

function App() {
  return (
    <div className='App'>
      <Router>
        <Typography variant='h1' component='h1'>
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
            maxWidth: '70rem',
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
