import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import PostEdit from './views/PostEdit';
import PostView from './views/PostView';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>App</h1>
      </header>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/posts/new' component={PostEdit} />
          <Route exact path='/posts/:id' component={PostView} />
          <Route exact path='/posts/:id/edit' component={PostEdit} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
