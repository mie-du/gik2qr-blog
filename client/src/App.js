import './App.css';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Views/Home';
import Posts from './Views/Posts';
import PostDetail from './Views/PostDetail';
import PostEdit from './Views/PostEdit';
import { teal } from '@mui/material/colors';

function App() {
  return (
    <div className='App'>
      <Router>
        <Typography variant='h1' sx={{ color: teal['800'] }}>
          <Link to='/'>Blogg</Link>
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
            maxWidth: '80rem',
            margin: '.3rem auto',
            padding: '0 2rem'
          }}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route
              exact
              path='/posts/new'
              component={(params) => <PostEdit new='true' {...params} />}
            />
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
