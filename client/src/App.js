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
        <h1>Blogg</h1>
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
            margin: '.5rem auto'
          }}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/posts/new' component={PostEdit} />
            <Route exact path='/posts/:id' component={PostDetail} />
            <Route exact path='/posts/:id/edit' component={PostEdit} />
            <Route exact path='/posts/' component={Posts} />
          </Switch>
        </Box>
      </Router>
    </div>
  );
}

export default App;
